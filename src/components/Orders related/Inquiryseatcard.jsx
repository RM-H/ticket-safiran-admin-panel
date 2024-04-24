
import {NumericFormat} from "react-number-format";


const InquirySeatscard = ({seatNumber, seatPrice}) => {
    return (
        <>
            <div className='is-flex is-justify-content-center is-align-items-center my-1'>


                <div
                    className='is-flex is-align-items-center  is-justify-content-center is-size-7 py-3  has-text-white has-text-centered lightborder '
                    style={{width: '50%', height: '100%'}}>
                    <p className='yekan '>
                        <NumericFormat className='mx-1' displayType='text' thousandSeparator=',' value={seatPrice}/>
                        تومان
                    </p>

                </div>


                <div className='is-flex  p-2 lightborder clrone ' style={{width: '30%', height: '100%'}}>
                    <p className='yekan is-size-7'>
                        صندلی شماره : {seatNumber}
                    </p>
                </div>


            </div>


        </>
    )
}


export default InquirySeatscard;