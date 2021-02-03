//import 'babel-polyfill';
import firebase from './firebase';

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Solicitudes
export const saveRequest = async (id, object) => {
    return firestore.collection('solicitudes').doc(id).set(
        object, { merge: true });
}

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
                    errMessage='Ha ocurrido un error con el servicio de autenticación';
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