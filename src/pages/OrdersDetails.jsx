import {useParams,Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {CircularProgress} from "@mui/material";
import {
    CalendarMonthOutlined,
    EventSeatOutlined,
    FmdGoodOutlined,
    InsertInvitationOutlined,
    LocalAtmOutlined, PersonOutline,
    ScheduleOutlined
} from "@mui/icons-material";
import {NumericFormat} from "react-number-format";
import {url} from '../services/service'
import axios from "axios";
import {InquirySeatCard,Inquirysvg} from '../components'


const OrdersDetails = () => {

    const {ref} =useParams()

    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleinquiry = async (d) => {
        let form = new FormData()
        form.append('refid', d)

        const endpoint = `${url}/pursue`
        setLoading(true)
        const response = await axios.post(endpoint, form)
        if (response.data.code === 1) {

            setData(response.data)
            setLoading(false)
        } else {
            setLoading(false)
            setData(false)
            alert(`${response.data.error} 🤔`)
        }

    }



    useEffect(() => {
        handleinquiry(ref)
    }, []);



    let content


    if (loading) {
        content =
            <div className='has-text-centered cardboxborder p-3'>
                <CircularProgress/>
            </div>

    } else {
        if (data) {
            content =
                <>
                    <div className='columns p-3 m-0 is-multiline cardboxborder '>
                        <div className='column is-12 p-3 has-text-centered'>
                            <h2 className='pinar is-size-4-desktop has-text-weight-bold'>
                                {
                                    data.concerts.title
                                }
                            </h2>

                        </div>


                        <div className='column is-12'>

                            <div className='columns m-0'>


                                <div className='is-2 is-flex is-flex-direction-column is-justify-content-center'>

                                    <div className='columns m-0 is-multiline'>



                                        <div className='column is-12'>
                                            {
                                                data.reserves.map((item) => (
                                                    <InquirySeatCard key={item.id} seatNumber={item.id}
                                                                     seatPrice={item.price}/>


                                                ))


                                            }


                                        </div>


                                    </div>


                                </div>


                                <div className='column is-10'>

                                    <div className='columns m-0 is-multiline'>

                                        {/*row1*/}
                                        <div className='column is-3-desktop yekan'>
                                            <InsertInvitationOutlined/>

                                            <p>


                                                تاریخ :
                                                {
                                                    data.concerts.date_text
                                                }
                                            </p>

                                        </div>
                                        <div className='column is-3-desktop yekan'>
                                            <FmdGoodOutlined/>
                                            <p>

                                                سالن :
                                                {
                                                    data.locations.name
                                                }
                                            </p>

                                        </div>
                                        <div className='column is-3-desktop yekan'>
                                            <EventSeatOutlined/>
                                            <p>

                                                تعداد صندلی خریداری شده :
                                                {
                                                    data.orders.count
                                                }
                                            </p>

                                        </div>
                                        <div className='column is-3-desktop yekan'>
                                            <LocalAtmOutlined/>
                                            <p>
                                                مبلغ کل پرداختی :

                                                <NumericFormat className='mx-1' displayType='text' thousandSeparator=','
                                                               value={data.orders.amount}/>

                                                تومان
                                            </p>

                                        </div>


                                        {/*row 2*/}
                                        <div className='column is-3-desktop yekan'>
                                            <ScheduleOutlined/>
                                            <p>

                                                ساعت :
                                                {
                                                    new Date(data.sans_id.time_stamp).getHours()
                                                }


                                            </p>

                                        </div>
                                        <div className='column is-3-desktop yekan'>
                                            <PersonOutline/>
                                            <p>

                                                خریداری شده به نام :
                                                {
                                                    data.orders.name
                                                }


                                            </p>

                                        </div>
                                        <div className='column is-3-desktop yekan'>
                                            <CalendarMonthOutlined/>
                                            <p>

                                                تاریخ :
                                                {
                                                    new Date(data.orders.time).toLocaleDateString('fa-IR')

                                                }


                                            </p>

                                        </div>

                                        <div className='column is-3-desktop yekan'>

                                            <Link to={`/print/${data.orders.refid}`} target='_blank'>
                                                <button
                                                    className='button yekan borderrad1 clrone has-text-weight-bold wdith100'>
                                                    چاپ رسید
                                                </button>

                                            </Link>


                                        </div>


                                        {/*row 3*/}
                                        <div className='column is-12 lightborder borderrad1'>
                                            {
                                                <Inquirysvg reservations={data.reserves} svg={data.locations.svg}/>
                                            }


                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>


                    </div>


                </>


        }


    }


    return (


        <>
            <div className='columns mt-3 px-4 pb-3 is-multiline welcome__master'>
                {
                    content
                }


            </div>


        </>
    )
}
export default OrdersDetails;