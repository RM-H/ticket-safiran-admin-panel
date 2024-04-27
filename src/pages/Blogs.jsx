import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {DeleteOutline, Edit, NavigateBefore, NavigateNext, Schedule} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {getBlogs, url} from "../services/service";
import axios from "axios";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {environmentSelector, userinfoSelector} from "../slices/UserSlice";
import {useNavigate} from "react-router-dom";
import {Spinner, BlogsTable} from "../components";
import ReactQuill from "react-quill";


const Blogs = () => {

    const dataneeded = useSelector(userinfoSelector)
    const status = useSelector((state) => state.userinfo.status)
    const [data, setdata] = useState(false)
    const [image, setImg] = useState('')
    const nav = useNavigate()
    const [value, setValue] = useState('');

    // pending
    const [pending, setPending] = useState(false)


    // filtering search
    const [search, setSearch] = useState('')


    const env = useSelector(environmentSelector)


    const getData = async (page) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            },
            params: {
                take: 8, page: page, search: search
            }
        }


        const response = await getBlogs(config)


        if (response) {

            if (response.data.code === 1) {

                setdata(response.data)
                console.log(response)

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
    }, [search]);


    const handleAdd = async (values, value, img) => {

        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        const conf = window.confirm('آیا  مطمن هستید ؟')
        if (conf) {
            const endpoint = `${url}/admin/blog/add`


            const formdata = new FormData()
            formdata.append("title", values.title)
            formdata.append("txt", value)
            formdata.append("img", img)
            setPending(true)
            toast.info('در حال ارسال ...')
            const response = await axios.post(endpoint, formdata, config)
            if (response) {
                toast.dismiss()
                if (response.data.code === 1) {

                    toast.success('با موفقیت اضافه شد.');
                    setPending(false)
                    setdata(false)
                    getData().then();
                } else {
                    toast.warning(response.data.error)
                }
            } else {
                toast.error('اتصال خود را بررسی کنید')
            }


        }

    }

    const handleDelete = async (itemid) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        const conf = window.confirm('آیا از حذف مطمن هستید ؟')
        if (conf) {

            let endpoint = `${url}/admin/blog/delete/${itemid}`

            const response = await axios.get(endpoint, config)
            if (response) {
                if (response.data.code === 1) {
                    toast.success('با موفقیت حذف شد.');
                    getData().then();
                } else {
                    toast.warning(response.data.error)
                }
            } else {
                toast.error('اتصال خود را بررسی کنید')
            }
        }

    }


    let content
    if (data !== false) {
        content = <BlogsTable>

            {data.items.map((item) => {
                return (
                    <>
                        <tr key={item.id} className='has-text-centered yekan'>


                            <td>{item.date_text}</td>
                            <td>{item.title}</td>


                            <td>

                                <button className='button is-danger is-outlined mx-1'
                                        onClick={() => handleDelete(item.id)}>
                                    <DeleteOutline/>
                                </button>

                                <button className='button is-link is-outlined mx-1'
                                        onClick={() => nav(`/admin/blogs/${item.id}`)}>
                                    <Edit/>
                                </button>


                            </td>
                        </tr>
                    </>

                )
            })}
        </BlogsTable>
    } else {
        content = <div className='column is-12'>
            <Spinner/>
        </div>
    }
    return (
        <>
            <div className='columns is-variable is-3 mt-3 p-6  is-multiline '>
                <div className='column is-12 welcome__master '>
                    <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                        بلاگ و ما یتعلق به


                    </h1>

                    <article className='subtitle yekan my-3 is-size-6'>
                        مشاهده و ویرایش پست های بلاگ مربوط به سایت سفیران نوآوری در این قسمت صورت میگیرد.
                    </article>

                </div>


                <div className='column is-12 welcome__master my-2'>


                    <h3 className='yekan'>
                        اضافه کردن پست
                    </h3>

                    <Formik initialValues={{
                        title: '',


                    }} validationSchema={Yup.object().shape({

                        title: Yup.string().required('ضروری').max(2000, 'باید کمتر از 2000 کاراکتر باشد'),


                    })} onSubmit={(values, actions) => {
                        handleAdd(values, value, image);
                        actions.resetForm();
                    }}>
                        {({errors, touched}) => (
                            <Form className=''>


                                <label className='label mt-3 yekan' aria-hidden="true">عنوان پست</label>
                                <Field className='yekan input my-2' type="text" id="title" name="title"/>
                                <ErrorMessage component='span' className='has-text-danger yekan mx-auto' name='title'/>


                                <label className='label mt-3 yekan' aria-hidden="true">متن پست</label>
                                <ReactQuill className='has-text-centered' theme="snow" value={value}
                                            onChange={setValue}/>


                                <label className='label mt-3 yekan' aria-hidden="true"> عکس </label>
                                <input onChange={(e) => setImg(e.target.files[0])} className='yekan input'
                                       type='file' id="img"
                                       name="img"/>


                                <label className='label mt-3 yekan' aria-hidden="true"> عکس انتخابی </label>


                                {

                                    image !== '' ?


                                        <div className='has-text-centered'>
                                            <img src={URL.createObjectURL(image)} alt="" 
                                                 style={{maxWidth: '20rem'}}/>
                                        </div>


                                        :
                                        <p className='has-text-centered'>
                                            تصویری انتخاب کنید.
                                        </p>
                                }


                                <div className='has-text-centered py-6'>
                                    {
                                        pending ? <Spinner/> : <button
                                            className='button clrone has-text-weight-bold  pinar mt-6 mx-3 borderrad1 '
                                            type='submit'> اضافه کن
                                        </button>
                                    }


                                </div>


                            </Form>


                        )}


                    </Formik>
                </div>

                <div className='column is-12 my-2 welcome__master'>
                    <input className="input" onChange={(e) => setSearch(e.target.value)} type="text"
                           placeholder="جستجو ..."/>
                </div>


                {
                    content
                }


                {/*paginator*/}
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

                <div className='column is-12'>

                </div>

            </div>


        </>
    )
}
export default Blogs;