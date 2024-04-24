import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import React, {useEffect, useState} from "react";
import {getSingers, url} from "../services/service";
import {toast} from "react-toastify";
import {Delete, Edit, NavigateBefore, NavigateNext} from "@mui/icons-material";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Spinner} from "../components";
import axios from "axios";
import {Tooltip} from '@mui/material'

const Singers = () => {

    const nav = useNavigate()
    const dataneeded = useSelector(userinfoSelector)

    const [data, setdata] = useState(false)
    const [search,setSearch] = useState('')


    const getData = async (page ) => {
        const token = JSON.parse(localStorage.getItem('admin'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                take: 8, page: page,search:search
            }
        }


        const response = await getSingers(config)
        if (response) {

            if (response.data.code === 1) {

                setdata(response.data)


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
        } else {
            nav('/');
            toast.error('ابتدا وارد سیستم شو🤔')
        }





    }, []);


    const handleUpdate = async (itemid, values) => {

        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        const conf = window.confirm('آیا  مطمن هستید ؟')
        if (conf) {
            let endpoint = `${url}/admin/singer/edit/${itemid}`
            const formdata = new FormData()
            formdata.append("name", values.name)
            formdata.append("singer_type", 1)
            const response = await axios.post(endpoint, formdata, config)
            if (response) {
                if (response.data.code === 1) {
                    toast.success('با موفقیت بروز شد.');
                    getData().then();
                }
            } else {
                toast.error('اتصال خود را بررسی کنید')
            }


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

            let endpoint = `${url}/admin/singer/delete/${itemid}`
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


    const handleAdd = async (values) => {

        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        const conf = window.confirm('آیا  مطمن هستید ؟')
        if (conf) {
            let endpoint = `${url}/admin/singer/add`
            const formdata = new FormData()
            formdata.append("name", values.q)
            formdata.append("singer_type", 1)

            const response = await axios.post(endpoint, formdata, config)
            if (response) {
                if (response.data.code === 1) {
                    toast.success('با موفقیت اضافه شد.');
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

        if (data.items.length>0) {
            content = (data.items.map((item) => {
                return (

                    <>
                        <tr key={item.id}>

                            <td>
                                {/*form*/}

                                <Formik initialValues={{


                                    // clock: `${new Date(data.sans.time_stamp * 1000).getHours()}:${new Date(data.sans.time_stamp * 1000).getMinutes()}`,
                                    name: item.name,



                                }} validationSchema={Yup.object().shape({

                                    name: Yup.string().required('عنوان ضروری است.').max(20, 'باید کمتر از 20 کاراکتر باشد'),


                                })} onSubmit={(values) => {
                                    handleUpdate(item.id,values);

                                }}>
                                    {({errors, touched}) => (
                                        <Form className='is-flex is-flex-direction-row'>


                                            <Field className='yekan input' type='text' id="name" name="name"/>


                                            <Tooltip className='yekan' title='ویرایش' placement='right'>
                                                <button type='submit'
                                                        className='button has-text-weight-bold borderrad1 is-link is-outlined mx-3  pinar'>

                                                    <Edit/></button>
                                            </Tooltip>


                                        </Form>


                                    )}


                                </Formik>
                                <button onClick={() => handleDelete(item.id)}
                                        className='button has-text-weight-bold borderrad1 is-danger is-outlined  pinar mt-2 mx-3    '
                                        style={{float: 'left'}}>

                                    <Delete/></button>

                            </td>



                        </tr>



                    </>
                )
            }))
        } else {
            content =
                <p className='my-3'>
                    چیزی برای نمایش وجود ندارد 🤷‍♀️

                </p>


        }

    } else {
        content = <div className='column is-12'>
            <Spinner/>
        </div>
    }

    return (
        <>

            <div className='columns is-variable is-3 mt-3 px-4 pb-3 is-multiline '>
                <div className='column is-12 welcome__master'>
                    <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                        تنظیمات خواننده ها
                    </h1>

                    <article className='subtitle yekan my-3 is-size-6'>
                        مشاهده و ویرایش تنظیمات خوانندگان مربوط به سایت در این قسمت صورت میگیرد.
                    </article>

                </div>

                <div className='column is-12 my-4 p-3 welcome__master'>
                    <h3 className='yekan'>
                        اضافه کردن مجری
                    </h3>

                    <Formik initialValues={{
                        q: '',


                    }} validationSchema={Yup.object().shape({

                        q: Yup.string().required('ضروری').max(20, 'باید کمتر از 20 کاراکتر باشد'),


                    })} onSubmit={(values, actions) => {
                        handleAdd(values);
                        actions.resetForm();
                    }}>
                        {({errors, touched}) => (
                            <Form className=''>


                                <label className='label mt-3 yekan' aria-hidden="true">عنوان گروه یا خواننده</label>
                                <Field className='yekan input my-2' type="text" id="q" name="q"/>
                                <ErrorMessage component='span' className='has-text-danger yekan mx-auto' name='q'/>


                                <div className='has-text-centered'>
                                    <button
                                        className='button clrone has-text-weight-bold width100  pinar mt-6 borderrad1 '
                                        type='submit'> اضافه کن
                                    </button>


                                </div>


                            </Form>


                        )}


                    </Formik>


                </div>


                <div className='column is-12 welcome__master p-5'>

                    <article className="message is-warning yekan lightborder borderrad1 mt-3">
                        <div className="message-header">
                            <p>راهنما</p>

                        </div>
                        <div className="message-body">
                            قبل از ایجاد کنسرتی باید خواننده آنرا ایجاد کرد.
                            در قسمت زیر خواننده های موجود قابل مشاهده و ویرایش میباشند.
                        </div>
                    </article>


                    <div className='my-2'>
                        <input className="input my-3" onChange={(e) => setSearch(e.target.value)} type="text"
                               placeholder="جستجو ..."/>
                    </div>

                    <table className='table width100'>
                        <thead className='clrtwo'>
                        <tr className=''>

                            <th className='has-text-centered has-text-white'> عنوان خواننده</th>


                        </tr>

                        </thead>

                        <tbody className='has-text-centered pinar'>
                        {
                            content
                        }


                        </tbody>
                    </table>

                </div>


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
export default Singers;