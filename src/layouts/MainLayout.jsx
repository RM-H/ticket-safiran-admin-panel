import {Outlet, useNavigate} from 'react-router-dom'
import {Navbar,Sidebar} from "../components";

import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addDashboard, adduserinfo, environmentSelector,} from "../slices/UserSlice";
import {toast} from "react-toastify";
import {getDashboard} from "../services/service";

const MainLayout = () => {





    const nav = useNavigate()
    const dispatch = useDispatch()

    // bilitim or safir selector
    const env = useSelector(environmentSelector)


    const getData = async (t)=>{

        const config = {
            headers: {
                Authorization: `Bearer ${t}`
            }
        }
        const response = await getDashboard(config)
        if (response){
            if (response.data.code===1){
                dispatch(adduserinfo(response.data))
                dispatch(addDashboard(response.data))
            } else {
                nav('/');
                toast.warning(response.data.error)
            }
        }else {
             nav('/');
            toast.error('ابتدا وارد سیستم شو🤔');




        }
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('admin'))
       
        if (token){
            setInterval(()=>getData(token).then(),3000)




        } else {
            nav('/');

        }
    }, []);

  return(
      <>
        <div className={`is-flex is-flex-direction-column is-align-items-center mx-auto ${env===1 ? 'body-bilit':'body-safir'} `} style={{width: '100vw' , height:'100vh'}}>
            <Navbar/>
            <div className='columns width100 m-0 px-4' style={ {height:'100%', paddingTop:'7.6em'}} >
                <div className='column is-2 '>
                    <Sidebar/>

                </div>

                <div className='column is-10 scrollcolor' style={{height:'100%' , overflowY:'auto'}} >

                    <Outlet/>
                </div>
            </div>





        </div>

      </>
  )
}
export default MainLayout;