import React from "react";
import {Button} from '@mui/material'
import {Settings} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'


const WebsiteSettingsMainPage = () => {

    const nav = useNavigate()
  return(
      <>
          <div className='columns is-variable is-3 mt-3 px-4 pb-3 is-multiline welcome__master' style={{maxHeight: "100%"}}>

              <div className='column is-12 '>
                  <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                      تنظیمات کلی وبسایت
                  </h1>




              </div>
                <div className='column is-3  is-flex is-align-content-center is-flex-direction-column  borderrad1' style={{minHeight:'10rem'}}>
                    <div className='lightborder borderrad1' style={{height:'100%'}}>
                        <Button onClick={()=>nav('/admin/site-settings/info')} variant='contained' color='info' className='width100 pinar'>
                            عناوین و اطلاعات تماس
                            <Settings/>
                        </Button>
                        <article className='yekan p-1'>
                            تنظیمات مربوط به :
                            <code>
                                H1 , H2 , H3 , Header,Footer,SocialMedia,Map,ContactInfo
                            </code>

                        </article>


                    </div>

                </div>

              <div className='column is-3  is-flex is-align-content-center is-flex-direction-column  borderrad1' style={{minHeight:'10rem'}}>

                  <div className='lightborder' style={{height:'100%'}}>
                      <Button onClick={()=>nav('/admin/site-settings/faq')} variant='contained' color='info' className='width100 pinar'>
                          سوالات متداول
                          <Settings/>
                      </Button>
                      <article className='yekan p-1'>
                          تنظیمات مربوط به :
                          <code>
                              Frequently asked questions
                          </code>

                      </article>
                  </div>

              </div>



          </div>


      </>
  )
}
export default WebsiteSettingsMainPage;