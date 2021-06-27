/* eslint-disable no-plusplus */
// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
    const users = [
        {
            user_id: 'iUGmTF1ppIdZIoKOEm3fFqKv9FT2',
            username: 'karl',
            name: 'Karl Hadwen',
            email: 'karlhadwen@gmail.com',
            following: ['2'],
            followers: ['2', '3', '4'],
            dateCreated: Date.now()
        },
        {
            user_id: '2',
            username: 'raphael',
            name: 'Raffaello Sanzio da Urbino',
            email: 'raphael@sanzio.com',
            following: [],
            followers: ['iUGmTF1ppIdZIoKOEm3fFqKv9FT2'],
            dateCreated: Date.now()
        },
        {
            user_id: '3',
            username: 'dali',
            name: 'Salvador Dalí',
            email: 'salvador@dali.com',
            following: [],
            followers: ['iUGmTF1ppIdZIoKOEm3fFqKv9FT2'],
            dateCreated: Date.now()
        },
        {
            user_id: '4',
            username: 'orwell',
            name: 'George Orwell',
            email: 'george@orwell.com',
            following: [],
            followers: ['iUGmTF1ppIdZIoKOEm3fFqKv9FT2'],
            dateCreated: Date.now()
        }
    ];

    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
        firebase.firestore().collection('users').add(users[k]);
    }

    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
        firebase
            .firestore()
            .collection('photos')
            .add({
                photoId: i,
                user_id: '2',
                imageSrc: `/images/users/raphael/${i}.jpg`,
                caption: 'Saint George and the Dragon',
                likes: [],
                comments: [
                    {
                        displayName: 'dali',
                        comment: 'Love this place, looks like my animal farm!'
                    },
                    {
                        displayName: 'orwell',
                        comment: 'Would you mind if I used this picture?'
                    }
                ],
                userLatitude: '40.7128°',
                userLongitude: '74.0060°',
                dateCreated: Date.now()
            });
    }
}
