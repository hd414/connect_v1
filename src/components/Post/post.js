import React from 'react';
import PropTypes, { shape } from 'prop-types';
import PostHeader from './header/header';
import Image from '../Image/image';

const Post = ({ content }) => {
    console.log(typeof (content.username));

    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <PostHeader username={content.username} />
            <Image caption={content.caption} imageSrc={content.imageSrc} />
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