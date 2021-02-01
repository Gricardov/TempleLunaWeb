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