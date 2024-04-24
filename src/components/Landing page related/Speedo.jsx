import GaugeComponent from 'react-gauge-component'
import {useEffect, useState} from 'react'
import {getDashboard} from '../../services/service'
import {useDispatch, useSelector} from "react-redux";
import {userinfoSelector,addDashboard} from "../../slices/UserSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";



const Speedo = () => {

    const dataneeded = useSelector(userinfoSelector)
    const status = useSelector((state) => state.userinfo.status)
    const nav = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState(false)


    const getData =async (t)=>{
        const config = {
            headers: {
                Authorization: `Bearer ${t}`
            }
        }


        const response = await getDashboard(config)
        if (response){
            if (response.data.code===1) {
               dispatch(addDashboard(response.data))
                setData(response.data.info)
            }


        }else {
            toast.warning('اتصال خود را بررسی کنید.')
        }

    }

    //
    // useEffect(() => {
    //     const token = JSON.parse(localStorage.getItem('admin'))
    //     console.log(token)
    //     if (token){
    //         getData(token).then()
    //
    //
    //
    //     } else {
    //         nav('/');
    //
    //     }
    // }, []);


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('admin'))
        if (token){
            setInterval(()=>getData(token).then(),3000)
        } else {
            nav('/');
            toast.error('ابتدا وارد سیستم شو🤔')
        }



    }, []);



  return(
      <>
          <GaugeComponent
              arc={{
                  subArcs: [
                      {
                          limit: 20,
                          color: '#5eff00',
                          showTick: true
                      },
                      {
                          limit: 40,
                          color: '#5fff00',
                          showTick: true
                      },
                      {
                          limit: 70,
                          color: '#EED202',
                          showTick: true
                      },
                      {
                          limit: 100,
                          color: '#ff0000',
                          showTick: true
                      },
                  ]

              }}
              labels={{
                valueLabel:{
                    style:{
                        fill:'black'
                    }
                }
              }}
              value={data? data.cpu:0 }

          />


      </>
  )
}
export default Speedo;