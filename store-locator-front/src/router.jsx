import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from '../src/views/Login';
import Signup from'../src/views/Signup';
import Stores from './views/Stores';
import NotFound from'../src/views/Notfound';
import GuestLayout from './components/GuestLayout';
import DefaultLayout from './components/DefaultLayout';
import Dashboard from './views/Dashboard';
import StoreForm from './views/StoreForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children:[
            {
                path: '/',
                // Redirect the user to /users
                element: <Navigate to="/stores" />
            },
            {
                path: '/stores',
                element: <Stores />
            },
            {
                path: '/stores/new',
                element: <StoreForm key="storeCreate" />
            },
            {
                path: '/stores/:id',
                element: <StoreForm key="storeUpdate"/>
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
