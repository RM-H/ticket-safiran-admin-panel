import CountUp from 'react-countup';






const Snippet = ({title, statistic, description}) => {
    return (
        <>
            <div className='column is-3 p-3  ' style={{height: '12em'}}>

                <div className='welcome__master p-2' style={{width: '100%', height: '100%'}}>
                    <h3 className='pinar has-text-centered clrtwotext'>
                        {title}
                    </h3>


                    <CountUp duration={2} start={0} end={statistic} delay={0}>
                        {({ countUpRef }) => (
                            <h3 className='has-text-centered yekan' ref={countUpRef} />

                        )}
                    </CountUp>

                    <article className='yekan' style={{textAlign: 'justify'}}>
                        {description}
                    </article>

                </div>


            </div>

        </>
    )
}
export default Snippet;