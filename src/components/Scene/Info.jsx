import { useThree, useLoader } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Html, Text } from "@react-three/drei";
import styles from './styles.module.scss';
import * as THREE from "three";

const Info = ({ label, firstLine, secondLine, order, windowWidth }) => {

    const { viewport, gl } = useThree();
    const [spacer, setSpacer] = useState({one: 0, two: 0, three: 0});
    const [lineHeight, setLineHeight] = useState({label: 3.2, first: 0, second: 0});
    const [fontSize, setFontSize] = useState(0.3);
    const [mobile, setMobile] = useState(false);
    const [y, setY] = useState({one: 0, two: 1.2, three: 2.4})
    const texture = useLoader(THREE.TextureLoader, `/models/pill-${label}.png`);
    const textureWidth = {daily: 0.62, dates: 0.64, location: 0.8}

    useEffect(() => {

        if (windowWidth > 1440) {
            setSpacer({one: 100, two: 330, three: 520});
            setLineHeight({label: 3, first: 2.6, second: 2.36})
            setFontSize(0.3);
            setMobile(false);
        } else if (windowWidth >= 1024 && windowWidth < 1439) {
            setSpacer({one: 50, two: 200, three: 350});
            setLineHeight({label: 3, first: 2.6, second: 2.42})
            setFontSize(0.22);
            setMobile(false);
        } else if (windowWidth >= 768 && windowWidth < 1023) {
            setSpacer({one: 30, two: 170, three: 300});
            setLineHeight({label: 3, first: 2.6, second: 2.4})
            setFontSize(0.25);
            setMobile(false);
        } else if (windowWidth < 767) {
            setSpacer({one: 40, two: 195, three: 330});
            setLineHeight({label: 3.5, first: 3, second: 2.75})
            setFontSize(0.22);
            setMobile(true);
        }

    },[windowWidth])

    const fontProps = { 
        font: '/fonts/self-modern_italic.woff', 
        fontSize: fontSize, 
        letterSpacing: -0.05, 
        lineHeight: 1, 
        color: '#000'
    }

    const normalizedSpacer = 0.008 * 40;//spacer[order]; //0.008 = 1px in 2D world
    const pillSpacer = mobile ? 0.008 * 70 : 0.008 * 90;
    const extraPadding = mobile ? 0.96 : 0.7;

    //TODO: add to calendar etc on click

    return (
        <group position={[0, y[order], 0]}>
            <mesh position={[-viewport.width/2 + pillSpacer, -viewport.height / lineHeight['label'] + extraPadding, 0]}>
                <planeGeometry attach="geometry" args={[textureWidth[label], 0.25]}/>
                <meshBasicMaterial attach="material" map={texture} transparent={true} toneMapped={false}/>
            </mesh>
            <Text {...fontProps} position={[-viewport.width/2 + normalizedSpacer, -viewport.height / lineHeight['first'] + extraPadding, 0]} anchorX={"left"}>{firstLine}</Text>
            <Text {...fontProps} position={[-viewport.width/2 + normalizedSpacer, -viewport.height / lineHeight['second'] + extraPadding, 0]} anchorX={"left"}>{secondLine}</Text>
        </group>
       
    )
}

export default Info;