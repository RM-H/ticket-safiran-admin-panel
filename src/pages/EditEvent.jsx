import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import React, {useEffect, useState} from "react";
import {getCities, getSingleEvent, getSingers, getSalone,url} from "../services/service";
import {toast} from "react-toastify";
import { Field, Form, Formik} from "formik";
import * as Yup from "yup";

import {Done} from "@mui/icons-material";
import {Spinner} from "../components";
import DatePicker from "react-multi-date-picker";

import "react-datepicker/dist/react-datepicker.css";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import axios from "axios";


const EditEvent = () => {

    const {id: param} = useParams()


    const nav = useNavigate()
    const status = useSelector((state) => state.userinfo.status)
    const dataneeded = useSelector(userinfoSelector)
    const [data, setdata] = useState(false)
    const [cityData, setCities] = useState(false)
    const [singersList, setSingers] = useState(false)
    const [SalonesList, setSalones] = useState(false)
    const [date, setDate] = useState(false)
    const [image, setImg]= useState(false)



    const getData = async (page) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }


        const response = await getSingleEvent(config, param)
        if (response) {

            if (response.data.code === 1) {


                console.log(response.data)
                setdata(response.data)
                setDate(new Date(response.data.concert.date*1000).toLocaleDateString('fa-IR'))


            } else {
                toast.error(response.data.error)

            }

        } else {
            toast.error('اتصال خود به شبکه را بررسی کرده و مجددا تلاش کنید.')
        }
    }


    const cities = async (page) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }


        const response = await getCities(config)
        if (response) {

            if (response.data.code === 1) {

                setCities(response.data)


            } else {
                toast.error(response.data.error)
            }

        } else {
            toast.error('اتصال خود به شبکه را بررسی کرده و مجددا تلاش کنید.')
        }
    }

    const singers = async (page) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }


        const response = await getSingers(config)
        if (response) {

            if (response.data.code === 1) {

                setSingers(response.data)


            } else {
                toast.error(response.data.error)
            }

        } else {
            toast.error('اتصال خود به شبکه را بررسی کرده و مجددا تلاش کنید.')
        }
    }

    const salones = async (page) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }


        const response = await getSalone(config)
        if (response) {

            if (response.data.code === 1) {

                setSalones(response.data)


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
            cities().then()
            singers().then()
            salones().then()
        }
    }, []);

    const HandleUpdate = async (val, date,img) => {
        const formdata = new FormData()
        formdata.append("title", val.title)
        formdata.append("city_id", val.city_id)
        formdata.append("singer_id", val.singer_id)
        formdata.append("location_id", val.location_id)
        formdata.append("active", val.active)
        formdata.append("type", val.type)
        formdata.append("img", img)
        formdata.append("clock", val.clock)

        formdata.append("date", date)

        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`,
                'Content-Type': 'multipart/form-data'
            }
        }



        const response = await axios.post(`${url}/admin/concert/edit/${data.concert.id}`,formdata,config)
        if (response){
            if (response.data.code===1){
                toast.success('با موفقیت بروز شد')
                getData().then()
            } else {
                toast.warning(response.data.error)
            }
        }else {
            toast.warning('بررسی خود به اینترنت را بررسی کنید.')
        }

    }


    let content
    if (data !== false && cityData !== false && singersList !== false && SalonesList !== false) {
        content =


            <>
                <div className='column is-12  p-2 borderrad1 my-1'>

                    <div className='welcome__master p-3'>


                        <Formik initialValues={{

                            title: data.concert.title,
                            city_id: data.location.city_id,
                            singer_id: data.concert.singer_id,
                            location_id: data.concert.location_id,

                            clock: `${new Date(data.concert.remain *1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' ,hour12:false  })}`,
                            active: data.concert.active,
                            type: data.concert.type,
                            // img: null


                        }} validationSchema={Yup.object().shape({

                            title: Yup.string().required('عنوان ضروری است.')


                        })} onSubmit={(values) => HandleUpdate(values, date, image)}>
                            {({errors, touched}) => (
                                <Form className=''>


                                    <label className='label mt-3 yekan' aria-hidden="true"> عنوان رویداد </label>
                                    <Field className='yekan input my-2' type="text" id="title" name="title"/>


                                    <label className='label mt-3 yekan' aria-hidden="true"> نوع رویداد</label>
                                    <Field className='yekan input my-2' as='select' type="text" id="type"
                                           name="type">


                                        <option value={1}>کنسرت</option>
                                        <option value={2}>همایش</option>
                                        <option value={3}>تئاتر</option>


                                    </Field>


                                    <label className='label mt-3 yekan' aria-hidden="true"> وضعیت</label>
                                    <Field className='yekan input my-2' as='select' type="text" id="active"
                                           name="active">


                                        <option value={0}>برگزار شده یا فروخته شده</option>
                                        <option value={1}>فعال</option>
                                        <option value={2}>درانتظار برگزاری</option>


                                    </Field>


                                    <code>
                                        با تغییر وضعیت به حالت "در انتظار برگزاری" تایمری برای شروع خرید بلیط فعال خواهد
                                        شد.
                                        زمان اتمام تایمر را فیلد ساعت شروع فروش مشخص میکند.
                                    </code>

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
                                                    value={data.concert.date * 1000}/>


                                    </div>


                                    <label className='label mt-3 yekan' aria-hidden="true"> شهر</label>
                                    <Field className='yekan input my-2' as='select' type="text" id="city_id"
                                           name="city_id">
                                        {

                                            cityData.items.map((item) => (
                                                <option value={item.id}>{item.name}</option>
                                            ))
                                        }


                                    </Field>


                                    <label className='label mt-3 yekan' aria-hidden="true"> خواننده یا مجری</label>
                                    <Field className='yekan input my-2' as='select' type="text" id="singer_id"
                                           name="singer_id">
                                        {

                                            singersList.items.map((item) => (
                                                <option value={item.id}>{item.name}</option>
                                            ))
                                        }


                                    </Field>


                                    <label className='label mt-3 yekan' aria-hidden="true"> سالن </label>
                                    <Field className='yekan input my-2' as='select' type="text" id="location_id"
                                           name="location_id">
                                        {

                                            SalonesList.items.map((item) => (
                                                <option
                                                    value={item.locations_view.id}>{item.locations_view.name}</option>
                                            ))
                                        }


                                    </Field>


                                    <label className='label mt-3 yekan' aria-hidden="true"> عکس </label>
                                    <input onChange={(e) => setImg(e.target.files[0])} className='yekan input'
                                           type='file' id="img"
                                           name="img"/>


                                    <div className='has-text-centered my-5 p-3 borderrad1 lightborder'>
                                        <p className='pinar my-3'>
                                            تصویر کنونی
                                        </p>
                                        <img src={`https://ticket.metamax.network/${data.concert.img}`}/>
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

    return (

        <>
            <div className='columns mt-3 px-4 pb-3 is-multiline welcome__master'>


                <div className='column is-12 '>
                    <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                        تنظیمات رویداد
                    </h1>

                    <article className='subtitle yekan my-3 is-size-6'>
                        در این قسمت تنظیمات کلی رویداد قابل مشاهده و ویرایش میباشد.
                    </article>


                </div>

                <div className='column is-12 p-6 lightborder borderrad1'>
                    {
                        content
                    }
                </div>
            </div>


        </>
    )

}
export default EditEvent