import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import firebaseContext from '../../../context/firebaseContext';
import UserContext from '../../../context/userContext';
import PropTypes from 'prop-types';


const AddComment = ({ docId, comments, setComments, commentRef }) => {

    const [comment, setComment] = useState('');
    const { firebase, FieldValue } = useContext(firebaseContext);
    const { user } = useContext(UserContext);

    const handleSubmitComment = async (e) => {

        try {
            e.preventDefault();
            setComments([...comments, { displayName: user.displayName, comment }])
            await firebase.firestore()
                .collection('photos')
                .doc(docId)
                .update({
                    comments: FieldValue.arrayUnion({ displayName: user.displayName, comment })
                })
        }
        catch (e) {
            console.log(e.message);
        }
        setComment('');

    }

    return (
        <div className="border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(event) =>
                    comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
                }
            >
                <input
                    autoFocus={true}
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-2 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentRef}
                />
                <button
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    )
}

export default AddComment

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentRef: PropTypes.object.isRequired
}