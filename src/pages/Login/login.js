import React, { useContext, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import firebaseContext from '../../context/firebaseContext';

const Login = () => {

    const History = useHistory();
    const { firebase } = useContext(firebaseContext);


    useEffect(() => {
        document.title = 'connect-Login'
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const inValidForm = email === '' || password === '';

    const LoginHandler = async (event) => {
        event.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            History.push('/');
        }
        catch (e) {
            setEmail('');
            setPassword('');
            setError(e.message);
        }
    }



    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen " >
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="login image" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex justify-center w-full">
                    <img src="/images/logo.png" alt="logo" className="mt-2 w-6/12 mb-4" />
                </div>
                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                <form className="" method="POST" onSubmit={LoginHandler}>
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
                        Login
                    </button>
                </form>
                <div className="mt-4 flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">Don't have an account ?{' '}
                        <Link to='/register' className="font-bold text-blue-medium" >
                            Register
                        </Link>
                    </p>

                </div>

            </div>
        </div>
    )
}

export default Login
