import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import Header from '../../components/Header/header.component';
import ProfileDetails from '../../components/Profile/profile.component';
import { getUserByUsername } from '../../services/firebase';

const Profile = () => {

    const { username } = useParams();
    const [user, setuser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const getUserDetails = async () => {
            const res = await getUserByUsername(username);
            const User = res[0];
            if (User)
                setuser(res[0]);
            else
                history.push('/not-found')
        }

        getUserDetails();
    }, [username])

    return user?.username ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <ProfileDetails user={user} />
            </div>
        </div>
    ) : null;
}

export default Profile
