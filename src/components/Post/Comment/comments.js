import React from 'react'
import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './addComment';

const Comment = ({ docId, comments, posted, commentRef, visible }) => {

    const [allComments, setAllcomments] = useState(comments);
    const [commentSlice, setCommentSlice] = useState(0);



    const showNextComments = () => {
        setCommentSlice(commentSlice + 3);
    }

    const showPrevComments = () => {
        // if (commentSlice > 5)
        //     setCommentSlice(commentSlice - 5);
        // else
        setCommentSlice(0);
    }

    return (
        <>
            <div className="p-4 pt-1 pb-4 text-sm">
                {allComments.slice(0, commentSlice).map((item) => (
                    <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                        <Link to={`/profile/${item.displayName}`}>
                            <span className="mr-1 font-bold">{item.displayName}</span>
                        </Link>
                        <span>{item.comment}</span>
                    </p>
                ))
                }
                {allComments.length >= 2 && commentSlice <= allComments.length ? (
                    <button
                        className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
                        type="button"
                        onClick={showNextComments}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                showNextComments();
                            }
                        }}
                    >
                        {`view all ${allComments.length - commentSlice} comments `}
                    </button>
                )
                    : commentSlice > allComments.length && (
                        <button
                            className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
                            type="button"
                            onClick={showPrevComments}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    showPrevComments();
                                }
                            }}
                        >
                            View less comments
                        </button>
                    )

                }
                <p className="text-gray-base uppercase text-xs mt-2">
                    {formatDistance(posted, new Date())} ago
                </p>
            </div>
            {
                visible && <AddComment
                    docId={docId}
                    comments={allComments}
                    setComments={setAllcomments}
                    commentRef={commentRef}
                />
            }

        </>
    )
}

export default Comment

Comment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentRef: PropTypes.object.isRequired
}