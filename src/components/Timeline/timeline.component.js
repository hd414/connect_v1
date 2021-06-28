import React from 'react'
import Skeleton from 'react-loading-skeleton';
import GetPhotos from '../../hooks/getPhotos'
import Post from '../Post/post';

const Timeline = () => {
    const photos = GetPhotos();
    return (
        <div className="container col-span-1">
            {!photos ? (
                <Skeleton count={2} width={350} height={500} className="mb-5" />
            ) : (
                photos.map((content) => <Post key={content.docId} content={content} />)
            )}
        </div>
    )
}

export default Timeline
