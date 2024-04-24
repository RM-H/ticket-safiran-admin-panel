


const EventsTable = ({children}) => {

    return (
        <>
            <div className='column is-12 p-3 welcome__master my-4'>
                <div className='welcome__master p-3' style={{width: '100%', height: '100%'}}>

                    <h4 className='pinar has-text-centered has-text-weight-bold my-3'>
                        رویداد ها


                    </h4>


                    <table className='table width100'>
                        <thead className='clrtwo'>
                        <tr className=''>

                            <th className='has-text-centered has-text-white'> تاریخ</th>
                            <th className='has-text-centered has-text-white'> نوع رویداد</th>
                            <th className='has-text-centered has-text-white'>فروش</th>
                            <th className='has-text-centered has-text-white'>خواننده یا مجری</th>
                            <th className='has-text-centered has-text-white'>عنوان کنسرت</th>

                            <th className='has-text-centered has-text-white'>شهر</th>
                            <th className='has-text-centered has-text-white'>عملیات</th>


                        </tr>

                        </thead>

                        <tbody>

                        {
                            children
                        }



                        </tbody>
                    </table>


                </div>
            </div>


        </>
    )
}
export default EventsTable;
