//import 'babel-polyfill';
import firebase from './firebase';
import { v4 as uuidv4 } from 'uuid';

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Eventos
export const saveEvent = async (object) => {
    return firestore.collection('inscripciones').doc().set({ ...object, createdAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
}

// Solicitudes

export const takeRequest = async (requestId) => {
    return request('takeRequest', { requestId }, 'POST', true);
}

export const resignRequest = async (requestId) => {
    return request('resignRequest', { requestId }, 'POST', true);
}

export const saveRequest = async (object) => {
    return firestore.collection('solicitudes').doc().set({ ...object, createdAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
}

export const setRequestDone = async (data) => {
    return request('generateResultRequest', data, 'POST', true);
}

export const getRequest = async (requestId) => {
    return firestore.collection('solicitudes').doc(requestId).get()
        .then(async doc => {
            if (doc.exists) {
                const takenBy = doc.data().takenBy;
                if (takenBy) {
                    const artist = await request('getArtistDataById', { id: takenBy }, 'POST'); // TO BE FIXED, DENORMALIZE!!
                    if (!artist.error) {
                        return { data: { ...doc.data(), id: doc.id, artist } }
                    } else {
                        return { error: 'No existe el artista' }
                    }
                } else {
                    return { data: { ...doc.data(), id: doc.id } }
                }
            } else {
                return { error: 'No existe una solicitud con ese id' }
            }
        })
        .catch(error => {
            return { error }
        })
}

export const getRequests = async (workerId, type, status, startAfter, limit = 10, order = 'asc') => {

    let request = firestore.collection('solicitudes').where('type', '==', type).where('status', '==', status).orderBy('createdAt', order);

    if (startAfter) {
        request = request.startAfter(startAfter);
    }

    if (workerId) {
        request = request.where('takenBy', '==', workerId);
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
            return { list: [] };
        });;
}

export const likeRequestResult = async (id, direction) => {
    return request('addLove', { id, direction }, 'POST');
}

export const addCommentRequestResult = async (id, alias, message) => {
    return request('addComment', { id, alias, message }, 'POST');
}

/*export const listenRequests = (workerId, type, status, limit = 10, callback) => {
    let request = firestore.collection('solicitudes').where('type', '==', type).where('status', '==', status).orderBy('createdAt', 'desc');
    if (workerId) {
        request.where('takenBy', workerId);
    }
    return request.limit(limit).onSnapshot(qsn => {
        let list = [];
        qsn.forEach(doc => list.push({ ...doc.data(), id: doc.id }));
        callback(list);
    });
}*/

// Analíticas
export const addAnalitics = async (id, object) => {
    return firestore.collection('analiticas').doc(id).set({ ...object, createdAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
}

// Estadísticas

export const getStatistics = async keys => {
    let promises = keys.map(key => {
        return firestore.collection('estadisticas').doc(key).get()
            .then(doc => {
                if (doc.exists) {
                    return { statistics: { ...doc.data() } }
                } else {
                    return { error: 'No se pudo obtener la estadística ' + key }
                }
            })
            .catch(error => {
                return { error }
            })
    });
    return Promise.all(promises);
}

// Perfil

export const getProfile = async (uid) => {
    return firestore.collection('perfiles').doc(uid).get()
        .then(doc => {
            if (doc.exists) {
                return { profile: { ...doc.data(), id: doc.id } }
            } else {
                return { error: 'No existe un usuario con ese id', errCode: 'NOT FOUND' }
            }
        })
        .catch(error => {
            return { error }
        })
}

export const getProfileByQueryFollowName = async (followName) => {
    return firestore.collection('perfiles').where('qFollowName', '==', followName).limit(1).get()
        .then(qsn => {
            let list = [];
            qsn.forEach(doc => list.push({ ...doc.data(), id: doc.id }));
            return { profile: list[0] };
        })
        .catch(error => {
            return { error }
        })
}

export const takeRest = async () => {
    //return request('takeRest', null, 'POST', true);
}

// Sesión

export const login = async (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            return getProfile(user.user.uid).then(({ profile, error }) => {
                if (!error) {
                    return { user, profile };
                } else {
                    logout();
                    return { error: 'No se pudo obtener el perfil' };
                }
            })
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
                case 'auth/too-many-requests':
                    errMessage = 'Ha habido muchos intentos de login. Inténtalo en unos minutos.';
                    break;
                default:
                    //errMessage = 'Error code: ' + error.message
                    errMessage = 'Ha ocurrido un error con el servicio de autenticación';
            }
            return { error: errMessage };
        });
}

export const logout = async () => {
    return auth.signOut().then(() => true).catch(function (error) {
        console.log(error.message);
    });
}

// Archivos
export const uploadImage = async (ruta, archivo) => {
    return new Promise((resolve, reject) => {
        let storageRef = storage.ref();
        let imgRef = storageRef.child(`${ruta}/${uuidv4()}`);
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
export const getGeneratedId = async (collection) => {
    return firestore.collection(collection).doc().id;
}

// Api fetch
export const request = async (path, data, method, authorized) => {
    try {
        const result = await fetch(process.env.REACT_APP_ENDPOINT + path, {
            method: method,
            body: data ? JSON.stringify(data) : null,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorized ? 'Bearer ' + await auth.currentUser.getIdToken() : null
            }
        });
        if (result.status == '200') {
            return await result.json(); // Esto se debe arreglar
        } else {
            return { error: result.statusText || 'No se encontró el endpoint' };
        }
    } catch (error) {
        return { error };
    }
}