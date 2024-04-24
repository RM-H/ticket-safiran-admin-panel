import {UserBanner, Snippet, Table, Spinner} from '../components'
import {useSelector} from "react-redux";
import {dashboardSelector} from "../slices/UserSlice";

import React from "react";


const Landing = () => {


    const dataneeded = useSelector(dashboardSelector)
    let snippets
    if (dataneeded.length !== 0) {

        snippets =
            <>


                <Snippet title='تعداد کل سفارشات' statistic={dataneeded.orders_count}
                         description='کل سفارشات انجام شده تا امروز (اعم از تئاتر، کنسرت, همایش و ویدیو)'/>
                <Snippet title='تعداد کنسرت های برگزار شده ' statistic={dataneeded.concerts_count}
                         description='کنسرت های برگزار شده توسط مجموعه'/>
                <Snippet title='مبلغ کل سفارشات ' statistic={dataneeded.orders_amount}
                         description='مبلغ کل فروش انجام شده توسط مجمعه از تمام فعالیت ها و رویداد های صورت گرفته.'/>
                <Snippet title=' کل فروش ویدیو  ' statistic={dataneeded.videos_amount}
                         description='مبلغ کل ویدیو های فروخته شده.'/>

            </>
    } else {
        snippets=
            <div className='column is-12 has-text-centered'>
                <Spinner/>
            </div>

    }


    let tables
    if (dataneeded.length !== 0) {
        tables=<>
            <Table title='آخرین سفارشات' data={dataneeded.last_orders.map((item)=>{
                return(
                    <tr className='yekan'>
                        <td>
                            {new Date(item.orders.time*1000).toLocaleDateString('fa-IR')}
                        </td>

                        <td>
                            {item.orders.name}
                        </td>
                        <td>
                            {item.orders.amount}
                        </td>
                        <td>
                            {item.concerts.title}
                        </td>

                        <td>
                            {item.cities.name}
                        </td>
                        <td>
                            {item.locations_view.name}
                        </td>

                    </tr>
                )
            })} />

            <Table title='آخرین سفارشات ویدیویی' data={dataneeded.last_videos.map((item)=>{
                return(
                    <tr className='yekan'>
                        <td>
                            {new Date(item.video_sells.time*1000).toLocaleDateString('fa-IR')}
                        </td>

                        <td>
                            {item.users.name}
                        </td>
                        <td>
                            {item.video_sells.amount}
                        </td>
                        <td>
                            {item.videos.title}
                        </td>

                        <td>
                            {item.cities.name}
                        </td>
                        <td>
                            {item.videos.location_name}
                        </td>

                    </tr>
                )
            })} />


        </>
    } else {
        tables= <div className='column is-12 has-text-centered'>
            <Spinner/>
        </div>
    }


    return (
        <>
            <div className='columns m-0 is-multiline' >


            <UserBanner/>
            <div className='columns m-0 is-multiline m-0 mt-3'>
                {
                    snippets
                }
            </div>
                <div className='column  is-12 p-0'>

                    <div className='columns m-0 is-multiline  '>

                        {
                            tables
                        }


                    </div>

                </div>


            </div>

        </>
    )
}
export default Landing;