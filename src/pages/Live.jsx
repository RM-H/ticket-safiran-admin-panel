import {getVideosList,url} from "../services/service";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { Spinner, VideoListTable} from '../components'
import {AddBox, DeleteOutline, Edit, NavigateBefore, NavigateNext} from "@mui/icons-material";
import axios from "axios";


const Live = () => {
    const dataneeded = useSelector(userinfoSelector)

    const nav = useNavigate()
    const [search,setSearch] = useState('')

    const [data, setData] = useState(false)


    const getData =async (page)=>{
        const token = JSON.parse(localStorage.getItem('admin'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                take:10 , page:page , search:search
            }
        }


        const response = await getVideosList(config)
        if (response) {

            if (response.data.code===1) {

                setData(response.data)




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
            getData(1,token).then()
        } else {
            nav('/');
            toast.error('ابتدا وارد سیستم شو🤔')
        }



    }, []);




    const handleDelete = async (id)=>{
        const conf = window.confirm('آیا  مطمن هستید ؟')
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        if(conf) {
            const response = await axios.get(`${url}/admin/video/delete/${id}`,config)
            if ( response.data.code===1){
                toast.success('حذف شد.');
                getData().then()
            } else {
                toast.warning('اتصال خود را بررسی کنید.')
            }
        }

    }

    let content
    if(data!==false) {

        if (data.items.length>0) {
            content = <VideoListTable>
                {data.items.map((item)=>{
                    return(
                        <>
                            <tr className='has-text-centered yekan' key={item.videos.id}>


                                <td>{item.cities.name}</td>
                                <td>{item.singers.name}</td>
                                <td>{item.videos.price}</td>
                                <td>{item.videos.date_text}</td>

                                <td>{item.videos.live===0? 'زنده':'آرشیو'}</td>
                                <td>{item.videos.live===0 ? 'آرشیوی': item.videos.play===0 ? 'خاموش':'در حال پخش ' }</td>
                                <td>{item.videos.title}</td>
                                <td>

                                    <button className='button is-danger is-outlined mx-1'
                                            onClick={() => handleDelete(item.videos.id)}>
                                        <DeleteOutline/>
                                    </button>

                                    <button className='button is-link is-outlined mx-1'
                                            onClick={() => nav(`/admin/live/${item.videos.id}`)}>
                                        <Edit/>
                                    </button>
                                </td>
                            </tr>
                        </>

                    )
                })}
            </VideoListTable>
        } else {
            content = <p className='my-3'>
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
            <div className='columns is-multiline m-0 mt-3 welcome__master'>
                <div className='column is-12 p-4 welcome__master has-text-left'>
                    <p className='has-text-right'>
                        مشاهده ویرایش حذف یا اضافه کردن ویدیو آرشیوی یا لایو
                    </p>

                    <button className='button clrone borderrad1 p-5' onClick={() => nav('/admin/add-live')}>
                        <h2 className='pinar  has-text-weight-bold my-3 mx-3'>
                            اضافه کردن ویدیو جدید
                        </h2>
                        <AddBox/>
                    </button>

                    <article className="message is-warning yekan lightborder borderrad1 mt-3 has-text-right">
                        <div className="message-header">
                            <p>راهنما</p>

                        </div>
                        <div className="message-body">
                           ویدیو های سایت به دو شکل آرشیو و پخش زنده ذخیره میشوند.
                            ویدویو های پخش زنده نیز دارای دو حالت شروع پخش و پخش خاومش هستند که در حالت دوم در وبسایت عبارت -پخش هنوز شروع نشده است- نمایش داده خواهد شد.
                        </div>
                    </article>


                </div>


                <div className='column is-12 my-2 welcome__master'>
                    <input className="input" onChange={(e) => setSearch(e.target.value)} type="text"
                           placeholder="جستجو ..."/>
                </div>

                {
                    content
                }


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
export default Live;