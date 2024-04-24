import {DeleteOutline, Edit, NavigateBefore, NavigateNext, Add,AttachMoney} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import {useNavigate, useParams} from "react-router-dom";
import {getSalone, getSans, url} from "../services/service";
import {toast} from "react-toastify";
import {Sanstable, Spinner} from '../components'
import axios from "axios";
import {Field, Form, Formik} from "formik";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";


const Sans = () => {

    const {id} = useParams()
    const dataneeded = useSelector(userinfoSelector)
    const status = useSelector((state) => state.userinfo.status)
    const nav = useNavigate()

    const [data, setData] = useState(false)
    const [SalonesList, setSalones] = useState(false)
    const [date, setDate] = useState(new Date().toLocaleDateString('fa-IR'))

    const getData = async (page) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            },
            params: {
                take: 10, page: page, concert_id: id
            }
        }


        const response = await getSans(config)
        if (response) {

            if (response.data.code === 1) {

                setData(response.data)
                console.log(response.data)


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
            salones().then()

        }
    }, []);


    const handleDelete = async (sansid) => {
        const conf = window.confirm('آیا  مطمن هستید ؟')
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        if (conf) {
            const response = await axios.get(`${url}/admin/sans/delete/${sansid}`, config)

            if (response) {
                if (response.data.code === 1) {
                    toast.success('حذف شد.');
                    getData().then()
                } else {
                    toast.warning(response.data.error)
                }
            } else {
                toast.warning('اتصال خود را بررسی کنید.')
            }

        }

    }


    const handleAdd = async (val, date) => {
        const formdata = new FormData()
        formdata.append("clock", val.clock)
        formdata.append("date", date)
        formdata.append("concert_id", id)
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`,
                'Content-Type': 'multipart/form-data'
            }
        }

        const response = await axios.post(`${url}/admin/sans/add`, formdata, config)

        if (response) {
            if (response.data.code === 1) {
                toast.success('اضافه شد')
                getData().then()
            } else {
                toast.warning(response.data.error)
            }
        } else {
            toast.warning('اتصال خود را بررسی کنید')
        }
    }


    let content
    if (data !== false && SalonesList !== false) {

        if (data.items.length > 0) {
            content =


                <Sanstable>
                    {data.items.map((item) => {
                        return (
                            <>
                                <tr className='has-text-centered yekan'>


                                    <td>{item.sans.date_text}</td>
                                    <td>{new Date(item.sans.time_stamp * 1000).toLocaleTimeString('fa-IR')}</td>

                                    <td>{SalonesList.items.map((sa) =>
                                            sa.locations_view.id == item.sans.location_id && (
                                                sa.locations_view.name
                                            )
                                    )}</td>

                                    <td>
                                        <button className='button is-danger is-outlined mx-1'
                                                onClick={() => handleDelete(item.sans.id)}>
                                            <DeleteOutline/>
                                        </button>

                                        <button className='button is-link is-outlined mx-1'
                                                onClick={() => nav(`/admin/events/${id}/sans/edit/${item.sans.id}`)}>
                                            <Edit/>

                                        </button>

                                        <button className='button is-success is-outlined mx-1'
                                                onClick={() => nav(`/admin/events/${id}/sans/pricing/${item.sans.id}`)}>
                                            <AttachMoney/>
                                        </button>
                                    </td>
                                </tr>
                            </>

                        )
                    })}
                </Sanstable>
        } else {
            content = <Sanstable>
                <tr className='has-text-centered yekan'>
                    <td>
                    موردی جهت نمایش وجود ندارد.
                    </td>
                </tr>

            </Sanstable>
        }


    } else {
        content = <div className='column is-12'>
            <Spinner/>
        </div>
    }
    return (
        <>
            <div className='columns mt-3 px-4 pb-3 is-multiline ' style={{maxHeight: "100%"}}>

                <div className='column is-12 p-4 welcome__master '>
                    <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                        مشاهده ویرایش حذف و اضافه کردن سانس


                    </h1>
                    <h2 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                        {
                            data !== false && data.items.length > 0 && (data.items[0].concerts.title)
                        }

                    </h2>


                    <Formik initialValues={{
                        clock: `${new Date().getHours()}:${new Date().getMinutes()}`,


                    }} onSubmit={(values) => handleAdd(values, date)}>
                        {({errors, touched}) => (
                            <Form>


                                <label className='label mt-3 yekan' aria-hidden="true"> ساعت شروع سانس </label>
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


                                <button
                                    className='button is-success is-outlined has-text-weight-bold  pinar mt-6 width100 borderrad1 '
                                    type='submit'>ایجاد سانس
                                    <Add/>
                                </button>


                            </Form>


                        )}


                    </Formik>


                    <article className="message is-info yekan lightborder borderrad1 mt-3">
                        <div className="message-header">
                            <p>فرایند قیمت گزاری برای هر سانس</p>

                        </div>
                        <div className="message-body">
                            سانس را ایجاد کرده و از منوی عملیات گزینه قیمت گذاری را انتخاب کنید.
                        </div>
                    </article>


                </div>


                {
                    content
                }

                {/*pagination*/}
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
export default Sans;