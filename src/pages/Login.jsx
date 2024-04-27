import Particlesbg from "../components/extras/Particlesbg";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from "yup";
import {adminlogin} from '../services/service'
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom'
import {adduserinfo} from "../slices/UserSlice";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Spinner} from "../components";

const Login = () => {

    const nav = useNavigate()
    const dispatch = useDispatch()
    const [loading,setloading] =useState(false)

    const HandleLogin = async (v) => {
        let formdata = new FormData()
        formdata.append("username", v.username)
        formdata.append("password", v.password)
        setloading(true)
        const response = await adminlogin(formdata)
        if (response.data.code === 2) {
            console.log(response.data)
            toast.error(response.data.error)
            setloading(false)

        } else if (response.data.code === 1) {
            setloading(false)
            dispatch(adduserinfo(response.data))
            nav('/admin') ;
            toast.success(`خوش آمدی ${response.data.user.name} 🙌`)
            localStorage.setItem('admin',JSON.stringify(response.data.user.token))
        }
    }


    return (

        <>
            <Particlesbg/>
            <div className='is-flex is-justify-content-center is-align-items-center'
                 style={{width: "100wv", height: '100vh'}}>


                <div className="main-login " style={{
                    backgroundImage: "url('assets/images/bg1.avif')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                    <input type="checkbox" id="chk" aria-hidden="true"/>

                    <div className="signup is-size-5 has-text-centered">
                        <h2>
                            به پنل
                          مدیریت

                            خوش آمدید
                        </h2>
                    </div>

                    <div className="login">


                        <Formik initialValues={{username: '', password: ''}} validationSchema={Yup.object().shape({

                            username: Yup.string().required('ضروری'),
                            password: Yup.string().required('ضروری')

                        })} onSubmit={(values) => HandleLogin(values)}>
                            {({errors, touched}) => (
                                <Form className='has-text-centered'>


                                    <label htmlFor="chk" aria-hidden="true">ورود</label>
                                    <Field className='yekan' type="text" id="username" name="username"
                                           placeholder="نام کاربری"/>
                                    <ErrorMessage component='span' className='has-text-danger yekan mx-auto'
                                                  name='email'/>
                                    <Field className='yekan' type="Password" id="password" name="password"
                                           placeholder="رمز عبور"

                                    />
                                    <ErrorMessage component='span' className='has-text-danger yekan' name='pswd'/>
                                    <button disabled={loading} className='my-4' type='submit'>
                                        {
                                            loading ?<Spinner/> :'ورود'
                                        }

                                        </button>


                                </Form>


                            )}


                        </Formik>
                    </div>

                </div>


            </div>


        </>
    )
}
export default Login;