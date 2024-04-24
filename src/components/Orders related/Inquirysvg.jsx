
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {useEffect} from "react";


const Inquirysvg = ({svg, reservations}) => {


// making reserved seats red
    useEffect(() => {
        const test = () => {
            let seats = reservations.map((s) => {
                let res = document.getElementById(s.id);

                if (res) {

                    res.style.fill = '#209a00'
                    res.style.cursor = 'not-allowed'
                    res.classList.add('parhamdisable')

                }
            })


        }
        test()

    }, [])


    return (
        <>

            <TransformWrapper>

                <TransformComponent wrapperStyle={{width: '100%', height: '100%'}}
                                    contentStyle={{width: '100%', height: '100%'}}>

                    <>


                        <div dangerouslySetInnerHTML={{__html: svg}} style={{width: '100%', height: '100%'}}/>


                    </>


                </TransformComponent>
            </TransformWrapper>

        </>
    )
}
export default Inquirysvg;