import db from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addOneProject = (project) => {
    // Schema
    // title: string
    // by: string
    // description: string
    // tags: array

    addDoc(collection(db, 'projects'), {
        ...project,
        created: new Date(),
    })
    .then(returned => console.log("Successfully created"));
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