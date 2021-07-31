import React, { useContext, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import firebaseContext from '../../context/firebaseContext';
import doesUserExists from '../../services/firebase';

const Register = () => {

    const History = useHistory();
    const { firebase } = useContext(firebaseContext);


    useEffect(() => {
        document.title = 'connect-Register'
    }, [])

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const inValidForm = email === '' || password === '';

    const RegisterHandler = async (event) => {
        event.preventDefault();
        try {
            let len = await doesUserExists(username);
            if (len > 0) {
                setError("this username already exists , please try another");
                return;
            }
            const res = await firebase.auth()
                .createUserWithEmailAndPassword(email, password)

            await res.user.updateProfile({
                displayName: username
            });

            await firebase.firestore()
                .collection('users')
                .add({
                    user_id: res.user.uid,
                    username: username.toLowerCase(),
                    email,
                    name,
                    password,
                    following: [],
                    followers: [],
                    createdAt: Date.now()
                });
            History.push('/');
        }
        catch (e) {
            setEmail('');
            setName('');
            setPassword('');
            setError(e.message);
            console.log(e.message)
        }
    }



    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen " >
            <div className="flex w-3/5">
                <img src="/images/8401.jpg" alt="Register" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex justify-center w-full">
                    <h1 style={{ fontFamily: 'Style Script', fontSize: "3rem", fontWeight: '700' }}>ConnectU5</h1>
                </div>
                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                <form className="" method="POST" onSubmit={RegisterHandler}>
                    <input
                        aria-label="Enter Username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-3 h-2 border border-gray-primary
                        rounded mb-2"
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <input
                        aria-label="Enter name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-3 h-2 border border-gray-primary
                        rounded mb-2"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <input
                        aria-label="Enter Email"
                        type="email"
                        name="email"
                        placeholder="EMAIL"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-3 h-2 border border-gray-primary
                        rounded mb-2"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        aria-label="Enter password"
                        type="password"
                        name="password"
                        placeholder="password"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-3 h-2 border border-gray-primary
                        rounded mb-2"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                        disabled={inValidForm}
                        type="submit"
                        className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                         ${inValidForm && ' opacity-50'}`}
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">Already have an account ?{' '}
                        <Link to='/login' className="font-bold text-blue-medium" >
                            Log In
                        </Link>
                    </p>

                </div>

            </div>
        </div>
    )
}

export default Register
