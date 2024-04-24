import {KeyboardArrowLeft} from "@mui/icons-material";


const Table12 = () => {
    return (
        <>
            <div className='column is-12 p-3'>
                <div className='welcome__master p-3' style={{width: '100%', height: '100%'}}>
                    <button className='button clrone clrtwotext pinar has-text-weight-bold borderrad2'
                            style={{float: 'left'}}>
                        <KeyboardArrowLeft/>
                    </button>
                    <h4 className='pinar has-text-centered has-text-weight-bold my-3'>
                        تایتل


                    </h4>


                    <table className='table width100'>
                        <thead className='clrtwo'>
                        <tr className=''>

                            <th className='has-text-centered has-text-white'>1</th>
                            <th className='has-text-centered has-text-white'>2</th>
                            <th className='has-text-centered has-text-white'>3</th>
                            <th className='has-text-centered has-text-white'>4</th>
                            <th className='has-text-centered has-text-white'>6</th>
                            <th className='has-text-centered has-text-white'>5</th>

                        </tr>

                        </thead>

                        <tbody>
                        <tr className='has-text-centered'>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>

                        </tr>
                        </tbody>
                    </table>


                </div>
            </div>


        </>
    )
}
export default Table12;
