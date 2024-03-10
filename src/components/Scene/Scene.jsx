import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Environment } from "@react-three/drei";
import styles from './styles.module.scss';
import Model from './Model';
import Info from './Info';
import Shift from './Shift';
import Bg from './Bg';

const Scene = () => {

    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);

            if (window.innerWidth < 768) {
                setMobile(true);
            } else {
                setMobile(false);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    return (
        <div className={styles.canvas}>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Suspense fallback={null}>

                            <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
                            <Shift windowWidth={windowWidth} />
                            <Model windowWidth={windowWidth} />
                            <Info windowWidth={windowWidth} label={"location"} firstLine={"1559"} secondLine={"Space"} order={'one'}/>
                            <Info windowWidth={windowWidth} label={"dates"} firstLine={"4–15"} secondLine={"April"} order={'two'}/>
                            <Info windowWidth={windowWidth} label={"daily"} firstLine={"13:00–"} secondLine={"21:00"} order={'three'}/>
                            <Environment files={'/models/warehouse.hdr'} />

                            
                    <Bg />
                </Suspense>
             </Canvas>
        </div>
    )
}

export default Scene;