import React from 'react'
import Skeleton from 'react-loading-skeleton';
import GetPhotos from '../../hooks/getPhotos'
import Post from '../Post/post';

const Timeline = () => {
    const photos = GetPhotos();
    console.log(photos);
    return (
        <div className="container col-span-2">
            {!photos ? (
                <Skeleton count={2} width={490} height={400} className="mb-5" />
            ) : (
                photos.map((content) => <Post key={content.docId} content={content} />)
            )}
        </div>
    )
}

export default Timeline
