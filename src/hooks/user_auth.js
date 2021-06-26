import React from "react";
import { useContext, useEffect, useState } from "react";
import firebaseContext from "../context/firebaseContext";


const UserAuthListener = () => {
    const { firebase } = useContext(firebaseContext);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('connectUser')));

    useEffect(() => {
        const listner = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                localStorage.setItem('connectUser', JSON.stringify(user));
                setUser(user);
            }
            else {
                localStorage.removeItem('connectUser');
                setUser(null);
            }
        })

        return () => listner();
    }, [firebase])

    return { user };
}


export default UserAuthListener;
