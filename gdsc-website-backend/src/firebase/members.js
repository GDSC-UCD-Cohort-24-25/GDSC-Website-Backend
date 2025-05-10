import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "./firebase"; 

const convertToBase64 = (photo) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(photo);
    });
};

const addMember = async (memberName, team, photo) => {
    console.log("Passed in", photo)
    const base64Image = await convertToBase64(photo)
    const membersCollectionRef = collection(db, "members");
    const docRef = await addDoc(membersCollectionRef, {
        name: memberName,
        team: team,
        picture: base64Image,
    });
    console.log("Member added with ID:", docRef.id);
};

const getAllMembers = async () => {
    
    try {
        const membersCollectionRef = collection(db, "members");
        const querySnapshot = await getDocs(membersCollectionRef);
        const members = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return members;
    } catch (e) {
        console.error("Error fetching members:", e);
        return [];
    }
};

export { addMember, getAllMembers };
