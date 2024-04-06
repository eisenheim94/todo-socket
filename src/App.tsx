import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/main.scss';
import Home from '@pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import View from '@pages/View';
import NotFound from '@pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <NotFound />,
  },
  {
    path: '/view/:id',
    element: <View />,
  },
  {
    path: '/',
    element: <Home />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
