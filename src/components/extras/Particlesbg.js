import {  useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";



const Particlesbg = () => {

    const [ init, setInit ] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {

    };


    const options = {
        background: {
            color: {
                value: "#000000"
            }
        },
        fpsLimit: 120,
        particles: {
            number: {
                value: 6,
                density: {
                    enable: false,
                    value_area: 800
                }
            },
            color: {
                value: [ "#5e059b", "#ff00c6", "#fff" ]
            },
            shape: {
                type: "circle"
            },
            opacity: {

                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: true,
                    startValue: "min",
                    count: 1,

                },
                value: {
                    min: 0,
                    max:0.36
                }
            },
            size: {
                value: 51,
                random: {
                    enable: true,
                    minimumValue: 10
                }
            },
            line_linked: {
                enable: false,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed:4,
                direction: "none",
                random: true,
                straight: false,
                outMode: "out",
                bounce: false,
                warp: false,
                noise: {
                    enable: true,
                    delay: {
                        value: 0.1
                    }
                }
            }
        },


    }



  return(
      <>

          { init && <Particles
              id="tsparticles"
              particlesLoaded={particlesLoaded}
              options={options}



          />
          }


      </>
  )
}
export default Particlesbg;