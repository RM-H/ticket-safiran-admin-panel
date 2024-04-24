


import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {url} from "../services/service";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import {NumericFormat} from "react-number-format";


const Print = () => {

    const {ref} = useParams()


    const [data, setData] = useState(false)

    const handleinquiry = async (d) => {
        let form = new FormData()
        form.append('refid', d)

        const endpoint = `${url}/pursue`

        const response = await axios.post(endpoint, form)
        if (response.data.code === 1) {

            console.log(response.data)
            setData(response.data)
            setTimeout(() => {
                document.title=`رسید بلیطیم-${response.data.orders.refid}`
                window.print()
                setData(false)
            }, 200)


        } else {

            alert(`${response.data.error} 🤔`)
        }

    }
    useEffect(() => {

        handleinquiry(ref)

    }, []);


    let content

    if (data !== false) {

        content =
            <>

                <div className='column is-12 '>
                    <h2 className='has-text-weight-bold'>
                        {data.concerts.title}
                    </h2>

                    <p className='my-3'>
                        خریداری شده توسط :
                        {
                            data.orders.name
                        }


                        <span className='ml-3' style={{float: 'left'}}>
                            تاریخ خرید :
                            {
                                new Date(data.orders.time*1000).toLocaleDateString('fa-IR')

                            }
                        </span>
                    </p>


                </div>

                <div className='column is-12'>
                    <table className="table is-bordered mx-auto wdith100 " style={{textAlign: 'center'}}>

                        <thead>
                        <tr>
                            <th className='has-text-right'>اطلاعات رویداد</th>
                        </tr>
                        <tr>
                            <th className='has-text-right'>تاریخ</th>
                            <th className='has-text-right'>سالن</th>
                            <th className='has-text-right'>تعداد صندلی</th>
                            <th className='has-text-right'>کل مبلغ پرداختی</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{data.concerts.date_text}</td>
                            <td>{data.locations.name}</td>
                            <td>{data.orders.count}</td>
                            <td><NumericFormat className='mx-1' displayType='text' thousandSeparator=','
                                               value={data.orders.amount}/></td>
                        </tr>
                        </tbody>
                    </table>

                </div>


                <div className='column is-12'>

                    <table className="table is-bordered mx-auto wdith100 " style={{textAlign: 'center'}}>
                        <thead>
                        <tr>
                            <th className='has-text-right'>صندلی های خریداری شده</th>
                        </tr>
                        <tr>
                            <th className='has-text-right'>شماره صندلی</th>
                            <th className='has-text-right'>قیمت</th>

                        </tr>
                        </thead>
                        <tbody>


                        {
                            data.reserves.map((item,index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.id}</td>

                                            <td><NumericFormat className='mx-1' displayType='text' thousandSeparator=','
                                                               value={item.price}/></td>


                                        </tr>

                                    </>


                                )
                            })
                        }


                        </tbody>
                    </table>
                </div>

                <div className='column is-12'>

                    <table className="table is-bordered mx-auto wdith100 " style={{textAlign: 'center'}}>
                        <thead>
                        <tr>
                            <th className='has-text-right'>کد رهگیری</th>
                        </tr>

                        </thead>
                        <tbody>


                        <tr>
                            <td>{data.orders.refid}</td>


                        </tr>


                        </tbody>
                    </table>
                </div>

            </>

    } else {
        content = <CircularProgress/>
    }


    return (
        <>

            <div className='columns flex-JCS-ACS yekan is-multiline p-4'>
                {
                    content
                }

            </div>


        </>
    )
}
export default Print;