import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import MainLayout from "./layouts/MainLayout";

import {RouterProvider} from 'react-router-dom'
import {router} from "./routes/routes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux'
import {store} from "./store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>



        <RouterProvider router={router}>
            <MainLayout/>


        </RouterProvider>
        <ToastContainer  position="top-center"
                         autoClose={5000}
                         hideProgressBar={false}
                         newestOnTop={false}
                         closeOnClick
                         rtl={true}
                         pauseOnFocusLoss
                         draggable
                         pauseOnHover={true}
                         theme="dark"/>
    </Provider>

);


reportWebVitals();
