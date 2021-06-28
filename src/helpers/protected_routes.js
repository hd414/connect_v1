import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const ProtectedRoute = ({ user, path, children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (user?.uid) {
                    return children
                }
                else
                    return (<Redirect to='/login' />)
            }
            }
        />
    )
}

export const UserRedirect = ({ user, children, path, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (user?.uid) {
                    return (<Redirect to='/' />)
                }
                else
                    return children
            }
            }
        />
    )
}
