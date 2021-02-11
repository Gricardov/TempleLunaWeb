//import 'babel-polyfill';
import firebase from './firebase';

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Solicitudes

export const takeRequest = (collection, workerId, requestId) => {
    let requestRef = firestore.collection(collection).doc(requestId);
    return requestRef.update({
        takenBy: workerId,
        status: 'TAKEN',
        takenAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

export const saveRequest = async (id, object) => {
    return firestore.collection('solicitudes').doc(id).set(
        { ...object, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
}

export const getRequest = async (requestId) => {
    return firestore.collection('solicitudes').doc(requestId).get()
        .then(doc => {
            if (doc.exists) {
                return { data: doc.data() }
            } else {
                return { error: 'No existe una solicitud con ese id' }
            }
        })
        .catch(error => {
            return { error }
        })
}

export const getRequests = async (workerId, type, status, startAfter, limit = 10) => {
    let request = firestore.collection('solicitudes').where('type', '==', type).where('status', '==', status).orderBy('updatedAt', 'desc');

    if (startAfter) {
        request = request.startAfter(startAfter);
    }

    if (workerId) {
        request = request.where('takenBy', workerId);
    }
    return request.limit(limit + 1).get()
        .then(qsn => {
            let list = [];
            qsn.forEach(doc => list.push({ ...doc.data(), id: doc.id }));
            const isLast = list.length < limit + 1;
            if (!isLast) list.pop();
            return { list, isLast };
        })
        .catch(error => {
            console.log(error);
            return { list: [] };
        });;
}

/*export const listenRequests = (workerId, type, status, limit = 10, callback) => {
    let request = firestore.collection('solicitudes').where('type', '==', type).where('status', '==', status).orderBy('updatedAt', 'desc');
    if (workerId) {
        request.where('takenBy', workerId);
    }
    return request.limit(limit).onSnapshot(qsn => {
        let list = [];
        qsn.forEach(doc => list.push({ ...doc.data(), id: doc.id }));
        callback(list);
    });
}*/

// Sesión
export const login = async (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            return { user };
        })
        .catch(error => {
            let errMessage;
            switch (error.code) {
                case 'auth/invalid-email':
                    errMessage = 'El usuario es inválido';
                    break;
                case 'auth/user-disabled':
                    errMessage = 'El usuario ha sido deshabilitado';
                    break;
                case 'auth/user-not-found':
                    errMessage = 'El usuario no ha sido encontrado';
                    break;
                case 'auth/wrong-password':
                    errMessage = 'El usuario es inválido';
                    break;
                default:
                    errMessage = 'Ha ocurrido un error con el servicio de autenticación';
            }
            return { error: errMessage };
        });
}

export const logout = async () => {
    return auth.signOut().then(function () {
        return true;
    }).catch(function (error) {
        console.log(error.message);
    });
}

// Archivos
export const uploadImage = async (ruta, id, archivo) => {
    return new Promise((resolve, reject) => {
        let storageRef = storage.ref();
        let imgRef = storageRef.child(`${ruta}/${id}`);
        const task = imgRef.put(archivo);

        task.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            reject(error);
        }, function () {
            task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                resolve(downloadURL);
            });
        });
    })
}

// Funciones firestore
export const getGeneratedId = (collection) => {
    return firestore.collection(collection).doc().id;
}