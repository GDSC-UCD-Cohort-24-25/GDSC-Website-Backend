import db from './firebase';
import { collection, addDoc, getDocs, getDoc } from 'firebase/firestore';

export const addOneProject = async (project) => {
    // Schema
    // title: string
    // by: string
    // description: string
    // tags: array

    // add to the database
    const docRef = await addDoc(collection(db, 'projects'), {
        ...project,
        created: new Date(),
    })

    // get the doc
    const docSnap = await getDoc(docRef)
    console.log(docSnap.data())

    return docSnap.data()
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