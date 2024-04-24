import {webpageoptions,updateWebpageoptions} from '../services/service'
import React, {useEffect, useRef, useState} from "react";
import {Spinner} from "../components";
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import {toast} from "react-toastify";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from "yup";

import {MapContainer, Marker, Popup, TileLayer,useMapEvents} from "react-leaflet";
import {useNavigate} from 'react-router-dom'

const WebsiteInfoSettings = () => {


    const nav = useNavigate()





    const dataneeded = useSelector(userinfoSelector)
    const status = useSelector((state) => state.userinfo.status)
    const [options, setoptions] = useState(false)









    const getdata = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }


        const response = await webpageoptions(config)
        if (response) {

            if (response.data.code === 1) {
                console.log(response.data)
                setoptions(response.data.options)
                setnewPosition([Number(response.data.options.lat), Number(response.data.options.lng)])
                

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
            getdata().then()
        }


    }, []);



    // map related
    const mapRef = useRef();
    const position = [Number(options.lat), Number(options.lng)];
    const [newposition, setnewPosition] = useState(false)
    function LocationMarker() {

        const map = useMapEvents({
            click(e) {
                setnewPosition([e.latlng.lat,e.latlng.lng])

            },

        })

        return position === null ? null : (
            <Marker position={newposition? newposition:position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }




    const HandleUpdate = async (values,position) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }


        const conf = window.confirm('آیا از اعمال تغییرات مطمن هستید ؟')
        if (conf){
            const formdata = new FormData ()
            formdata.append("h1",values.h1)
            formdata.append("subtitle",values.subtitle)
            formdata.append("footer_blue",values.footer_blue)
            formdata.append("footer_black",values.footer_black)
            formdata.append("phone",values.phone)
            formdata.append("address",values.address)
            formdata.append("instagram",values.instagram)
            formdata.append("aparat",values.aparat)
            formdata.append("telegram",values.telegram)
            formdata.append("whatsapp",values.whatsapp)
            formdata.append("about",values.about)
            formdata.append("lat",position[0])
            formdata.append("lng",position[1])
            formdata.append("rules",values.rules)



            const response = await updateWebpageoptions(formdata,config)
            if (response) {
               if (response.data.code===1) {
                   toast.success('تغییرات با موفقیت اعمال شد');
                   // to refetch data
                   getdata()
               }
            } else {
                toast.error('مشکلی در ارتباط پیش آمده است')
            }
        }



    }


    let content
    if (options !== false) {
        content = <Formik initialValues={{
            h1: options.h1,
            subtitle: options.subtitle,
            footer_blue: options.footer_blue,
            footer_black: options.footer_black,
            phone: options.phone,
            address: options.address,
            instagram: options.instagram,
            aparat: options.aparat,
            telegram: options.telegram,
            whatsapp: options.whatsapp,
            about: options.about,
            // lat: newposition[0],
            // lng: newposition[1],
            rules: options.rules,
        }} validationSchema={Yup.object().shape({

            h1: Yup.string().required('ضروری').max(150, 'باید کمتر از 150 کاراکتر باشد'),
            subtitle: Yup.string().required('ضروری').max(200, 'باید کمتر از 200 کاراکتر باشد'),
            footer_blue: Yup.string().required('ضروری').max(250, 'باید کمتر از 250 کاراکتر باشد'),
            footer_black: Yup.string().required('ضروری').max(200, 'باید کمتر از 200 کاراکتر باشد'),
            phone: Yup.string().length(11, 'شماره درست وارد نشده است')
                .required('ضروری'),
            address: Yup.string().required('ضروری').max(200, 'باید کمتر از 200 کاراکتر باشد'),
            instagram: Yup.string().required('ضروری').max(100, 'باید کمتر از 100 کاراکتر باشد'),
            aparat: Yup.string().required('ضروری').max(100, 'باید کمتر از 100 کاراکتر باشد'),
            telegram: Yup.string().required('ضروری').max(100, 'باید کمتر از 100 کاراکتر باشد'),
            whatsapp: Yup.string().required('ضروری').max(100, 'باید کمتر از 100 کاراکتر باشد'),
            about: Yup.string().required('ضروری').max(2000, 'باید کمتر از 2000 کاراکتر باشد'),
            rules: Yup.string().required('ضروری').max(5000, 'باید کمتر از 5000 کاراکتر باشد'),

        })} onSubmit={(values) => HandleUpdate(values,newposition)}>
            {({errors, touched}) => (
                <Form className=''>


                    <label className='label mt-3 yekan' aria-hidden="true">عنوان اصلی سایت</label>
                    <Field className='yekan input my-2' type="text" id="h1" name="h1"
                    />
                    <ErrorMessage component='span' className='has-text-danger yekan mx-auto'
                                  name='email'/>


                    <label className='label mt-3 yekan' aria-hidden="true">عناون فرعی</label>
                    <Field className='yekan input my-2' type="text" id="subtitle" name="subtitle"


                    />
                    <ErrorMessage component='span' className='has-text-danger yekan' name='subtitle'/>


                    <label className='label mt-3 yekan' aria-hidden="true">متن توضیحی فوتر (کادر بنفش رنگ)</label>
                    <Field className='yekan textarea my-2' type="text" id="footer_blue" name="footer_blue"
                           as='textarea' rows='5'

                    />
                    <ErrorMessage component='span' className='has-text-danger yekan' name='footer_blue'/>


                    <label className='label mt-3 yekan' aria-hidden="true">متن توضیحی فوتر/ تیکت آنلاین (کادر سیاه
                        رنگ)</label>
                    <Field className='yekan textarea my-2' type="text" id="footer_black" name="footer_black"
                           as='textarea' rows='5'/>
                    <ErrorMessage component='span' className='has-text-danger yekan' name='footer_black'/>


                    <label className='label mt-3 yekan' aria-hidden="true">شماره تماس</label>
                    <Field className='yekan input my-2' type="tel" id="phone" name="phone"/>
                    <ErrorMessage component='span' className='has-text-danger yekan' name='phone'/>


                    <label className='label mt-3 yekan' aria-hidden="true">آدرس</label>
                    <Field className='yekan input my-2' type="text" id="address" name="address"/>
                    <ErrorMessage component='span' className='has-text-danger yekan' name='address'/>


                    <label className='label mt-3 yekan' aria-hidden="true">اینستاگرام</label>
                    <Field className='yekan input my-2' type="text" id="instagram" name="instagram"/>
                    <ErrorMessage component='span' className='has-text-danger yekan' name='instagram'/>


                    <label className='label mt-3 yekan' aria-hidden="true">آپارات</label>
                    <Field className='yekan input my-2' type="text" id="aparat" name="aparat"/>
                    <ErrorMessage component='span' className='has-text-danger yekan' name='aparat'/>


                    <label className='label mt-3 yekan' aria-hidden="true">تلگرام</label>
                    <Field className='yekan input my-2' type="text" id="telegram" name="telegram"/>
                    <ErrorMessage component='span' className='has-text-danger yekan' name='telegram'/>


                    <label className='label mt-3 yekan' aria-hidden="true">واتس اپ</label>
                    <Field className='yekan input my-2' type="text" id="whatsapp" name="whatsapp"/>
                    <ErrorMessage component='span' className='has-text-danger yekan' name='whatsapp'/>


                    <label className='label mt-3 yekan' aria-hidden="true">متن درباره ما</label>
                    <Field className='yekan textarea my-2' as='textarea' rows='5' type="text" id="about" name="about"/>
                    <ErrorMessage component='span' className='has-text-danger yekan' name='about'/>


                    <label className='label mt-3 yekan' aria-hidden="true">قوانین و مقررات</label>
                    <code >
                        قوانین را به این صورت به لیست اضافه کنید.
                        <br/>

                        {
                            String(
                                '<ul class=\\"yekan is-size-6\\" style=\\"text-align: justify;\\">'
                            )
                        }
                        <br/>

                        {

                            String(

                                '<li class=\"mb-2\">متن قانون<\/li>'

                                )
                        }
                        <br/>

                        {
                            String(
                                '<\/ul>'

                            )
                        }



                    </code>
                    <Field className='yekan textarea my-2' as='textarea' rows='10' type="text" id="rules" name="rules"/>
                    <ErrorMessage component='span' className='has-text-danger yekan' name='rules'/>

                    <div>
                        <label className='label mt-3 yekan' aria-hidden="true">پیش نمایش قوانین و مقررات </label>
                        <article

                            dangerouslySetInnerHTML={{__html: options.rules}}
                        />



                    </div>



                    {/*map*/}
                    <div className='mt-4' style={{height:'21.18rem'}}>
                        <label className='label mt-3 yekan' aria-hidden="true">آدرس دفتر ( قابل مشاهده در صفحه تماس با ما)</label>

                        <MapContainer ref={mapRef} className='cardboxborder' center={position} zoom={11.6} scrollWheelZoom={false} style={{height:'100%' , borderRadius:'0.9rem'}} >
                            <TileLayer

                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        <LocationMarker/>

                        </MapContainer>

                    </div>







                    <button className='button clrone has-text-weight-bold  pinar mt-6 ' type='submit'>ثبت تغییرات</button>


                </Form>


            )}


        </Formik>
    } else {
        content = <Spinner/>
    }


    return (
        <>
            <div className='columns mt-3 px-4 pb-3 is-multiline welcome__master' style={{maxHeight: "100%"}}>

                <div className='column is-12 '>
                    <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                        تنظیمات کلی وبسایت
                    </h1>

                    <article className='subtitle yekan my-3 is-size-6'>
                        در این قسمت تنظیمات کلی سایت (مانند عناوین و اطلاعات تماس) قابل مشاهده و ویرایش میباشد.
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
export default WebsiteInfoSettings;