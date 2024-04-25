import {
    Home,
    KeyboardVoice,
    Receipt,
    MusicNote,
    TipsAndUpdates,
    ArticleOutlined,

    LiveTv,
    CreditCard,
    Message,
    Tune,
    LocationOn
} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'
import {useState} from "react";
import {useSelector} from 'react-redux'
import {environmentSelector} from '../slices/UserSlice'

const Sidebar = () => {

    // keeping track of active page
    const [active, setActive] = useState(0)
    const nav = useNavigate()

    const env = useSelector(environmentSelector)


    // displaying sidemenu based on selected env

    const bilitim =

        <>

            <div className={`dashboard__menu ${active === 0 && 'dashboardActive'}`} onClick={() => {
                nav('/admin');
                setActive(0)
            }}>

                <Home/>
                <h3>داشبورد</h3>
            </div>


            <div className={`dashboard__menu ${active === 1 && 'dashboardActive'}`} onClick={() => {
                nav('/admin/singers');
                setActive(1)
            }}>
                <div className="is-flex">
                    <KeyboardVoice/>
                    <h3>خواننده ها/ مجریان</h3>
                </div>

            </div>

            <div className={`dashboard__menu ${active === 2 && 'dashboardActive'}`} onClick={() => {
                nav('/admin/salon');
                setActive(2)
            }}>
                <Receipt/>
                <h3> سالن ها</h3>
            </div>

            <div className={`dashboard__menu ${active === 3 && 'dashboardActive'}`} onClick={() => {
                nav('/admin/events');
                setActive(3)
            }}>
                <MusicNote/>
                <h3> رویداد ها</h3>
            </div>


            <div className={`dashboard__menu ${active === 4 && 'dashboardActive'}`} onClick={() => {
                nav('/admin/live');
                setActive(4)
            }}>
                <LiveTv/>
                <h3> پخش زنده و آرشیو</h3>
            </div>
            <div className={`dashboard__menu ${active === 5 && 'dashboardActive'}`} onClick={() => {
                nav('/admin/cities');
                setActive(5)
            }}>
                <LocationOn/>
                <h3> شهر ها</h3>
            </div>

            <div className={`dashboard__menu ${active === 6 && 'dashboardActive'}`} onClick={() => {
                nav('/admin/orders');
                setActive(6)
            }}>
                <CreditCard/>
                <h3> خریدها</h3>
            </div>

            <div className={`dashboard__menu ${active === 7 && 'dashboardActive'}`} onClick={() => {
                nav('/admin/messages');
                setActive(7)
            }}>
                <Message/>
                <h3>پیام ها</h3>
            </div>

            <div className={`dashboard__menu ${active === 8 && 'dashboardActive'}`} onClick={() => {
                nav('/admin/site-settings');
                setActive(8)
            }}>
                <Tune/>
                <h3> تنظیمات</h3>
            </div>

            <div className={`dashboard__menu ${active === 9 && 'dashboardActive'}`} onClick={() => {
                nav('/admin/about');
                setActive(9)
            }}>
                <TipsAndUpdates/>
                <h3> راهنمای پنل</h3>
            </div>
        </>


    let safiran = <>
        <div className={`dashboard__menu ${active === 0 && 'dashboardActive'}`} onClick={() => {
            nav('/admin');
            setActive(0)
        }}>

            <Home/>
            <h3>داشبورد</h3>
        </div>


        <div className={`dashboard__menu ${active === 3 && 'dashboardActive'}`} onClick={() => {
            nav('/admin/blogs');
            setActive(3)
        }}>
            <ArticleOutlined/>
            <h3> بلاگ </h3>
        </div>


        <div className={`dashboard__menu ${active === 6 && 'dashboardActive'}`} onClick={() => {
            nav('/admin/orders');
            setActive(6)
        }}>
            <CreditCard/>
            <h3> خریدها</h3>
        </div>

        <div className={`dashboard__menu ${active === 7 && 'dashboardActive'}`} onClick={() => {
            nav('/admin/messages');
            setActive(7)
        }}>
            <Message/>
            <h3>پیام ها</h3>
        </div>

        <div className={`dashboard__menu ${active === 8 && 'dashboardActive'}`} onClick={() => {
            nav('/admin/site-settings');
            setActive(8)
        }}>
            <Tune/>
            <h3> تنظیمات</h3>
        </div>

        <div className={`dashboard__menu ${active === 9 && 'dashboardActive'}`} onClick={() => {
            nav('/admin/about');
            setActive(9)
        }}>
            <TipsAndUpdates/>
            <h3> راهنمای پنل</h3>
        </div>

    </>


    return (
        <>
            <div className="is-flex is-flex-direction-column rightmenu p-3 my-3 ">


                {
                    env === 1 ? bilitim : safiran
                }


            </div>

        </>
    )
}
export default Sidebar;