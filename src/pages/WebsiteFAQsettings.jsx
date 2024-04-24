import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import React, {useEffect, useState} from "react";
import {getFAQ,url} from "../services/service";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {NavigateBefore, NavigateNext,Delete} from "@mui/icons-material";
import {Spinner} from '../components'
import axios from "axios";



const WebsiteFAQsettings = () => {

    const nav = useNavigate()
    const dataneeded = useSelector(userinfoSelector)
    const status = useSelector((state) => state.userinfo.status)
    const [data, setdata] = useState(false)









    const getData = async (page) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            },
            params: {
                take:6 , page:page
            }
        }


        const response = await getFAQ(config)
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
    }, []);


    const handleUpdate = async (itemid,values) => {

        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        const conf = window.confirm('آیا  مطمن هستید ؟')
        if (conf){
            let endpoint = `${url}/admin/faq/edit/${itemid}`
            const formdata = new FormData()
            formdata.append("q",values.q)
            formdata.append("answer",values.a)
            const response = await axios.post(endpoint,formdata,config)
            if (response){
                if (response.data.code===1){
                    toast.success('با موفقیت بروز شد.');
                    getData().then();
                }
            }else {
                toast.error('اتصال خود را بررسی کنید')
            }


        }

    }


    const handleAdd = async (values) => {

        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        const conf = window.confirm('آیا  مطمن هستید ؟')
        if (conf){
            let endpoint = `${url}/admin/faq/add`
            const formdata = new FormData()
            formdata.append("q",values.q)
            formdata.append("answer",values.a)
            const response = await axios.post(endpoint,formdata,config)
            if (response){
                if (response.data.code===1){
                    toast.success('با موفقیت اضافه شد.');
                    getData().then();
                }
            }else {
                toast.error('اتصال خود را بررسی کنید')
            }


        }

    }

    const handleDelete=async (itemid)=>{
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        const conf = window.confirm('آیا  مطمن هستید ؟')
        if (conf){

            let endpoint = `${url}/admin/faq/delete/${itemid}`
            const response = await axios.get(endpoint,config)
            if (response){
                if (response.data.code===1){
                    toast.success('با موفقیت حذف شد.');
                    getData().then();
                }
            } else {
                toast.error('اتصال خود را بررسی کنید')
            }
        }

    }




    let content
    if (data!==false){
        content =( data.items.map((item)=>{
            return(

                <>
                <div className='column is-4  p-2 borderrad1 my-1' key={item.id}>


                    <div className='welcome__master p-3'>



                    <Formik initialValues={{
                        q: item.q,
                        a: item.answer,

                    }} validationSchema={Yup.object().shape({

                        a: Yup.string().required('ضروری').max(500, 'باید کمتر از 500 کاراکتر باشد'),
                        q: Yup.string().required('ضروری').max(1000, 'باید کمتر از 1000 کاراکتر باشد'),

                    })} onSubmit={(values) => handleUpdate(item.id,values)}>
                        {({errors, touched}) => (
                            <Form className=''>


                                <label className='label mt-3 yekan' aria-hidden="true">عنوان سوال</label>
                                <Field className='yekan input my-2' type="text" id="q" name="q"   />
                                <ErrorMessage component='span' className='has-text-danger yekan mx-auto' name='q'/>


                                <label className='label mt-3 yekan' aria-hidden="true">پاسخ</label>
                                <Field className='yekan textarea my-2' as='textarea' rows='3' type="text" id="a" name="a"   />
                                <ErrorMessage component='span' className='has-text-danger yekan' name='a'/>





                                <div className='has-text-centered'>
                                    <button className='button clrone has-text-weight-bold  pinar mt-6 mx-3 borderrad1 ' type='submit'>ثبت تغییرات</button>
                                    <button onClick={()=>handleDelete(item.id)} className='button has-text-weight-bold borderrad1  pinar mt-6 mx-3 '><Delete className='has-text-danger'/>   </button>

                                </div>



                            </Form>


                        )}


                    </Formik>

                    </div>

                </div>

                </>
            )
        }))
    } else {
        content=<div className='column is-12'>
            <Spinner/>
        </div>
    }



  return(
      <>
          <div className='columns is-variable is-3 mt-3 p-6  is-multiline ' >
            <div className='column is-12 welcome__master'>
                <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                    تنظیمات سوالات متداول
                </h1>

                <article className='subtitle yekan my-3 is-size-6'>
                    مشاهده و ویرایش تنظیمات سوالات متداول مربوط به سایت در این قسمت صورت میگیرد.
                </article>

            </div>


              <div className='column is-12 welcome__master my-2'>
                 <h3 className='yekan'>
                     اضافه کردن سوال
                 </h3>

                  <Formik initialValues={{
                      q: '',
                      a: '',

                  }} validationSchema={Yup.object().shape({

                      a: Yup.string().required('ضروری').max(500, 'باید کمتر از 500 کاراکتر باشد'),
                      q: Yup.string().required('ضروری').max(1000, 'باید کمتر از 1000 کاراکتر باشد'),

                  })} onSubmit={(values,actions) => {
                      handleAdd(values);
                      actions.resetForm();
                  }}>
                      {({errors, touched}) => (
                          <Form className=''>


                              <label className='label mt-3 yekan' aria-hidden="true">عنوان سوال</label>
                              <Field className='yekan input my-2' type="text" id="q" name="q"   />
                              <ErrorMessage component='span' className='has-text-danger yekan mx-auto' name='q'/>


                              <label className='label mt-3 yekan' aria-hidden="true">پاسخ</label>
                              <Field className='yekan textarea my-2' as='textarea' rows='3' type="text" id="a" name="a"   />
                              <ErrorMessage component='span' className='has-text-danger yekan' name='a'/>





                              <div className='has-text-centered'>
                                  <button className='button clrone has-text-weight-bold  pinar mt-6 mx-3 borderrad1 ' type='submit'> اضافه کن</button>


                              </div>



                          </Form>


                      )}


                  </Formik>
              </div>


              {
                  content
              }


              {/*paginator*/}
              <div className='column is-12'>
                  {data &&
                      <div className='pinar' style={{display:'flex' , justifyContent:'center'}}>


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

                                  <button onClick={() => getData(data.paginator.nextPage)} className='button is-transparent'>
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
export default WebsiteFAQsettings;