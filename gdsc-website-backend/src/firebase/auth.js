import { auth } from './firebase'; // adjust the path if needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function createUser(email, password) {
    let retValue = null;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // You can return user or other success value here if needed
    } catch (error) {
        console.error(error.code, error.message);
        retValue = error.message; // Set the error code
    }
    return retValue;
}

export async function signinUser(email, password) {
    let retValue = null;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // You can return user or other success value here if needed
    } catch (error) {
        console.error(error.code, error.message);
        retValue = error.message; // Set the error code
    }
    return retValue;
}
