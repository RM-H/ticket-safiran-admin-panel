import React, {useEffect,useState} from 'react'
import {useSelector,useDispatch} from "react-redux";
import {userinfoSelector,addnotif} from "../slices/UserSlice";
import {getMessages,url} from '../services/service'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {NavigateNext,NavigateBefore,DeleteOutline} from '@mui/icons-material'
import {MessagesTable,Spinner} from '../components'
import axios from "axios";



const Messages = () => {
    const dataneeded = useSelector(userinfoSelector)

    const nav = useNavigate()
    const dispatch = useDispatch()
    const [search,setSearch] = useState('')

    const [data, setData] = useState(false)

    const getData =async (page,t)=>{
        const token = JSON.parse(localStorage.getItem('admin'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                take:10 , page:page , search:search
            }
        }


        const response = await getMessages(config)
        if (response) {

            if (response.data.code===1) {
                setData(response.data)
                dispatch(addnotif(response.data.paginator.total))


            } else {
                toast.error(response.data.error)
            }

        } else {
            toast.error('اتصال خود به شبکه را بررسی کرده و مجددا تلاش کنید.')
        }

    }
    useEffect(() => {
        getData().then()
    }, [search]);




    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('admin'))

        if (token){
            getData().then()
        } else {
            nav('/');
            toast.error('ابتدا وارد سیستم شو🤔')
        }


    }, []);



    const handleDelete = async (id)=>{
        const conf = window.confirm('آیا  مطمن هستید ؟')
        const config = {
            headers: {
                Authorization: `Bearer ${dataneeded.user.token}`
            }
        }
        if(conf) {
            const response = await axios.get(`${url}/admin/contact/delete/${id}`,config)
            if ( response.data.code===1){
                toast.success('حذف شد.');
                getData().then()
            } else {
                toast.warning('اتصال خود را بررسی کنید.')
            }
        }

    }


    let content
    if(data!==false) {
        if (data.items.length>0){
            content = <MessagesTable>
                {data.items.map((item)=>{
                    return(
                        <>
                            <tr className='has-text-centered yekan'>


                                <td>{new Date(item.timestamp*1000).toLocaleDateString('fa-IR')}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.text}</td>
                                <td><DeleteOutline className='has-text-danger' onClick={()=>handleDelete(item.id)}/></td>
                            </tr>
                        </>

                    )
                })}
            </MessagesTable>
        } else {
            content=
                <div className='column is-12'>
                    <p className='my-3'>
                        چیزی برای نمایش وجود ندارد 🤷‍♀️

                    </p>
                </div>

        }


    } else {
        content = <div className='column is-12'>
        <Spinner/>
        </div>
    }




  return(
      <>
          <div className='columns mt-3 px-4 pb-3 is-multiline welcome__master' style={{maxHeight: "100%"}}>
              <div className='column is-12 my-2'>
                  <input className="input" onChange={(e) => setSearch(e.target.value)} type="text"
                         placeholder="جستجو ..."/>
              </div>


              {
                  content
              }

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


          </div>


      </>
  )
}
export default Messages