import {useNavigate, useParams} from 'react-router-dom'
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import React, {useEffect, useRef, useState} from "react";
import {getCities, getSingleSalone,url} from "../services/service";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import { Done} from "@mui/icons-material";
import {Spinner} from "../components";
import axios from "axios";
import * as Yup from "yup";



const SaloneEdit = () => {

    const {id:param} = useParams()


    const nav = useNavigate()
    const status = useSelector((state) => state.userinfo.status)
    const dataneeded = useSelector(userinfoSelector)
    const [data, setdata] = useState(false)
    const [cityData, setCities] = useState(false)










    const getData = async (page) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }


        const response = await getSingleSalone(config,param)
        if (response) {

            if (response.data.code === 1) {




                console.log(response.data)
                setdata(response.data)
                setnewPosition([response.data.location.lat,response.data.location.lng])



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


    useEffect(() => {
        if (status !== 'done') {
            nav('/');
            toast.error('ابتدا وارد سیستم شو🤔')
        } else {
            getData().then()
            cities().then()
        }
    }, []);



    const HandleUpdate =async (val,pos)=>{
        const formdata = new FormData()
        formdata.append("name",val.name)
        formdata.append("city_id",val.city_id)
        formdata.append("count",val.count)
        formdata.append("svg",val.svg)
        formdata.append("lat",pos[0])
        formdata.append("lng",pos[1])

        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }

        const response = await axios.post(`${url}/admin/location/edit/${param}`,formdata,config)
        if (response){
            if (response.data.code===1) {
                toast.success('با موفقیت بروز شد.')
            } else {
                toast.warning(response.data.error);
                console.log(response.data)
            }
        }else {
            toast.warning('اتصال خود را بررسی کنید.')
        }

    }




    // map related
    const mapRef = useRef();
    let position = [null];
    if (data!==false){
        position=[data.location.lat,data.location.lng]
    }
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

    let content
    if (data !== false && cityData!==false) {
        content =


                <>
                    <div className='column is-12  p-2 borderrad1 my-1'>

                        <div className='welcome__master p-3'>


                            <Formik initialValues={{

                                name: data.location.name,
                                // lat: data.location.lat,
                                // lng: data.location.lng,
                                city_id: data.city.id,
                                count: data.location.count,
                                svg:data.location.svg



                            }} validationSchema={Yup.object().shape({

                               svg: Yup.string().required('فایل svg ضروری است.')


                            })} onSubmit={(values) => HandleUpdate(values,newposition)}>
                                {({errors, touched}) => (
                                    <Form className=''>


                                        <label className='label mt-3 yekan' aria-hidden="true"> عنوان سالن </label>
                                        <Field className='yekan input my-2' type="text" id="name" name="name"/>
                                        <ErrorMessage component='span' className='has-text-danger yekan mx-auto'
                                                      name='name'/>


                                        <label className='label mt-3 yekan' aria-hidden="true"> ظرفیت سالن</label>
                                        <Field className='yekan input my-2' type="text" id="count"
                                               name="count"/>
                                        <ErrorMessage component='span' className='has-text-danger yekan mx-auto'
                                                      name='count'/>


                                        <label className='label mt-3 yekan' aria-hidden="true"> نقشه سالن</label>
                                        <Field className='yekan textarea my-2' as='textarea' rows='6' type="text" id="svg"
                                               name="svg"/>


                                        <code>
                                            برای تبدیل فایل میتوان از

                                            https://transform.tools/html-to-jsx

                                             استفاده کرد.
                                        </code>


                                        <label className='label mt-3 yekan' aria-hidden="true"> شهر</label>
                                        <Field className='yekan input my-2' as='select' type="text" id="city_id"
                                               name="city_id">
                                            {

                                                cityData.items.map((item) => (
                                                    <option value={item.id}>{item.name}</option>
                                                ))
                                            }


                                        </Field>
                                        <ErrorMessage component='span' className='has-text-danger yekan mx-auto'
                                                      name='city_id'/>



                                        {/*map*/}
                                        <div className='my-6' style={{height: '16rem'}}>
                                            <label className='label mt-3 yekan' aria-hidden="true">آدرس سالن ( قابل مشاهده در صفحه
                                                انتخاب سانس)</label>

                                            <MapContainer ref={mapRef} className='cardboxborder' center={[data.location.lat,data.location.lng]} zoom={9} scrollWheelZoom={false} style={{height:'100%' , borderRadius:'0.9rem'}} >
                                                <TileLayer

                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />


                                                <LocationMarker/>


                                            </MapContainer>


                                        </div>




                                        <button type='submit'
                                                className='button has-text-weight-bold borderrad1 is-success is-outlined  pinar  width100 my-3  '>
                                            <Done /></button>
                                        <ErrorMessage component='span' className='has-text-danger yekan mx-auto'
                                                      name='svg'/>



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
                      تنظیمات سالن
                  </h1>

                  <article className='subtitle yekan my-3 is-size-6'>
                      در این قسمت تنظیمات کلی سالن (مانند عناوین و اطلاعات تماس) قابل مشاهده و ویرایش میباشد.
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
export default SaloneEdit;