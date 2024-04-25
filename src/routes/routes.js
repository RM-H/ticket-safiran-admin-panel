import MainLayout from "../layouts/MainLayout";
import * as React from "react";
import * as ReactDOM from "react-dom/client";


import {
    createBrowserRouter

} from "react-router-dom";

import {Landing, Login,SiteSettings,Messages,PasswordChange,SiteInfoSettings,SiteFaqSettings,Singers,Cities,Salone,SaloneEdit,AddEvent,Events,EditEvent,Sans,SansEdit,Orders,OrderDetails,Print,Seating,About,LiveEdit,Addlive,Blogs,Sliders} from '../pages'
import Live from "../pages/Live";



export const router = createBrowserRouter([
    {
        path: '/admin',
        element: <MainLayout/>,

        children: [

            {
                path: '/admin',
                element: <Landing/>
            } ,
            {
                path: '/admin/site-settings',
                element: <SiteSettings/>
            },
            {
                path: '/admin/site-settings/info',
                element: <SiteInfoSettings/>
            },
            {
                path: '/admin/site-settings/faq',
                element: <SiteFaqSettings/>
            },
            {
                path: '/admin/messages',
                element: <Messages/>
            },
            {
                path: '/admin/singers',
                element: <Singers/>
            },
            {
                path: '/admin/cities',
                element: <Cities/>
            },
            {
                path: '/admin/password-change',
                element: <PasswordChange/>
            },
            {
                path: '/admin/salon',
                element: <Salone/>
            },
            {
                path: '/admin/salon/:id',
                element: <SaloneEdit/>
            },
            {
                path: '/admin/add-event',
                element: <AddEvent/>
            }
            ,
            {
                path: '/admin/events',
                element: <Events/>
            }
            ,
            {
                path: '/admin/events/:id',
                element: <EditEvent/>
            }
            ,
            {
                path: '/admin/events/:id/sans',
                element: <Sans/>
            }
            ,
            {
                path: '/admin/events/:id/sans/edit/:sans',
                element: <SansEdit/>
            }
            ,
            {
                path: '/admin/events/:id/sans/pricing/:sans',
                element: <Seating/>
            }
            ,
            {
                path: '/admin/orders',
                element: <Orders/>
            }
            ,
            {
                path: '/admin/orders/:ref',
                element: <OrderDetails/>
            }
            ,
            {
                path: '/admin/about',
                element: <About/>
            }
            ,
            {
                path: '/admin/live',
                element: <Live/>
            }
            ,
            {
                path: '/admin/live/:id',
                element: <LiveEdit/>
            }
            ,
            {
                path: '/admin/add-live',
                element: <Addlive/>
            }
            ,
            {
                path: '/admin/blogs',
                element: <Blogs/>
            }
            ,
            {
                path: '/admin/slider',
                element: <Sliders/>
            }



        ]


    } ,

    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/print/:ref',
        element: <Print/>
    }

])