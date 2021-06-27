import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import { getUserById } from "../services/firebase";

export default function Getuser() {
    const [activeUser, setActiveUser] = useState();
    const { user } = useContext(UserContext);

    useEffect(() => {

        const getUserByuserId = async () => {
            const userData = await getUserById(user?.uid);
            setActiveUser(userData[0]);
        }

        if (user?.uid) {
            getUserByuserId();
        }

    }, [user])

    return { activeUser };
}