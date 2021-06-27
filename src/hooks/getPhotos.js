import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/userContext';
import { getFollowingUserPhotos, getUserById } from '../services/firebase';

const GetPhotos = () => {
    const { user } = useContext(UserContext);
    const [photos, setPhotos] = useState(null);
    useEffect(() => {
        const getTimelinePics = async () => {
            const res = await getUserById(user?.uid);
            const { following } = res[0];
            let pics = [];

            if (following.length > 0) {
                pics = await getFollowingUserPhotos(user?.uid, following);
                pics?.sort((a, b) => b.createdAt - a.createdAt);
                setPhotos(pics);
            }
        }
        if (user) {
            getTimelinePics();
        }
    }, [user]);

    return photos;
}

export default GetPhotos
