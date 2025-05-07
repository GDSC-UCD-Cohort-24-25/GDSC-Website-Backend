import db from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addOneProject = (project) => {
    // Schema
    // title: string
    // by: string
    // description: string
    // tags: array

    return addDoc(collection(db, 'projects'), {
        ...project,
        created: new Date(),
    })
    .then(returned => returned);
};

export const getAllProjects = () => {
    return getDocs(collection(db, 'projects'))
    .then(snapshot => {
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
    })
}

getAllProjects()