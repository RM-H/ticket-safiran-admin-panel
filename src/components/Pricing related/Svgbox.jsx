
import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch'
import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {isDisabled} from "@testing-library/user-event/dist/utils";




const Svgbox = ({map, setItems, itemsselected,havePriceList,setHavePrice}) => {
    // const cart = useSelector(cartSelector)
    // const dispatch = useDispatch()


    useEffect(() => {
        const items = document.getElementsByClassName('st0')
        const itemsarr = [...items]



        let pricedids
            if (havePriceList.length>0){
                pricedids = havePriceList.map((item)=>(
                    String(item.id)
                ))
            }


        const handleclick = (e) => {
            if (e.target.classList.contains('parhamdisable')) {
                alert('صندلی دیگری انتخاب کنید. این صندلی قبلا خریداری شده است.')
                return false
            }


            if (havePriceList.length>0 && pricedids.includes(e.target.id)) {
                toast.warning('صندلی انتخابی قیمت دارد. از لیست قیمت را ویرایش یا حذف کنید.')
            } else {
                if (itemsselected.includes(e.target.id)) {
                    e.target.style.fill = '#C6C9DF'
                    let filtered = itemsselected.filter((item) => (
                        item !== e.target.id
                    ));

                    setItems(filtered)


                } else {
                    e.target.style.fill = '#209a00'

                    setItems((prev) => [...prev, e.target.id])
                }
            }


        }

        itemsarr.map((item) => {
            (

                item.addEventListener('click', handleclick)


            )


        })
        return () => {
            itemsarr.map((item) => {
                item.removeEventListener('click', handleclick)
            })
        }


    }, [itemsselected,havePriceList])



    //
    //
    // // applying color based on each seats status
    // useEffect(() => {
    //     const test = () => {
    //         let seats = seatinfo.map((s) => {
    //             let res = document.getElementById(s.id);
    //
    //             if (res) {
    //                 if (s.status == 1) {
    //                     // res.style.fill='green'
    //                 } else {
    //                     res.style.fill = 'red'
    //                     res.style.cursor = 'not-allowed'
    //                     res.classList.add('parhamdisable')
    //                 }
    //             }
    //         })
    //
    //
    //
    //         if (cart.length > 0) {
    //             setItems(cart)
    //             cart.map((id)=>document.getElementById(id).style.fill='#209a00')
    //             // dispatch(addtoCart([]))
    //
    //
    //
    //
    //
    //
    //
    //         }
    //
    //
    //
    //
    //
    //     }
    //     test()
    //
    // }, [])


    return (
        <>


            <div className='column is-12  welcome__master  mt-3 p-4 lightborder  '>

                <TransformWrapper wheel={{disabled:'true'}}>

                    <TransformComponent wrapperStyle={{width: '100%', height: '100%'}}
                                        contentStyle={{width: '100%', height: '100%'}}>

                        <>


                            <div dangerouslySetInnerHTML={{__html: map}} style={{width: '100%', height: '100%'}}/>


                        </>


                    </TransformComponent>
                </TransformWrapper>


            </div>


        </>
    )
}
export default Svgbox;