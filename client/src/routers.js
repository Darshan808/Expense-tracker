import App from './App';
import ErrorPage from './Pages/ErrorPage';
import Login from './Pages/Login';
import Register from './Pages/Register.jsx';
import Home from './Pages/Home';
import Catagories from './Pages/Catagories';
import { createBrowserRouter } from 'react-router-dom';
import CheckAuth from './utils/CheckAuth';
import CheckGuest from './utils/CheckGuest';

export default createBrowserRouter([
    {
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
            path:"/login",
            element: <CheckGuest>
                <Login />
                </CheckGuest>
        },
        {
            path:"/register",
            element: <CheckGuest>
                <Register />
                </CheckGuest>
        },
        {
            path:"/",
            element:<CheckAuth>
                <Home />
            </CheckAuth>
        },
        {
            path:"/catagories",
            element:<CheckAuth>
                <Catagories />
            </CheckAuth>
        },
      ],
    },
  ]);