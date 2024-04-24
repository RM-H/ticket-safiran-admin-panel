import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import {useNavigate,useParams} from "react-router-dom";
import {getCities, getSingers, getSingleVideo,url} from "../services/service";
import {toast} from "react-toastify";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Done} from "@mui/icons-material";
import {Spinner} from "../components";
import axios from "axios";
import {LinearProgress} from "@mui/material";

const LiveEdit = () => {

    const {id} = useParams()
    const nav = useNavigate()
    const status = useSelector((state) => state.userinfo.status)
    const dataneeded = useSelector(userinfoSelector)
    const [data, setdata] = useState(false)
    const [cityData, setCities] = useState(false)
    const [singersList, setSingers] = useState(false)

    const [date, setDate] = useState(false)
    const [image, setImg]= useState('')
    const [video,setVideo]= useState(false)


    // keeping track of shit getting uploaded
    const [progress, setProgress] = useState(0);


    const getData =async (page)=>{
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }


        const response = await getSingleVideo(config,id)
        if (response) {

            if (response.data.code===1) {

                setdata(response.data)
                setDate(new Date(response.data.video.time_stamp*1000).toLocaleDateString('fa-IR'))




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

                console.log(response.data)


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
        }
    }, []);
    
    
    const HandleUpdate = async (val,date,img,vid) => {
        const formdata = new FormData()
        formdata.append('title',val.title)
        formdata.append('city_id',val.city_id)
        formdata.append('singer_id',val.singer_id)
        formdata.append('location',val.location)
        formdata.append('price',val.price)
        formdata.append('live',val.live)
        formdata.append('play',val.play)
        formdata.append('clock',val.clock)
        formdata.append('link',val.link)
        formdata.append('cover',img)
        formdata.append('video',vid)
        formdata.append('date',date)
        formdata.append('location_name',val.location_name)


        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`,
                'Content-Type': 'multipart/form-data'
            } ,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentCompleted);
            },
        }



        const response = await axios.post(`${url}/admin/video/edit/${data.video.id}`,formdata,config)
        if (response){
            if(response.data.code===1){
                toast.success('با موفقی بروز شد')
                getData().then()
            } else {
                toast.warning(response.data.error)
            }

        } else{
            toast.warning('اتصال خود را بررسی کنید.')
        }

      
    }




    let content

    if (data !== false&& cityData!==false&& singersList!==false ) {
        content =


            <>
                <div className='column is-12  p-2 borderrad1 my-1'>

                    <div className='welcome__master p-3'>


                        <Formik initialValues={{

                            title: data.video.title,
                            city_id: data.city.id,
                            singer_id: data.singer.id,
                            location: data.video.location_name,
                            price: data.video.price,
                            live: data.video.live,
                            play: data.video.play,
                            link: data.video.link,
                            location_name:data.video.location_name,


                            clock: `${new Date(data.video.time_stamp *1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' ,hour12:false  })}`,
                            // active: data.concert.active,
                            // type: data.concert.type,



                        }} validationSchema={Yup.object().shape({

                            title: Yup.string().required('عنوان ضروری است.')


                        })} onSubmit={(values) => HandleUpdate(values,date,image,video)}>
                            {({errors, touched}) => (
                                <Form className=''>


                                    <label className='label mt-3 yekan' aria-hidden="true"> عنوان </label>
                                    <Field className='yekan input my-2' type="text" id="title" name="title"/>

                                    <label className='label mt-3 yekan' aria-hidden="true"> محل </label>
                                    <Field className='yekan input my-2' type="text" id="location_name" name="location_name"/>


                                    <label className='label mt-3 yekan' aria-hidden="true"> قیمت </label>
                                    <Field className='yekan input my-2' type="text" id="price" name="price"/>



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

                                    <label className='label mt-3 yekan' aria-hidden="true"> لینک ویدیو زنده </label>
                                    <Field className='yekan input my-2' type="text" id="link" name="link"/>




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
                                                    value={data.video.time_stamp * 1000}/>


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


                                    <label className='label mt-3 yekan' aria-hidden="true"> عکس </label>
                                    <input onChange={(e) => setImg(e.target.files[0])} className='yekan input'
                                           type='file' id="img"
                                           name="img"/>

                                    <label className='label mt-3 yekan' aria-hidden="true"> ویدوی آرشیوی </label>
                                    <input onChange={(e) => setVideo(e.target.files[0])} className='yekan input'
                                           type='file' id="img"
                                           name="img"/>
                                    <LinearProgress variant="determinate" value={progress}/>


                                    <div className='has-text-centered my-5 p-3 borderrad1 lightborder'>
                                        <p className='pinar my-3'>
                                            تصویر کنونی
                                        </p>
                                        <img src={`https://ticket.metamax.network/${data.video.cover}`}/>
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


                  {
                      content
                  }

          </div>


      </>
  )
}
export default LiveEdit;