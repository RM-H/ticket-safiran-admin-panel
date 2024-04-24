import {EventsTable, Spinner} from '../components'
import React, {useEffect, useState} from "react";
import {getCities, getEvents, getSingers, url} from "../services/service";
import { userinfoSelector} from "../slices/UserSlice";
import {toast} from "react-toastify";
import { useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {DeleteOutline, Edit, NavigateBefore, NavigateNext , AddBox,Schedule} from "@mui/icons-material";
import axios from "axios";


const Events = () => {

    const dataneeded = useSelector(userinfoSelector)

    const nav = useNavigate()

    const [data, setData] = useState(false)
    const [cityData, setCities] = useState(false)

    const [singersList, setSingers] = useState(false)


// filtering search
    const [search,setSearch] = useState('')
    const [selectedCity,setCity] = useState('')
    const [selectedSinger,setSinger] = useState('')
    const [selectedType,setType] = useState('')

    const getData =async (page)=>{
        const token = JSON.parse(localStorage.getItem('admin'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                take:10 , page:page , search:search ,city_id:selectedCity , singer_id:selectedSinger , type:selectedType
            }
        }


        const response = await getEvents(config)
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
    const cities = async (page) => {
        const token = JSON.parse(localStorage.getItem('admin'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
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
        const token = JSON.parse(localStorage.getItem('admin'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
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
        getData().then()
    }, [search,selectedCity,selectedSinger,selectedType]);




    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('admin'))

        if (token){
            getData().then();
            cities().then();
            singers().then();
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
        //     getData().then()
        // }
    }, []);



    const handleDelete = async (id)=>{
        const conf = window.confirm('آیا  مطمن هستید ؟')
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        if(conf) {
            const response = await axios.get(`${url}/admin/concert/delete/${id}`,config)

            if (response){
                if (response.data.code===1){
                    toast.success('حذف شد.');
                    getData().then()
                } else {
                    toast.warning(response.data.error)
                }
            }else {
                toast.warning('اتصال خود را بررسی کنید.')
            }

        }

    }


    let content
    if(data!==false) {


        if (data.items.length>0){
            content = <EventsTable>
                {data.items.map((item)=>{
                    return(
                        <>
                            <tr key={item.concerts.id} className='has-text-centered yekan'>


                                <td>{item.concerts.date_text}</td>
                                <td>{item.concerts.type === 1 ? 'کنسرت' : item.concerts.type === 2 ? 'تئاتر' : 'همایش'}</td>
                                <td>{item.concerts.active === 1 ? 'فعال' : item.concerts.active === 2 ? 'درانتظار برگزاری' : 'برکزار شده'}</td>
                                <td>{item.singers.name}</td>
                                <td>{item.concerts.title}</td>
                                <td>{item.cities.name}</td>
                                <td>

                                    <button className='button is-danger is-outlined mx-1'
                                            onClick={() => handleDelete(item.concerts.id)}>
                                        <DeleteOutline/>
                                    </button>

                                    <button className='button is-link is-outlined mx-1'
                                            onClick={() => nav(`/admin/events/${item.concerts.id}`)}>
                                        <Edit/>
                                    </button>
                                    <button className='button pinar is-dark is-outlined mx-1'
                                            onClick={() => nav(`/admin/events/${item.concerts.id}/sans`)}>
                                        <Schedule className='ml-2'/>
                                        سانس ها
                                    </button>

                                </td>
                            </tr>
                        </>

                    )
                })}
            </EventsTable>
        } else {
            content =
                <div className='column is-12 welcome__master'>
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

    let citiesList
    if (cityData!==false){
        citiesList = cityData.items.map((item)=>(
            <option key={item.id} value={item.id}>{item.name}</option>
        ))

    }

    let Singers
    if (singersList!==false){
        Singers = singersList.items.map((item)=>(
            <option key={item.id} value={item.id}>{item.name}</option>
        ))

    }


    return (
        <>

            <div className='columns mt-3 px-4 pb-3 is-multiline ' style={{maxHeight: "100%"}}>

                <div className='column is-12 p-4 welcome__master has-text-left'>
                    <p className='has-text-right'>
                        مشاهده ُ ویرایش ُ حذف و اضافه کردن کنسرت ُ همایش یا تئاتر
                    </p>

                    <button className='button clrone borderrad1 p-5' onClick={() => nav('/admin/add-event')}>
                        <h2 className='pinar  has-text-weight-bold my-3 mx-3'>
                            اضافه کردن رویداد جدید
                        </h2>
                        <AddBox/>
                    </button>

                    <article className="message is-warning yekan lightborder borderrad1 mt-3 has-text-right">
                        <div className="message-header">
                            <p>فرایند ایجاد رویداد</p>

                        </div>
                        <div className="message-body">
                            اضافه کردن رویداد جدید>سانس ها > ایجاد سانس> قیمت گذاری هر سانس
                        </div>
                    </article>

                </div>
                <div className='column is-12 my-2 welcome__master'>
                    <input className="input" onChange={(e) => setSearch(e.target.value)} type="text"
                           placeholder="جستجو ..."/>


                    <div className='has-text-left my-3'>

                        <div className='select '>


                            <select className='pinar' onChange={(e) => setType(e.target.value)}>
                                <option value=""> همه رویداد ها</option>
                                <option value={1}   > کنسرت ها  </option>
                                <option value={2}    > تاتر ها</option>
                                <option value={3}> همایش ها</option>


                            </select>
                        </div>

                        <div className='select mr-3'>


                            <select className='pinar' onChange={(e) => setCity(e.target.value)}>
                                <option value=""> همه شهر ها</option>
                                {citiesList}

                            </select>
                        </div>

                        <div className='select mr-3 ' onChange={(e) => setSinger(e.target.value)}>

                            <select className='pinar'>
                                <option value="">همه خوانندگان</option>
                                {Singers}

                            </select>
                        </div>
                    </div>


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
export default Events;