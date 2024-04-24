import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

import {Add, Done,Edit,Delete} from "@mui/icons-material";
import React, {useState,useEffect} from "react";
import axios from "axios";
import {url} from '../../services/service'
import {useSelector} from "react-redux";
import {userinfoSelector} from "../../slices/UserSlice";
import {useParams} from 'react-router-dom'
import {toast} from "react-toastify";

const Pricebox = ({itemSelected, setHavePrice,haveprice,setItems}) => {

    const dataneeded = useSelector(userinfoSelector)
    const {sans} = useParams()


    useEffect(() => {
        if (haveprice.length>0){
            haveprice.map((item)=>
                document.getElementById(item.id).style.fill='#ffd500'

            )
        }


    }, [haveprice]);


    let selected
    if (itemSelected.length > 0) {
        selected = itemSelected.map((i) => (
            <span className="tag is-light is-large mx-1 lightborder">{i}</span>
        ))
    }

    const handleUpdate = (val) => {
        const target = haveprice.find((item)=>(
            item.id==val.id
        ))
        if (target){
            target.price=val.price
            toast.success('بروز شد')
        }




    }


    const handleDelete = (id)=>{
        const target = haveprice.filter((item)=>(
            item.id!==id
        ))
        if (target){
            setHavePrice(target)
            document.getElementById(id).style.fill='#c6c9df'
            toast.success('از لیست موقت حذف شد')
        }

    }


    const [pricinginfo, setPricinginfo] = useState('')
    const HandleAdd = (val, idlist) => {

        const newdata = idlist.map((id)=>{
            return {
                id:id ,
                price:val.price
            }
        })
        setHavePrice(
            (prev)=>prev.length>0 ? [...prev,...newdata]:newdata


        )
        toast.info('به لیست موقت اضافه شد.')
        setItems([])


    }


    // showing seats and ids in a table
    let tabledata
    if (haveprice.length>0){
        tabledata = haveprice.map((item)=>(
            <tr key={item.id}>
                <td>
                    {item.id}
                </td>
                <td>
                    {/*form*/}

                    <Formik initialValues={{


                        // clock: `${new Date(data.sans.time_stamp * 1000).getHours()}:${new Date(data.sans.time_stamp * 1000).getMinutes()}`,
                        price: item.price,
                        id: item.id


                    }} validationSchema={Yup.object().shape({

                        price: Yup.string().required('عنوان ضروری است.')


                    })} onSubmit={(values) => {
                        handleUpdate(values);

                    }}>
                        {({errors, touched}) => (
                            <Form className='is-flex is-flex-direction-row'>


                                <Field className='yekan input' type='number' id="price" name="price"/>


                                <button type='submit'
                                        className='button has-text-weight-bold borderrad1 is-dark is-outlined mx-3  pinar'>

                                    <Edit/></button>


                            </Form>


                        )}


                    </Formik>
                    <button onClick={() => handleDelete(item.id)}
                            className='button has-text-weight-bold borderrad1 is-danger is-outlined  pinar my-2 mx-3    ' style={{float:'left'}}>

                        <Delete/></button>

                </td>

            </tr>
        ))
    }


    const sendtoServer = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`,
                'Content-Type': 'multipart/form-data'

            }
        }

        const formdata = new FormData()
        formdata.append('data', JSON.stringify(haveprice))

        const response = await axios.post(`${url}/admin/sans/addprice/${sans}`, formdata, config)

        if (response) {
            if (response.data.code === 1) {
                toast.success('قیمت اضافه شد')
            } else {
                toast.warning(response.data.error)
            }
        }
    }
    return (
        <>
            <div className='column is-12 lightborder welcome__master mt-3'>
                <div className='columns is-multiline m-0'>
                    <div className='column is-4'>
                        {selected}


                    </div>

                    <div className='column is-8'>

                        {/*form*/}

                        <Formik initialValues={{


                            // clock: `${new Date(data.sans.time_stamp * 1000).getHours()}:${new Date(data.sans.time_stamp * 1000).getMinutes()}`,
                            price: ''


                        }} validationSchema={Yup.object().shape({

                            price: Yup.string().required('عنوان ضروری است.')


                        })} onSubmit={(values,{resetForm}) => {
                            HandleAdd(values, itemSelected);
                            resetForm()
                        } }>
                            {({errors, touched}) => (
                                <Form className=''>


                                    <label className='label mt-3 yekan' aria-hidden="true"> قیمت صندلی های انتخاب
                                        شده</label>

                                    <Field className='yekan input' type='number' id="price" name="price"/>


                                    <button type='submit'
                                            className='button has-text-weight-bold borderrad1 is-success is-outlined  pinar  width100 my-3  '>
                                        اضافه به لیست موقت
                                        <Done/></button>


                                </Form>


                            )}


                        </Formik>
                        <button onClick={() => console.log(haveprice)}>
                            test info
                        </button>

                    </div>


                    {/*table*/}
                    <div className='column is-12 my-3'>
                        <button className='button pinar is-success width100 my-4' onClick={()=>sendtoServer()}>
                            <Add/>
                            ثبت نهایی
                        </button>

                        <table className='table width100'>
                            <thead className='clrtwo'>
                            <tr className=''>

                                <th className='has-text-centered has-text-white'>صندلی ها</th>
                                <th className='has-text-centered has-text-white'>قیمت</th>


                            </tr>

                            </thead>

                            <tbody className='has-text-centered pinar'>
                            {
                                tabledata
                            }


                            </tbody>
                        </table>

                    </div>


                </div>

            </div>

        </>
    )
}
export default Pricebox;