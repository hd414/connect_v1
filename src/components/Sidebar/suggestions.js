
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { getSuggestions } from '../../services/firebase';
import SuggestionProfile from './suggestionProfile';

const Suggestions = ({ id, following, userDocId }) => {

    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        const getSuggestedProfiles = async () => {
            const res = await getSuggestions(id, following);
            setProfiles(res);
        }
        if (id) {
            getSuggestedProfiles();
        }
    }, [id, following])

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile) => (
                    <SuggestionProfile
                        key={profile?.docId}
                        profileDocId={profile?.docId}
                        username={profile?.username}
                        profileId={profile?.user_id}
                        userId={id}
                        userDocId={userDocId}
                    />
                ))}
            </div>
        </div>
    ) : null;
}

export default Suggestions
