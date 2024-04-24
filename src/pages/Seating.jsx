import {Svgbox, Pricebox} from '../components'
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import React, {useEffect, useState} from "react";
import {getSingleSans} from "../services/service";
import {toast} from "react-toastify";

const Seating = () => {
    const {sans, id} = useParams()

    const nav = useNavigate()
    const status = useSelector((state) => state.userinfo.status)
    const dataneeded = useSelector(userinfoSelector)
    const [data, setdata] = useState(false)


    // ids of selected seats
    let [itemsselected, setItems] = useState([]);

    // list of seats that have price
    let [havePriceList, setHavePriceList] = useState([]);


    // storing ids and prices here
    let [price, setPrice] = useState([]);


    // const [date, setDate] = useState(false)
    const getData = async (page) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }


        const response = await getSingleSans(config, sans)
        if (response) {

            if (response.data.code === 1) {


                console.log(response.data)
                setdata(response.data)
                setHavePriceList(response.data.data)


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


        }
    }, []);


    let svg
    if (data !== false) {
        svg = <Svgbox havePriceList={havePriceList} setHavePrice={setHavePriceList} itemsselected={itemsselected}
                      setItems={setItems} map={data.locations.svg}/>
    }


    return (
        <>
            <div className='columns mt-3 px-4 pb-3 is-multiline '>

                <div className='column is-12 p-4 welcome__master '>
                    <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                        قیمت گذاری صندلی های سالن
                    </h1>
                    <p className='yekan is-size-6 has-text-weight-bold has-text-centered my-3'>
                        {
                            data !== false && (data.concerts.title)
                        }
                        {
                            '    '
                        }

                        {
                            data !== false && (data.sans.date_text)
                        }
                        {
                            '    '
                        }
                        ساعت
                        {
                            '    '
                        }
                        {
                            data !== false && (new Date(data.sans.time_stamp * 1000).toLocaleTimeString('fa-IR'))
                        }
                        {
                            '    '
                        }
                        ظرفیت سالن
                        {
                            '    '
                        }
                        {
                            data !== false && (data.locations.count)
                        }


                    </p>

                    <article className="message is-warning yekan lightborder borderrad1 mt-3">
                        <div className="message-header">
                            <p>فرایند قیمت گزاری برای هر صندلی</p>

                        </div>
                        <div className="message-body">
                            مجموعه از صندلی ها یا تک صندلی را انتخاب کرده و قیمت را وارد کرده و از گزینه اضافه به لیست
                            موقت استفاده کنید. پس از قیمت گزاری برای تمامی صندلی ها از ثبت نهایی استفاده کنید.
                        </div>
                    </article>


                </div>

                {/*salon map*/}

                {
                    svg
                }


                <div className='column is-12 welcome__master my-3'>
                    <div className='columns m-0'>

                        <div className='column is-4 is-flex is-flex-direction-column is-align-items-center is-justify-content-center'>
                            {
                                data !== false && (
                                    <>

                                        <p className={havePriceList.length > data.locations.count ? 'has-text-danger' : havePriceList.length < data.locations.count && 'has-text-warning'}>
                                            صندلی های نتخاب شده :
                                            <span>
                        {havePriceList.length}
                    </span>
                                        </p>


                                        <p>
                                            ظرفیت سالن
                                            <span>
                    {data.locations.count}
                </span>
                                        </p>
                                    </>)
                            }

                        </div>
                        <div className='column is-8'>
                            <article className="message is-warning yekan lightborder borderrad1 mt-3">
                                <div className="message-header">
                                    <p>!</p>

                                </div>
                                <div className="message-body">
                                    تعداد صندلی های دارای قیمت باید با ظرفیت سالن برابر باشد !
                                    با تعیین قیمت 0 به صورت غیر قابل خرید نمایش داده خواهد شد.
                                </div>
                            </article>

                        </div>

                    </div>


                </div>


                {/*cards*/
                }

                <Pricebox itemSelected={itemsselected} setHavePrice={setHavePriceList} haveprice={havePriceList}
                          setItems={setItems}/>


            </div>


        </>
    )
}
export default Seating;