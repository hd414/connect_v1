import React, { useContext, useState } from 'react'
import firebaseContext from '../../context/firebaseContext';
import UserContext from '../../context/userContext';
import PropTypes from 'prop-types';

const Actions = ({ docId, liked, likes, handleFocus, setVisible, visible }) => {


    const { user } = useContext(UserContext);
    const { firebase, FieldValue } = useContext(firebaseContext);
    const [toggleliked, setToggleliked] = useState(liked)
    const [totalLikes, setTotalLikes] = useState(likes);

    const handlelike = async () => {

        await firebase.firestore()
            .collection('photos')
            .doc(docId)
            .update({
                likes: !toggleliked ? FieldValue.arrayUnion(user.uid) : FieldValue.arrayRemove(user.uid)
            })

        setTotalLikes(totalLikes => !toggleliked ? totalLikes + 1 : totalLikes - 1);
        setToggleliked(toggleliked => !toggleliked);
    }
    return (
        <>
            <div className="flex justify-between p-4 text-sm" style={{ paddingBottom: "1px" }}>
                <div className="flex">
                    <svg
                        onClick={handlelike}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handlelike();
                            }
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 34 34"
                        stroke="currentColor"
                        tabIndex={0}
                        className={`w-10 select-none cursor-pointer focus:outline-none ${toggleliked ? 'fill-red text-red-primary' : 'text-black-light'
                            }`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    <svg
                        onClick={() => { handleFocus(); setVisible(!visible) }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleFocus();
                                setVisible(!visible)
                            }
                        }}
                        className="w-10 text-black-light select-none cursor-pointer focus:outline-none"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 34 34"
                        stroke="currentColor"
                        tabIndex={0}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />

                    </svg>
                </div>
            </div>
            <div className="p-4 py-0 text-sm">
                <p className="font-bold">{totalLikes === 1 ? `${totalLikes} like` : `${totalLikes} likes`}</p>
            </div>
        </>
    );
}

export default Actions


Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
}