import {useSelector} from "react-redux";
import {userinfoSelector,dashboardSelector} from "../../slices/UserSlice";
import {Speedo} from '../index'
import Spinner from './Spinner'

const Userbanner = () => {


    const dataneeded = useSelector(userinfoSelector)
    const status = useSelector((state) => state.userinfo.status)


    let content

    if (status==='done') {
        content = <h3 className='clrtwotext'>{dataneeded.user.name}</h3>
    } else {
        content =
            <Spinner/>

    }


    return (
        <>
        <div className="columns is-multiline m-0 welcome__master mt-3">
                <div className="column  is-9  p-3  has-text-centered">

                    <div className='is-flex is-flex-direction-column is-justify-content-space-around '
                         style={{height: '100%', width: '100%'}}>
                        <span className="is-flex is-flex-direction-column width100 ">
                            <p>خوش اومدی</p>
                            {
                                content
                            }

                            <h4> پنل خود را مدیریت کنید ارباب 🙌</h4>
                        </span>

                        <div className='columns m-0 width100 lightborder borderrad1 '>
                            <div className='column is-3 pinar '>


                                دفعات ورود:
                                <p className='has-text-weight-bold my-2'>

                                    {
                                        status === 'done' ?
                                            dataneeded.user.login_count : <Spinner/>
                                    }
                                </p>


                            </div>

                            <div className='column is-3 pinar'>
                                آخرین ورود:
                                <p className='has-text-weight-bold my-2'>

                                    {
                                        status === 'done' ?
                                            new Date(dataneeded.user.last_login * 1000).toLocaleString("fa-IR") :
                                            <Spinner/>

                                    }
                                </p>

                            </div>

                            <div className='column is-3 pinar '>


                                IP:
                                <p className='has-text-weight-bold my-2'>

                                    {
                                        status === 'done' ?
                                            dataneeded.info.ip : <Spinner/>
                                    }
                                </p>


                            </div>

                            <div className='column is-3 pinar '>


                                سیستم عامل سرور:
                                <p className='has-text-weight-bold my-2'>

                                    {
                                        status === 'done' ?
                                            dataneeded.info.system : <Spinner/>
                                    }
                                </p>


                            </div>


                        </div>

                    </div>


                </div>


            <div className='column is-3'>

                <Speedo/>
            </div>


        </div>

        </>
    )
}
export default Userbanner;