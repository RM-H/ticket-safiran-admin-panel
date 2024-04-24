import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {url, getSingleSans} from "../services/service";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Done} from "@mui/icons-material";
import {Spinner} from "../components";
import axios from "axios";


const SansEdit = () => {
    const {sans,id } = useParams()

    const nav = useNavigate()
    const status = useSelector((state) => state.userinfo.status)
    const dataneeded = useSelector(userinfoSelector)
    const [data, setdata] = useState(false)


    const [date, setDate] = useState(false)
    const getData = async (page) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }


        const response = await getSingleSans(config, sans)
        if (response) {

            if (response.data.code === 1) {


                console.log(response.data)
                setdata(response.data)
                setDate(new Date(response.data.sans.time_stamp*1000).toLocaleDateString('fa-IR'))


            } else {
                toast.error(response.data.error)

            }

        } else {
            toast.error('اتصال خود به شبکه را بررسی کرده و مجددا تلاش کنید.')
        }
    }




    useEffect(() => {
        if (status !== 'done') {
            nav('/');
            toast.error('ابتدا وارد سیستم شو🤔')
        } else {
            getData().then()


        }
    }, []);
    
    const HandleUpdate = async (val,date) => {
        const formdata = new FormData()
        formdata.append("clock" , val.clock)
        formdata.append("date" , date)
        formdata.append("concert_id",id)

        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`,
                'Content-Type': 'multipart/form-data'
            }
        }

        const response = await axios.post(`${url}/admin/sans/edit/${sans}`,formdata,config)

        if (response){
            if (response.data.code===1){
                toast.success('با موفقیت انجام شد !')
                getData().then()
            } else {
                toast.warning(response.data.error)
            }
        }else {
            toast.warning('اتصال خود را بررسی کنید.')
        }



    }

    let content
    if (data !== false) {
        content =


            <>
                <div className='column is-12  p-2 borderrad1 my-1'>

                    <div className='welcome__master p-3'>


                        <Formik initialValues={{




                            clock: `${new Date(data.sans.time_stamp * 1000).getHours()}:${new Date(data.sans.time_stamp * 1000).getMinutes()}`,




                        }} validationSchema={Yup.object().shape({

                            clock: Yup.string().required('عنوان ضروری است.')


                        })} onSubmit={(values) => HandleUpdate(values, date)}>
                            {({errors, touched}) => (
                                <Form className=''>


                                    <label className='label mt-3 yekan' aria-hidden="true"> ساعت شروع فروش </label>
                                    <Field className='yekan input' type='time' id="clock" name="clock"/>


                                    {/*date and time*/}
                                    <div className='has-text-centered my-4'>
                                        <DatePicker style={{
                                            fontFamily: 'pinar',
                                            fontSize: '1rem',
                                            padding: '2rem',
                                            textAlign: 'center'
                                        }} className='pinar' onChange={setDate} calendar={persian} locale={persian_fa}
                                                    value={date}/>


                                    </div>


                                    <button type='submit'
                                            className='button has-text-weight-bold borderrad1 is-success is-outlined  pinar  width100 my-3  '>
                                        <Done/></button>


                                </Form>


                            )}


                        </Formik>


                    </div>

                </div>

            </>

    } else {
        content = <div className='column is-12'>
            <Spinner/>
        </div>
    }
  return(
      <>
          <div className='columns mt-3 px-4 pb-3 is-multiline welcome__master'>


              <div className='column is-12 '>
                  <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                    ویرایش سانس
                  </h1>




              </div>


                  {
                      content
                  }

          </div>

      </>
  )
}
export default SansEdit;