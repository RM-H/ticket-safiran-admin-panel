import {KeyboardArrowLeft} from '@mui/icons-material'

const Table = ({title,data}) => {
    return (
        <>
            <div className='column is-6 p-3'>
                <div className='welcome__master p-3' style={{width: '100%', height: '100%'}}>

                    <h4 className='pinar has-text-centered has-text-weight-bold my-3'>
                        {title}


                    </h4>


                    <table className='table width100'>
                        <thead className='clrtwo'>
                        <tr className='yekan'>

                            <th className='has-text-centered has-text-white'>تاریخ</th>
                            <th className='has-text-centered has-text-white'>خریدار</th>
                            <th className='has-text-centered has-text-white'>قیمت</th>
                            <th className='has-text-centered has-text-white'>برنامه</th>
                            <th className='has-text-centered has-text-white'>شهر</th>
                            <th className='has-text-centered has-text-white'>سالن</th>

                        </tr>

                        </thead>

                        <tbody>
                        {data}
                        </tbody>
                    </table>


                </div>
            </div>


        </>
    )
}
export default Table;