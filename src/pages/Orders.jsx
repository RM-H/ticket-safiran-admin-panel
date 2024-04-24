import {NavigateBefore, NavigateNext, Info, Add} from "@mui/icons-material";
import {getTicketordersList, getvideoOrdersList} from "../services/service";

import {toast} from "react-toastify";

import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Spinner, TicketsTable, VideoTable} from '../components'
import {ErrorMessage, Field, Form, Formik} from "formik";


const Orders = () => {

    const nav = useNavigate()
    const [data, setData] = useState(false)
    const [videodata, setvideodata] = useState(false)

    const [orderSearch,setOrderSearch] = useState('')
    const [videoSearch,setViedosearch] = useState('')


    const getTickets = async (page) => {
        const token = JSON.parse(localStorage.getItem('admin'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                take: 10, page: page , search:orderSearch
            }
        }


        const response = await getTicketordersList(config)
        if (response) {

            if (response.data.code === 1) {
                setData(response.data)


            } else {
                toast.error(response.data.error)
            }

        } else {
            toast.error('اتصال خود به شبکه را بررسی کرده و مجددا تلاش کنید.')
        }

    }
    const getVideos = async (page) => {
        const token = JSON.parse(localStorage.getItem('admin'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                take: 10, page: page , search: videoSearch
            }
        }


        const response = await getvideoOrdersList(config)

        if (response) {

            if (response.data.code === 1) {
                setvideodata(response.data)


            } else {
                toast.error(response.data.error)
            }

        } else {
            toast.error('اتصال خود به شبکه را بررسی کرده و مجددا تلاش کنید.')
        }

    }

    useEffect(() => {
        getTickets().then()
    }, [orderSearch]);

    useEffect(() => {
        getVideos().then()
    }, [videoSearch]);

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('admin'))

        if (token){

            getTickets().then()
            getVideos().then()
        } else {
            nav('/');
            toast.error('ابتدا وارد سیستم شو🤔')
        }




        // if (status !== 'done') {
        //     nav('/');
        //     toast.error('ابتدا وارد سیستم شو🤔')
        //
        //
        // } else {
        //     getTickets().then()
        //     getVideos().then()
        // }
    }, []);

    let tickets
    if (data !== false) {
        if (data.items.length>0){
            tickets = <TicketsTable>
                {data.items.map((item) => {
                    return (
                        <>
                            <tr className='has-text-centered yekan'>


                                <td>{new Date(item.orders.time * 1000).toLocaleDateString('fa-IR')}</td>
                                <td>{item.orders.name}</td>
                                <td>{item.concerts.title}</td>
                                <td>{item.cities.name}</td>
                                <td>{item.orders.amount}</td>
                                <td>{item.orders.refid}</td>
                                <td>
                                    <button
                                        className='button is-info is-outlined has-text-weight-bold  pinar  borderrad1 '
                                        onClick={() => nav(`/admin/orders/${item.orders.refid}`)}
                                    >
                                        <Info/>
                                    </button>

                                </td>

                            </tr>
                        </>

                    )
                })}
            </TicketsTable>
        } else {
            tickets = <p className='my-3'>
                چیزی برای نمایش وجود ندارد 🤷‍♀️

            </p>
        }


    } else {
        tickets = <div className='column is-12'>
            <Spinner/>
        </div>
    }


    let videos
    if (videodata !== false) {

        if (videodata.items.length>0){
            videos = <VideoTable>
                {videodata.items.map((item) => {
                    return (
                        <>
                            <tr className='has-text-centered yekan'>


                                <td>{new Date(item.video_sells.time * 1000).toLocaleDateString('fa-IR')}</td>
                                <td>{item.users.name}</td>
                                <td>{item.videos.title}</td>
                                <td>{item.cities.name}</td>
                                <td>{item.video_sells.amount}</td>
                                <td>{item.video_sells.refid}</td>


                            </tr>
                        </>

                    )
                })}
            </VideoTable>
        } else {
            videos = <p className='my-3'>
                چیزی برای نمایش وجود ندارد 🤷‍♀️

            </p>
        }


    } else {
        videos = <div className='column is-12'>
            <Spinner/>
        </div>
    }
    let Yup;
    return (


        <>

            <div className='columns mt-3 px-4 pb-3 is-multiline welcome__master' style={{maxHeight: "100%"}}>
                <div className='column is-12'>

                    <div className='is-flex is-flex-direction-column  p-3 '>

                        <Formik onSubmit={(values) => nav(`/admin/orders/${values.refid}`)} initialValues={{refid: ''}}
                        >
                            {({errors, touched}) => (
                                <Form className='width100 has-text-centered lightborder borderrad1 p-3'>

                                    <div className='mt-3  '>
                                        <label className="label yekan is-size-7 my-3  ">لطفا کد پیگیری را وارد
                                            کنید.</label>
                                        <Field className='yekan width100 has-text-centered ' id="refid" name="refid"
                                               placeholder=" 123456789" type='tel' style={{height: '3rem'}}
                                               autoComplete="off"/>
                                        <ErrorMessage component='span' className='has-text-danger yekan'
                                                      name='phone'/>


                                    </div>

                                    <button type='submit'

                                            className="button has-text-weight-bold borderrad1 clrone pinar my-3 width100"
                                            style={{outline: 'none'}}>

                                        پیگیری


                                    </button>


                                </Form>


                            )}


                        </Formik>

                        <article className="message is-warning yekan lightborder borderrad1 mt-3">
                            <div className="message-header">
                                <p>توجه</p>

                            </div>
                            <div className="message-body">
                               خرید های ویدیویی از طریق کد رهگیری قابل پیگیری نیستند.
                            </div>
                        </article>


                    </div>


                </div>

                <div className='column is-6 lightborder borderrad1'>
                    <div className='columns is-multiline m-0'>
                        <div className='column is-12 my-2'>
                            <input className="input" onChange={(e) => setOrderSearch(e.target.value)} type="text"
                                   placeholder="جستجو ..."/>
                        </div>


                        {
                            tickets
                        }


                        <div className='column is-12'>
                            {data &&
                                <div className='pinar' style={{display: 'flex', justifyContent: 'center'}}>


                                    {/*before page with tick*/}
                                    {
                                        data.paginator.beforePage < data.paginator.currentPage && (

                                            <button onClick={() => getTickets(data.paginator.beforePage)}
                                                    className='button'>
                                                <NavigateNext/>
                                            </button>
                                        )


                                    }


                                    {/*map beforePages*/}
                                    {data.paginator.beforePages.length > 0 &&

                                        <>
                                            {data.paginator.beforePages.map((item, index) =>
                                                <button className='button' onClick={() => getTickets(item)} key={index}>
                                                    {item}
                                                </button>
                                            )}
                                        </>

                                    }


                                    {/*active*/}

                                    {
                                        data.paginator.total > 0 &&
                                        <button
                                            className='clrtwo has-text-white button'>{data.paginator.currentPage}</button>


                                    }


                                    {/*map nextPages*/}
                                    {data.paginator.nextPages.length > 0 &&
                                        <>
                                            {data.paginator.nextPages.map((item, index) =>
                                                <button className='button' onClick={() => getTickets(item)} key={index}>
                                                    {item}
                                                </button>
                                            )}
                                        </>

                                    }


                                    {/*next page with tick*/}
                                    {

                                        data.paginator.nextPage > data.paginator.currentPage && (

                                            <button onClick={() => getTickets(data.paginator.nextPage)}
                                                    className='button is-transparent'>
                                                <NavigateBefore/>
                                            </button>
                                        )


                                    }


                                </div>
                            }
                        </div>


                    </div>
                </div>


                <div className='column is-6 lightborder borderrad1'>
                    <div className='columns is-multiline m-0'>
                        <div className='column is-12 my-2'>
                            <input className="input" onChange={(e) => setViedosearch(e.target.value)} type="text"
                                   placeholder="جستجو ..."/>
                        </div>


                        {
                            videos
                        }


                        <div className='column is-12'>
                            {data &&
                                <div className='pinar' style={{display: 'flex', justifyContent: 'center'}}>


                                    {/*before page with tick*/}
                                    {
                                        data.paginator.beforePage < data.paginator.currentPage && (

                                            <button onClick={() => getvideoOrdersList(data.paginator.beforePage)}
                                                    className='button'>
                                                <NavigateNext/>
                                            </button>
                                        )


                                    }


                                    {/*map beforePages*/}
                                    {data.paginator.beforePages.length > 0 &&

                                        <>
                                            {data.paginator.beforePages.map((item, index) =>
                                                <button className='button' onClick={() => getVideos(item)} key={index}>
                                                    {item}
                                                </button>
                                            )}
                                        </>

                                    }


                                    {/*active*/}

                                    {
                                        data.paginator.total > 0 &&
                                        <button
                                            className='clrtwo has-text-white button'>{data.paginator.currentPage}</button>


                                    }


                                    {/*map nextPages*/}
                                    {data.paginator.nextPages.length > 0 &&
                                        <>
                                            {data.paginator.nextPages.map((item, index) =>
                                                <button className='button' onClick={() => getVideos(item)} key={index}>
                                                    {item}
                                                </button>
                                            )}
                                        </>

                                    }


                                    {/*next page with tick*/}
                                    {

                                        data.paginator.nextPage > data.paginator.currentPage && (

                                            <button onClick={() => getVideos(data.paginator.nextPage)}
                                                    className='button is-transparent'>
                                                <NavigateBefore/>
                                            </button>
                                        )


                                    }


                                </div>
                            }
                        </div>


                    </div>
                </div>


            </div>

        </>
    )
}
export default Orders;