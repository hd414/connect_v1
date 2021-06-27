import React from 'react'

const Image = ({ imageSrc, caption }) => {
    return (
        <img src={imageSrc} alt={caption} />
    )
}

export default Image
