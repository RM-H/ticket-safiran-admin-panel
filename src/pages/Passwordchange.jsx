import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useSelector} from "react-redux";
import {userinfoSelector} from "../slices/UserSlice";
import axios from "axios";
import {url} from '../services/service'
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom'


const Passwordchange = () => {


    const dataneeded = useSelector(userinfoSelector)
    const nav = useNavigate()

    const handlePWchange =async (v) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }

        const formdata = new FormData()
        formdata.append("password",v.ExPW)
        formdata.append("newpassword",v.NewPW)

        const response = await axios.post(`${url}/admin/dashboard/password`,formdata,config)
        if (response) {
            if (response.data.code===1) {
                toast.success('رمز با موفقیت بروز شد');
                nav('/admin')
            } else {
                toast.error(response.data.error)
            }
        } else {
            toast.warning('اتصال خود را بررسی کنید.')
        }

    }

    const handlenamechange =async (v) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }

        const formdata = new FormData()
        formdata.append("name",v.name)


        const response = await axios.post(`${url}/admin/dashboard/profile`,formdata,config)
        if (response) {
            if (response.data.code===1) {
                toast.success('نام کاربری با موفقیت بروز شد');
                nav('/admin')
            } else {
                toast.error(response.data.error)
            }
        } else {
            toast.warning('اتصال خود را بررسی کنید.')
        }

    }




  return(
      <>

          <div className='columns is-justify-content-center mt-3 px-4 pb-3 is-multiline welcome__master'
               style={{maxHeight: "100%"}}>
              <div className='column is-12'>
                  <h3 className='pinar has-text-centered clrtwotext has-text-weight-bold'>
                      تغییر رمز و نام کاربری
                  </h3>
              </div>

              <div className='column is-6 is-flex is-justify-content-center lightborder borderrad1'>

                  <Formik initialValues={{ExPW: '', NewPW: ''}} validationSchema={Yup.object().shape({

                      ExPW: Yup.string().required('ضروری'),
                      NewPW: Yup.string().required('ضروری')

                  })} onSubmit={(values) => handlePWchange(values)}>
                      {({errors, touched}) => (
                          <Form>


                              <label className='yekan ' aria-hidden="true">رمز عبور قبلی</label>
                              <Field className='yekan input my-3' type="Password" id="ExPW" name="ExPW"
                                     placeholder="رمز عبور قبل "/>
                              <ErrorMessage component='span' className='has-text-danger yekan mx-auto'

                                            name='ExPW'/>


                              <Field className='yekan input my-3' type="Password" id="NewPW" name="NewPW"
                                     placeholder="رمز عبور جدید"

                              />
                              <ErrorMessage component='span' className='has-text-danger yekan' name='NewPW'/>


                              <button className='my-4 mx-4 yekan button clrone' type='submit'>ورود</button>


                          </Form>


                      )}


                  </Formik>

              </div>
              <div className='column is-6 is-flex is-justify-content-center lightborder borderrad1'>

                  <Formik initialValues={{name: dataneeded.user.name}} validationSchema={Yup.object().shape({

                      name: Yup.string().required('ضروری'),


                  })} onSubmit={(values) => handlenamechange(values)}>
                      {({errors, touched}) => (
                          <Form>


                              <label className='yekan ' aria-hidden="true">نام کاربری</label>
                              <Field className='yekan input my-3' type="text" id="name" name="name"
                                     placeholder="تغییر نام کاربری "/>
                              <ErrorMessage component='span' className='has-text-danger yekan mx-auto'

                                            name='name'/>





                              <button className='my-4 mx-4 yekan button clrone' type='submit'>تغییر</button>


                          </Form>


                      )}


                  </Formik>

              </div>

          </div>


      </>
  )
}
export default Passwordchange;