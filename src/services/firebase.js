
import { firebase } from "../lib/firebase";

const doesUserExists = async (username) => {
    const res = await firebase.firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return res.docs.length > 0;
}

export default doesUserExists;