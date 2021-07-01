
import { FieldValue, firebase } from "../lib/firebase";

const doesUserExists = async (username) => {
    const res = await firebase.firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return res.docs.length > 0;
}

export default doesUserExists;


export const getUserById = async (id) => {

    const res = await firebase.firestore()
        .collection('users')
        .where('user_id', '==', id)
        .get();
    const userData = res.docs.map((item) => {
        return {
            ...item.data(),
            docId: item.id
        }
    })
    console.log(userData)
    return userData;
}

export const getUserByUsername = async (username) => {

    const res = await firebase.firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
    const userData = res.docs.map((item) => {
        return {
            ...item.data(),
            docId: item.id
        }
    })
    return userData;
}

export const getSuggestions = async (id, following) => {
    const res = await firebase.firestore()
        .collection('users')
        .limit(10)
        // .where('user_id', '==', id)
        .get();

    const result = res.docs.map((user) => {
        return {
            ...user.data(),
            docId: user.id
        }
    })
        .filter((profile) => {
            return profile.user_id !== id && !following.includes(profile.user_id)
        })

    return result;
}

export const UpdateFollowing = async (docId, id, isFollowing) => {
    try {
        await firebase.firestore()
            .collection('users')
            .doc(docId)
            .update({
                following: isFollowing ? FieldValue.arrayRemove(id)
                    : FieldValue.arrayUnion(id)
            });
    }
    catch (e) {
        console.log(e.message);
    }
}

export const UpdateFollowers = async (docId, id, isFollower) => {
    try {
        await firebase.firestore()
            .collection('users')
            .doc(docId)
            .update({
                followers: isFollower ? FieldValue.arrayRemove(id)
                    : FieldValue.arrayUnion(id)
            });
    }
    catch (e) {
        console.log(e.message);
    }
}

export const getFollowingUserPhotos = async (userId, following) => {
    try {
        const res = await firebase.firestore()
            .collection('photos')
            .where('user_id', 'in', following)
            .get();

        const photosOfFollowingUsers = res.docs.map((photo) => (
            {
                ...photo.data(),
                docId: photo.id
            }
        ))

        const result = await Promise.all(
            photosOfFollowingUsers.map(async (pic) => {
                let liked = false;
                if (pic.likes.includes(userId))
                    liked = true;
                const k = await getUserById(pic.user_id);
                const { username } = k[0];
                return { ...pic, username, liked };
            })
        )
        return result;
    }
    catch (e) {
        console.log(e.message);
    }
}

export const getUserPhotosByUserId = async (id) => {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('user_id', '==', id)
        .get();

    const photos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));
    return photos;
}


export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
) {
    // 1st param: karl's doc id
    // 2nd param: raphael's user id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await UpdateFollowing(activeUserDocId, profileUserId, isFollowingProfile);

    // 1st param: karl's user id
    // 2nd param: raphael's doc id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await UpdateFollowers(profileDocId, followingUserId, isFollowingProfile);
}


export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', loggedInUserUsername) // karl (active logged in user)
        .where('following', 'array-contains', profileUserId)
        .get();

    const response = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return response.length > 0
}