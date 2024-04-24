import React, {useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {getCities, getSalone, url} from '../services/service'
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {userinfoSelector} from "../slices/UserSlice";
import {useNavigate} from "react-router-dom";
import {DeleteOutline, Edit, NavigateBefore, NavigateNext} from "@mui/icons-material";
import {Spinner, SaloneTable} from "../components";


import axios from "axios";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";


const Salone = () => {
    const nav = useNavigate()

    const dataneeded = useSelector(userinfoSelector)
    const [data, setdata] = useState(false)
    const [cityData, setCities] = useState(false)

    const [search,setSearch] = useState('')



    // map related
    const mapRef = useRef();
    const [newposition, setnewPosition] = useState([10,10])
    function LocationMarker() {

        const map = useMapEvents({
            click(e) {
                setnewPosition([e.latlng.lat,e.latlng.lng])

            },

        })

        return (
            <Marker position={newposition}>
                <Popup>You are here</Popup>
            </Marker>
        )

    }



        const getData = async (page) => {
            const token = JSON.parse(localStorage.getItem('admin'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                take: 12, page: page , search:search
            }
        }


        const response = await getSalone(config)
        if (response) {

            if (response.data.code === 1) {

                setdata(response.data)
                console.log(response.data)


            } else {
                toast.error(response.data.error)
            }

        } else {
            toast.error('اتصال خود به شبکه را بررسی کرده و مجددا تلاش کنید.')
        }
    }
    const cities = async (t) => {
        const config = {
            headers: {
                Authorization: `Bearer ${t}`
            }
        }


        const response = await getCities(config)
        if (response) {

            if (response.data.code === 1) {
                console.log(response.data)

                setCities(response.data)


            } else {
                toast.error(response.data.error)
            }

        } else {
            toast.error('اتصال خود به شبکه را بررسی کرده و مجددا تلاش کنید.')
        }
    }

    useEffect(() => {
        getData().then()
    }, [search]);



    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('admin'))

        if (token){
            getData().then()
            cities(token).then()
        } else {
            nav('/');
            toast.error('ابتدا وارد سیستم شو🤔')
        }


    }, []);

    const handleAdd = async (val,pos) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        const formdata = new FormData()
        formdata.append("name",val.name)
        formdata.append("city_id",val.city_id)
        formdata.append("count",val.count)
        formdata.append("svg",val.svg)
        formdata.append("lat",pos[0])
        formdata.append("lng",pos[1])

        const response = await axios.post(`${url}/admin/location/add`,formdata,config)
        if (response){
            if (response.data.code===1){
                toast.success('با موفقیت اضافه شد.');
                getData()
            } else {
                toast.warning(response.data.error)
            }
        }else {
            toast('اتصال خود را بررسی کنید.')
        }
    }


    const handleDelete = async (itemid) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        const conf = window.confirm('آیا  مطمن هستید ؟')
        if (conf) {

            let endpoint = `${url}/admin/location/delete/${itemid}`
            const response = await axios.get(endpoint, config)
            if (response) {
                if (response.data.code === 1) {
                    toast.success('با موفقیت حذف شد.');
                    getData().then();
                } else {
                    toast.warning(response.data.error)
                }
            } else {
                toast.error('اتصال خود را بررسی کنید')
            }
        }

    }


    let content
    if (data !== false) {
        if (data.items.length>0){
            content = <SaloneTable>
                {data.items.map((item)=>{
                    return(
                        <>
                            <tr className='has-text-centered yekan'>


                                <td>{item.locations_view.name}</td>
                                <td>{item.locations_view.count}</td>
                                <td>{item.cities.name}</td>

                                <td>
                                    <button className='button is-danger is-outlined mx-1' onClick={() => handleDelete(item.locations_view.id)}>
                                        <DeleteOutline  />
                                    </button>

                                    <button className='button is-link is-outlined mx-1' onClick={() => nav(`/admin/salon/${item.locations_view.id}`)}>
                                        <Edit />
                                    </button>



                                </td>
                            </tr>
                        </>

                    )
                })}
            </SaloneTable>
        }else {
            content =
                <div className='column is-12'>
                    <p className='my-3'>
                        چیزی برای نمایش وجود ندارد 🤷‍♀️

                    </p>
                </div>
        }


    } else {
        content = <div className='column is-12'>
            <Spinner/>
        </div>
    }


    return (
        <>
            <div className='columns is-variable is-3 mt-3 px-4 pb-3 is-multiline'>
                <div className='column is-12 welcome__master'>
                    <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                        تنظیمات سالن ها
                    </h1>

                    <article className='subtitle yekan my-3 is-size-6'>
                        مشاهده و ویرایش تنظیمات سالن مربوط به رویداد ها در این قسمت صورت میگیرد.
                    </article>

                </div>


                <div className='column is-12 my-4 p-3 welcome__master'>

                    <article className="message is-warning yekan lightborder borderrad1 mt-3">
                        <div className="message-header">
                            <p>راهنما</p>

                        </div>
                        <div className="message-body">
                            قبل از قیمت گذاری صندلی های یک کنسرت باید نقشه سالن آن برنامه در این قسمت ایجاد شود.
                        </div>
                    </article>

                    <h3 className='yekan'>
                        اضافه کردن سالن
                    </h3>

                    <Formik initialValues={{

                        name: '',
                        // lat: '',
                        // lng: '',
                        city_id: '',
                        count: '',
                        svg: ''


                    }} validationSchema={Yup.object().shape({

                        name: Yup.string().required('نام سالن وارد نشده است').max(500, 'باید کمتر از 500 کاراکتر باشد'),
                        count: Yup.number().required('ظرفیت سالن وارد نشده است'),
                        svg: Yup.string().required('نقشه سالن وارد نشده است'),


                    })} onSubmit={(values, actions) => {
                        handleAdd(values, newposition);
                        // actions.resetForm();
                    }}>
                        {({errors, touched}) => (
                            <Form className=''>


                                <label className='label mt-3 yekan' aria-hidden="true">عنوان سالن</label>
                                <Field className='yekan input my-2' type="text" id="name" name="name"/>


                                <label className='label mt-3 yekan' aria-hidden="true">ظرفیت </label>
                                <Field className='yekan input my-2' type="number" id="count" name="count"/>


                                <label className='label mt-3 yekan' aria-hidden="true"> نقشه سالن</label>
                                <Field className='yekan textarea my-2' as='textarea' type="text" id="svg"
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

                                        cityData ? cityData.items.map((item) => (
                                            <option value={item.id}>{item.name}</option>
                                        )) : <Spinner/>


                                    }


                                </Field>

                                {/*map*/}
                                <div className='my-6' style={{height: '16rem'}}>
                                    <label className='label mt-3 yekan' aria-hidden="true">آدرس سالن ( قابل مشاهده در
                                        صفحه
                                        انتخاب سانس)</label>

                                    <MapContainer ref={mapRef} className='cardboxborder' center={newposition} zoom={9}
                                                  scrollWheelZoom={false}
                                                  style={{height: '100%', borderRadius: '0.9rem'}}>
                                        <TileLayer

                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />


                                        <LocationMarker/>


                                    </MapContainer>


                                </div>


                                <div className='has-text-centered'>
                                    <button
                                        className='button clrone has-text-weight-bold  pinar mt-6 width100 borderrad1 '
                                        type='submit'> اضافه کن
                                    </button>


                                </div>
                                <ErrorMessage component='span' className='has-text-danger yekan mx-auto'
                                              name='name'/>
                                <ErrorMessage component='span' className='has-text-danger yekan mx-auto' name='count'/>
                                <ErrorMessage component='span' className='has-text-danger yekan mx-auto' name='svg'/>


                            </Form>


                        )}


                    </Formik>
                </div>


                <div className='column is-12 my-2 welcome__master'>
                    <input className="input" onChange={(e) => setSearch(e.target.value)} type="text"
                           placeholder="جستجو ..."/>
                </div>
                {
                    content
                }

                {/*paginator*/}
                <div className='column is-12'>
                    {data &&
                        <div className='pinar' style={{display: 'flex', justifyContent: 'center'}}>


                            {/*before page with tick*/}
                            {
                                data.paginator.beforePage < data.paginator.currentPage && (

                                    <button onClick={() => getData(data.paginator.beforePage)} className='button'>
                                        <NavigateNext/>
                                    </button>
                                )


                            }


                            {/*map beforePages*/}
                            {data.paginator.beforePages.length > 0 &&

                                <>
                                    {data.paginator.beforePages.map((item, index) =>
                                        <button className='button' onClick={() => getData(item)} key={index}>
                                            {item}
                                        </button>
                                    )}
                                </>

                            }


                            {/*active*/}

                            {
                                data.paginator.total > 0 &&
                                <button className='clrtwo has-text-white button'>{data.paginator.currentPage}</button>


                            }


                            {/*map nextPages*/}
                            {data.paginator.nextPages.length > 0 &&
                                <>
                                    {data.paginator.nextPages.map((item, index) =>
                                        <button className='button' onClick={() => getData(item)} key={index}>
                                            {item}
                                        </button>
                                    )}
                                </>

                            }


                            {/*next page with tick*/}
                            {

                                data.paginator.nextPage > data.paginator.currentPage && (

                                    <button onClick={() => getData(data.paginator.nextPage)}
                                            className='button is-transparent'>
                                        <NavigateBefore/>
                                    </button>
                                )


                            }


                        </div>
                    }
                </div>


            </div>

        </>
    )
}
export default Salone;