import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {LinearProgress} from "@mui/material";
import {Done} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {getCities, getSingers, url} from "../services/service";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import axios from "axios";


const AddLive = () => {
    const nav = useNavigate()
    const [date, setDate] = useState(false)
    const [image, setImg] = useState('')
    const [video, setVideo] = useState(false)
    const status = useSelector((state) => state.userinfo.status)
    const dataneeded = useSelector(userinfoSelector)

    const [cityData, setCities] = useState(false)
    const [singersList, setSingers] = useState(false)
    // keeping track of shit getting uploaded
    const [progress, setProgress] = useState(0);


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

    useEffect(() => {
        if (status !== 'done') {
            nav('/');
            toast.error('ابتدا وارد سیستم شو🤔')


        } else {
            cities().then()
            singers()

        }
    }, []);


    const HandleAdd = async (val, d, i, v) => {


        const formdata = new FormData()
        formdata.append('title', val.title)
        formdata.append('city_id', val.city_id)
        formdata.append('singer_id', val.singer_id)

        formdata.append('price', val.price)
        formdata.append('live', val.live)
        formdata.append('play', val.play)
        formdata.append('clock', val.clock)
        formdata.append('link', val.link)
        formdata.append('cover', i)
        formdata.append('video', v)
        formdata.append('date', d)
        formdata.append('location_name', val.location_name)

        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`,
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentCompleted);
            },
        }

        const response = await axios.post(`${url}/admin/video/add`, formdata, config)
        if (response) {
            if (response.data.code===1){
                toast.success('با موفقیت اضافه شد')
                nav('/admin/live')
            } else {
                toast.error(response.data.error)
                console.log(response.data)
            }

        } else {
            toast.warning('اتصال خود را بررسی کنید.')
        }

    }


    let content
    if (singersList !== false && cityData !== false) {

        content = <div className='column is-12  p-4 borderrad1 my-1'>

            <div className='welcome__master p-3'>


                <Formik initialValues={{

                    title: '',
                    city_id: 1,
                    singer_id: 1,
                    location: '',
                    price: '',
                    live: 0,
                    play: 0,
                    link: '#',
                    location_name: '',


                    clock: '',
                    // active: data.concert.active,
                    // type: data.concert.type,


                }} validationSchema={Yup.object().shape({

                    title: Yup.string().required('عنوان ضروری است.'),

                    // singer_id: Yup.string().required('خواننده ضروری است.'),
                    // location: Yup.string().required('عنوان  ضروری است.'),
                    price: Yup.string().required('قیمت ضروری است.'),


                    link: Yup.string().required('لینک ضروری است.'),
                    location_name: Yup.string().required('عنوان لوکیشن ضروری است.'),


                })} onSubmit={(values) => HandleAdd(values, date, image, video)}>
                    {({errors, touched}) => (
                        <Form className=''>


                            <label className='label mt-3 yekan' aria-hidden="true"> عنوان </label>
                            <Field className='yekan input my-2' type="text" id="title" name="title"/>

                            <label className='label mt-3 yekan' aria-hidden="true"> محل </label>
                            <Field className='yekan input my-2' type="text" id="location_name"
                                   name="location_name"/>


                            <label className='label mt-3 yekan' aria-hidden="true"> قیمت </label>
                            <Field className='yekan input my-2' type="text" id="price" name="price"/>


                            {/*<label className='label mt-3 yekan' aria-hidden="true"> نوع رویداد</label>*/}
                            {/*<Field className='yekan input my-2' as='select' type="text" id="city_id"*/}
                            {/*       name="city_id">*/}


                            {/*    <option value={1}>کنسرت</option>*/}
                            {/*    <option value={2}>همایش</option>*/}
                            {/*    <option value={3}>تئاتر</option>*/}


                            {/*</Field>*/}

                            <label className='label mt-3 yekan' aria-hidden="true"> خواننده یا مجری</label>
                            <Field className='yekan input my-2' as='select' type="text" id="singer_id"
                                   name="singer_id">
                                {

                                    singersList.items.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))
                                }


                            </Field>


                            <label className='label mt-3 yekan' aria-hidden="true"> پخش</label>
                            <Field className='yekan input my-2' as='select' type="text" id="play"
                                   name="play">


                                <option value={0}>خاموش</option>
                                <option value={1}>در حال پخش</option>


                            </Field>

                            <label className='label mt-3 yekan' aria-hidden="true"> زنده یا آرشیو</label>
                            <Field className='yekan input my-2' as='select' type="text" id="live"
                                   name="live">


                                <option value={0}>آرشیو</option>
                                <option value={1}>زنده</option>


                            </Field>

                            <article className="message is-warning">
                                <div className="message-header">
                                    <p>توجه</p>

                                </div>
                                <div className="message-body">
                                    با انتخاب ویدیو از نوع آرشیو لینک ویدوی را مقدار # قرار دهید و فایل ویدیو را انتخاب
                                    کنید. اگر ویدیو از نوع زنده باشد لینک پخش را وارد کرده و ویدویی انتخاب نکنید.
                                </div>
                            </article>

                            <label className='label mt-3 yekan' aria-hidden="true"> لینک ویدیو زنده </label>
                            <Field className='yekan input my-2' type="text" id="link" name="link"/>


                            {/*<code>*/}
                            {/*    با تغییر وضعیت به حالت "در انتظار برگزاری" تایمری برای شروع خرید بلیط فعال خواهد*/}
                            {/*    شد.*/}
                            {/*    زمان اتمام تایمر را فیلد ساعت شروع فروش مشخص میکند.*/}
                            {/*</code>*/}

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


                            <label className='label mt-3 yekan' aria-hidden="true"> شهر</label>
                            <Field className='yekan input my-2' as='select' type="text" id="city_id"
                                   name="city_id">
                                {

                                    cityData.items.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))
                                }


                            </Field>

                            <article className="message is-warning">
                                <div className="message-header">
                                    <p>توجه</p>

                                </div>
                                <div className="message-body">
                                    انخاب کاور برای ویدیو ها ضروری است.
                                </div>
                            </article>


                            <label className='label mt-3 yekan' aria-hidden="true"> عکس کاور </label>
                            <input onChange={(e) => setImg(e.target.files[0])} className='yekan input'
                                   type='file' id="img"
                                   name="img"/>

                            <label className='label mt-3 yekan' aria-hidden="true"> ویدوی آرشیوی </label>
                            <input onChange={(e) => setVideo(e.target.files[0])} className='yekan input'
                                   type='file' id="img"
                                   name="img"/>
                            <LinearProgress variant="determinate" value={progress}/>


                            <button type='submit'
                                    className='button has-text-weight-bold borderrad1 is-success is-outlined  pinar  width100 my-3  '>
                                <Done/></button>


                            <div>
                                <ErrorMessage component='p' className='has-text-danger yekan mx-auto' name='title'/>
                                <ErrorMessage component='p' className='has-text-danger yekan mx-auto' name='price'/>
                                <ErrorMessage component='p' className='has-text-danger yekan mx-auto' name='link'/>
                                <ErrorMessage component='p' className='has-text-danger yekan mx-auto'
                                              name='location_name'/>


                            </div>


                        </Form>


                    )}


                </Formik>


            </div>

        </div>


    }


    return (
        <>
            <div className='columns mt-3 px-4 pb-3 is-multiline welcome__master'>
                {
                    content
                }


            </div>


        </>
    )
}
export default AddLive;