import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from '../src/views/Login';
import Users from'../src/views/Users';
import Signup from'../src/views/Signup';
import NotFound from'../src/views/Notfound';
import GuestLayout from './components/GuestLayout';
import DefaultLayout from './components/DefaultLayout';
import Dashboard from './views/Dashboard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children:[
            {
                path: '/',
                // Redirect the user to /users
                element: <Navigate to="/users" />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
])

export default router;
