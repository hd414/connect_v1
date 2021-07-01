import React from 'react'
import { useEffect } from 'react';
import { useReducer } from 'react';
import { getUserPhotosByUserId } from '../../services/firebase';
import Header from './profileHeader/header';
import Photos from './profilepics/photos';
import PropTypes from 'prop-types';

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
            // console.log(photos)
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
        }
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


ProfileDetails.propTypes = {
    user: PropTypes.shape({
        createdAt: PropTypes.number,
        email: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        name: PropTypes.string,
        user_id: PropTypes.string,
        username: PropTypes.string
    })
};
