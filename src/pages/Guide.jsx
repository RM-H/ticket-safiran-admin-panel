import {Divider,Tooltip} from '@mui/material'

const Guide = () => {
    return (
        <>
            <div className='columns m-0 mt-3 is-multiline welcome__master lightborder'>

                <div className='column is-12  p-4'>
                    <h1 className='has-text-centered pinar is-size-4 clrtwotext has-text-weight-bold'>
                        راهنمای پنل
                    </h1>

                </div>


                <div className='column is-12'>
                    <article className="message is-dark has-text-right pinar">
                        <div className="message-header">
                            <p className='has-text-white'>راهنمای کلی اضافه کردن کنسرت همایش یا تاتر</p>

                        </div>
                        <div className="message-body" style={{textAlign: 'justify'}}>
                            در این سیستم همایش - کنسرت و یا تاتر رویداد (event) هایی از جنس یکسان و Type متفاوت در نظر
                            گرفته میشوند.
                            به منظور اضافه کردن رویداد (کنسرت-همایش-تاتر) از منو رویداد و گزینه اضافه کردن رویداد
                            استفاده
                            کنید.


                            در منو ایجاد رویداد و گزینه وضعیت امکان ایجاد رویداد هایی که بلیط فروشی آنها در آینده شروع
                            خواهد شد نیز فرهم میباشذ. بدین منظور باید ساعت و تاریخ شروع بلیط فروشی در این منو تعیین
                            شوند.
                            <br/>
                            در نظر داشته باشید که قبل از ایجاد رویدادی باید سالن -خواننده و شهر رویداد ایجاد شده باشیند.

                            <br/>

                            به منظور اضافه کردن سالن از منوی سالن استفاده کنید که در این منو نقشه سالن به صورت فایل SVG
                            که
                            به فرمت JSX در آمده است استفاده خواهد شد.
                            توجه داشته باشید که در فایل SVG هر یک از Path های مربط به صندلی باید Prop با Key مقدار Id و
                            Value مقدار شماره صندلی داشته باشند.این مقادیر در سیستم جهت تعیین و مشاهده قیمت هر صندلی
                            مورد
                            استفاده قرار خواهند گرفت.
                            <br/>

                            سیستمی که پیش روی شماست قادر است در هر رویداد سانس های متفاوتی ایجاد کرده و در هر یک از سانس
                            ها برای صندلی واحد قیمت های متفاوتی تنظیم کند. به منظور قیمت گذاری برای صندلی ها پس از ایجاد
                            رویداد در لیست رویداد از گزینه "سانس ها" استفاده کنید. پس از ایجاد سانسی صندلی های آن سانس
                            قابل قیمت گذاری خواهند بود.
                            <br/>
                            به منظور قیمت گذاری صندلی های مورد نظر را انتخاب کرده و قیمتی را برای صندلی های انتخابی وارد
                            کنید. توجه داشته باشید که قیمت های تنظیم شده در این مرحله به عنوان قیمت های موقت در نظر
                            گرفته
                            میشوند. پس از قیمت گذاری تمامی صندلی ها از گزینه ثبت نهایی استفاده کنید.
                            قیمت صندلی های یک سانس که از قبل ثبت نهایی شده اند نیز در این منو قابل مشاهده و ویرایش
                            میباشند.
                            توجه داشته باشید که تعداد صندلی های قیمت گزاری شده و ظرفیت سالن باید برابر باشند.

                        </div>
                    </article>


                    <article className="message is-info my-3 has-text-left lightborder" style={{direction: 'ltr'}}>
                        <div className="message-header">
                            <p className='has-text-white'>About Project</p>

                        </div>
                        <div className="message-body">
                            <aside className="menu">
                                <p className="menu-label has-text-centered">
                                    General
                                </p>
                                <p className='is-size-6 my-6'>
                                    This project is a custom panel to manage a platform for creating different types of
                                    events (concerts, conferences, etc) and sell tickets for each one. the main challenge of this project was creating a method to efficiently (and easily) handle
                                     different seating layouts in each location.
                                </p>
                                <p className="menu-label has-text-centered">
                                    Technologies Involved
                                </p>
                                <ul className="menu-list">
                                    <li>Back-end</li>
                                    <li>

                                        <ul>Server-side Language : PHP 8.1</ul>
                                        <ul>Framework : phalcon 5</ul>
                                        <ul>Database : MariaDB</ul>
                                    </li>

                                </ul>

                                <ul className="menu-list">
                                    <li>Front-end</li>
                                    <li>

                                        <ul>Front-end Language : JS</ul>
                                        <ul>Framework : React 18.2</ul>
                                        <ul>

                                            <li>
                                                Key Libraries
                                            </li>

                                            <ul>
                                                Redux: 5.0.1
                                            </ul>
                                            <ul>
                                                React-redux: 9.1
                                            </ul>
                                            <ul>
                                                React-router-dom: 6.22
                                            </ul>
                                            <ul>
                                                React-leaflet: 4.2.1
                                            </ul>
                                            <ul>
                                                Formik: 2.4.5
                                            </ul>


                                        </ul>
                                    </li>

                                </ul>

                                <Divider>
                                    Feb.18,2024
                                    <Tooltip title='< Coded By : Ramin Hasani  />'>
                                        .
                                    </Tooltip>


                                </Divider>


                            </aside>
                        </div>
                    </article>

                </div>


            </div>

        </>
    )
}
export default Guide;