import React, { memo } from 'react'
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const UserDetails = ({ username, name }) => {
    return (
        !username || !name ? (
            <Skeleton count={1} height={60} />
        ) : (
            <Link to={`/profile/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
                <div className="flex items-center justify-between col-span-1">
                    <img
                        className="rounded-full w-16 flex mr-3"
                        src={`/images/avatars/${username}.jpg`}
                        alt=""
                        onError={(e) => {
                            e.target.src = '/images/avatars/default.png';
                        }}
                    />
                </div>
                <div className="col-span-3">
                    <p className="font-bold text-sm">{username}</p>
                    <p className="text-sm">{name}</p>
                </div>
            </Link>
        )
    )

}

export default memo(UserDetails);


UserDetails.propTypes = {
    username: PropTypes.string,
    name: PropTypes.string
};

