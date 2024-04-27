import {useParams} from "react-router-dom";

import {Editor} from '@tinymce/tinymce-react';

import React, {useEffect, useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getSingleBlog, url, baseurl} from "../services/service";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import {Spinner} from "../components";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";


const SingleBlog = () => {
    const {blogID} = useParams()
    const dataneeded = useSelector(userinfoSelector)
    const [data, setdata] = useState(false)
    // edtor
    const [value, setValue] = useState('');
    const [image, setImg] = useState('')
    const [pending, setPending] = useState(false)


    const handleUpdate = async (values, value, img) => {

        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        const conf = window.confirm('آیا  مطمن هستید ؟')
        if (conf) {
            let endpoint = `${url}/admin/blog/edit/${blogID}`


            const formdata = new FormData()
            formdata.append("title", values.title)
            formdata.append("txt", value)
            formdata.append("img", img)
            setPending(true)
            toast.info('در حال بروز رسانی')
            const response = await axios.post(endpoint, formdata, config)


            if (response) {
                if (response.data.code === 1) {
                    toast.dismiss()
                    toast.success('با موفقیت بروز شد.');
                    setdata(false)

                    getData().then();
                    setPending(false)
                }
            } else {
                toast.error('اتصال خود را بررسی کنید')
            }


        }

    }

    const getData = async (page) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }


        const response = await getSingleBlog(config, blogID)


        if (response) {

            if (response.data.code === 1) {


                setdata(response.data)
                setValue(response.data.blog.txt)
                console.log(response.data.blog)

            } else {
                toast.error(response.data.error)
            }

        } else {
            toast.error('اتصال خود به شبکه را بررسی کرده و مجددا تلاش کنید.')
        }
    }

    useEffect(() => {

        getData().then()

    }, []);


    let content

    if (data !== false) {
        content = <div key={1} className='column is-12'>


            <div className='column is-12 welcome__master my-2 pb-4'>


                <div className='has-text-centered'>
                    <label className='label mt-3 yekan' aria-hidden="true"> تصویر کنونی </label>


                    <img src={`${baseurl}/${data.blog.img}`} className=' my-3' style={{maxWidth: '30rem'}} alt=""/>
                </div>


                <Formik initialValues={{
                    title: data.blog.title


                }} validationSchema={Yup.object().shape({

                    title: Yup.string().required('ضروری').max(2000, 'باید کمتر از 2000 کاراکتر باشد'),


                })} onSubmit={(values, actions) => {
                    handleUpdate(values, value, image);
                    actions.resetForm();
                }}>
                    {({errors, touched}) => (
                        <Form className=''>


                            <label className='label mt-3 yekan' aria-hidden="true">عنوان پست</label>
                            <Field className='yekan input my-4' type="text" id="title" name="title"/>
                            <ErrorMessage component='span' className='has-text-danger yekan mx-auto' name='title'/>


                            <ReactQuill  theme="snow" value={value} onChange={setValue}/>


                            <label className='label mt-3 yekan' aria-hidden="true"> عکس </label>
                            <input onChange={(e) => setImg(e.target.files[0])} className='yekan input'
                                   type='file' id="img"
                                   name="img"/>


                            <div className='has-text-centered py-6'>


                                {
                                    pending ? <Spinner/> : <button
                                        className='button clrone has-text-weight-bold  pinar mt-6 mx-3 borderrad1 '
                                        type='submit'> ویرایش
                                    </button>
                                }


                            </div>


                        </Form>


                    )}


                </Formik>


            </div>


        </div>
    } else {
        content = <div className='column is-12'>
            <Spinner/>
        </div>
    }


    return (
        <>

            <div className='columns is-variable is-3 mt-3 p-6  is-multiline welcome__master'
            >
                <div className='column is-12 '>
                    <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                        ویرایش بلاگ
                    </h1>


                </div>


                {content}


            </div>


        </>
    )
}
export default SingleBlog;