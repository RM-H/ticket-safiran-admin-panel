


const Table12 = ({children}) => {

    return (
        <>
            <div className='column is-12 p-3'>
                <div className='welcome__master p-3' style={{width: '100%', height: '100%'}}>

                    <h4 className='pinar has-text-centered has-text-weight-bold my-3'>
                        پیام های دریافتی


                    </h4>


                    <table className='table width100'>
                        <thead className='clrtwo'>
                        <tr className=''>

                            <th className='has-text-centered has-text-white'>تاریخ</th>
                            <th className='has-text-centered has-text-white'>نام فرستنده</th>
                            <th className='has-text-centered has-text-white'>شماره تلفن</th>
                            <th className='has-text-centered has-text-white'>متن پیام</th>
                            <th className='has-text-centered has-text-white'>حذف</th>


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
export default Table12;
