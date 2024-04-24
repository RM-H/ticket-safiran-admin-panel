import {Email,Settings} from '@mui/icons-material'
import {useSelector} from "react-redux";
import {userinfoSelector,dashboardSelector} from "../slices/UserSlice";
import Spinner from "./extras/Spinner";
import {Badge, Menu} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import {useState} from "react";
import MenuItem from '@mui/material/MenuItem';





const Navbar = () => {




    // dropdown shit
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const dataneeded = useSelector(userinfoSelector)
    const status = useSelector((state) => state.userinfo.status)
    const notifications = useSelector(dashboardSelector)
    const nav = useNavigate()


    let content

    if (status==='done') {
        content = <p className="has-text-black">{dataneeded.user.name}</p>
    } else {
        content =
            <Spinner/>

    }




    const handleExit = () => {
        const conf = window.confirm('آیا  مطمن هستید ؟')
        if (conf){
            nav('/') ;
            localStorage.clear()
            window.location.reload()

        }
    }
    return (
        <>
            <header className='is-flex is-align-content-center'>
                <div className="navbar__bl">
                    <nav className="navbar" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <p className="navbar-item logo">
                                <img src="/assets/images/logo.png" draggable='false' style={{maxHeight:"none"}} width="240" height="50"/>
                            </p>

                            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                               data-target="navbarBasicExample">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>



                        <div className="navbar-start ">
                            <div className="navbar-item">
                                <div className="header__icons is-flex  ">
                                    <Badge className={notifications.unseen_contacts_count!==0 && 'dashboardimageAnimated'} badgeContent={notifications.unseen_contacts_count} color='error'>
                                        <Email  onClick={()=>nav('/admin/messages')} />
                                    </Badge>


                                </div>
                                <div className="is-flex  userinfo">
                                    <img src="/images/avatar.png" alt=""/>
                                    <div className=" is-flex is-flex-direction-column info">
                                        {content}
                                        <h4 className="has-text-black">سوپر ادمین</h4>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <a className="button is-light  is-rounded">
                                        {/*<Settings className='fa-gear'/>*/}
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                           <Settings className='fa-gear'/>
                                        </Button>
                                        <Menu
                                            id="basic-menu"

                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem  className='yekan' onClick={()=>{handleClose();nav('/admin/password-change')}}>تغییر پسورد/نام کاربری</MenuItem>
                                            <MenuItem  className='yekan' onClick={()=>handleExit()}>خروج</MenuItem>
                                        </Menu>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>


        </>


    )
}
export default Navbar;