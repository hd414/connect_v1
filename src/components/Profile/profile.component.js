import React, { useState } from 'react'
import { useEffect } from 'react';
import { useReducer } from 'react';
import { getUserPhotosByUserId } from '../../services/firebase';
import Header from './profileHeader/header';
import Photos from './profilepics/photos';

const ProfileDetails = ({ user }) => {

    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: null,
        followerCount: 0
    };

    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        const getProfileInfoAndPhotos = async () => {
            const photos = await getUserPhotosByUserId(user.user_id);
            console.log(photos)
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
        }
        console.log(user);
        getProfileInfoAndPhotos();
    }, [user.username]);

    return (
        <>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    );
}

export default ProfileDetails
