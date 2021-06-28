import React from 'react';
import PropTypes, { shape } from 'prop-types';
import PostHeader from './header/header';
import Image from '../Image/image';
import Actions from './actions';
import { useRef } from 'react';
import Footer from './footer/footer';
import Comment from './Comment/comments';
import { useState } from 'react';

const Post = ({ content }) => {

    const commentRef = useRef(null);
    const [visible, setVisible] = useState(false);


    const handleFocus = () => commentRef?.current?.focus();

    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <PostHeader username={content.username} />
            <Image caption={content.caption} imageSrc={content.imageSrc} />
            <Actions
                docId={content.docId}
                likes={content.likes.length}
                liked={content.liked}
                handleFocus={handleFocus}
                setVisible={setVisible}
                visible={visible}
            />
            <Footer username={content.username} caption={content.caption} />
            <Comment
                visible={visible}
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentRef={commentRef}
            />
        </div>
    )
}

export default Post

Post.propTypes = {
    content: shape({
        caption: PropTypes.string.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired,
        docId: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        liked: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        username: PropTypes.string.isRequired,
    })
}