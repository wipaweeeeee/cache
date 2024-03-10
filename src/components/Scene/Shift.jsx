import { useLoader, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from "three";

const Shift = ({ windowWidth }) => {

    const { viewport } = useThree();
    const texture = useLoader(THREE.TextureLoader, '/models/event_logo_2.png');
    const [scale, setScale] = useState(1.2);
    const [top, setTop] = useState(1.76);

    useEffect(() => {

        if (windowWidth < 768) {
            setScale(0.75);
            setTop(1.5);
        } else {
            setScale(1.2);
            setTop(2);
        }
        
    },[windowWidth])

    return (
        <mesh position={[0, viewport.height/2 - top, 0]} scale={scale}>
            <planeGeometry attach="geometry" args={[4, 1.54]}/>
            <meshBasicMaterial attach="material" map={texture} transparent={true}/>
        </mesh>
    )
}

export default Shift;