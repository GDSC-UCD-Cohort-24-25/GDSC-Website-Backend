import db from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export const addOne = (project) => {
    addDoc(collection(db, 'projects'), {
        ...project,
        created: new Date(),
    })
    .then(returned => console.log("Successfully created"));
};
