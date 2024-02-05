import { useLoader, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from "three";

const Shift = ({ windowWidth }) => {

    const { viewport } = useThree();
    const texture = useLoader(THREE.TextureLoader, '/models/shift.png');
    const [scale, setScale] = useState(1.2);
    const [top, setTop] = useState(1.76);

    useEffect(() => {

        if (windowWidth < 768) {
            setScale(0.8);
            setTop(1.35);
        } else {
            setScale(1.2);
            setTop(1.76);
        }
        
    },[windowWidth])

    return (
        <mesh position={[0, viewport.height/2 - top, 0]} scale={scale}>
            <planeGeometry attach="geometry" args={[3.6, 1.3]}/>
            <meshBasicMaterial attach="material" map={texture} transparent={true}/>
        </mesh>
    )
}

export default Shift;