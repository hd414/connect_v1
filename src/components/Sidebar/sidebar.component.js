import React from 'react'
import Getuser from '../../hooks/getUser'
import Suggestions from './suggestions';
import UserDetails from './UserDetails';

const Sidebar = () => {
    const { activeUser } = Getuser();
    // console.log(activeUser);
    return (
        <div className="p-4">
            <UserDetails username={activeUser?.username} name={activeUser?.name} />
            <Suggestions id={activeUser?.user_id} following={activeUser?.following} userDocId={activeUser?.docId} />
        </div>
    )
}

export default Sidebar
