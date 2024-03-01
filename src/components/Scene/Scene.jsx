import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Environment, Html, Lightformer, Text } from "@react-three/drei";
import styles from './styles.module.scss';
import Model from './Model';
import Info from './Info';
import Shift from './Shift';
import Bg from './Bg';

//TODO: add window resize to make sure things scale correctly

const Scene = () => {

    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

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
                    <Bg />
                    <Info windowWidth={windowWidth} label={"Location"} firstLine={"1559"} secondLine={"SPACE"} order={'one'}/>
                    <Info windowWidth={windowWidth} label={"Date"} firstLine={"4-15"} secondLine={"APRIL"} order={'two'}/>
                    <Info windowWidth={windowWidth} label={"Time"} firstLine={"13:00-"} secondLine={"21:00"} order={'three'}/>
                    <Environment files={'/models/warehouse.hdr'} />
                </Suspense>
             </Canvas>
        </div>
    )
}

export default Scene;