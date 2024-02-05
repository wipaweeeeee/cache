import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Html, Text } from "@react-three/drei";
import styles from './styles.module.scss';

const Info = ({ label, firstLine, secondLine, order, windowWidth }) => {

    const { viewport } = useThree();
    const [spacer, setSpacer] = useState({one: 0, two: 0, three: 0});
    const [lineHeight, setLineHeight] = useState({label: 3.2, first: 0, second: 0});
    const [fontSize, setFontSize] = useState(0.3);

    useEffect(() => {

        if (windowWidth > 1440) {
            setSpacer({one: 100, two: 330, three: 520});
            setLineHeight({label: 3.2, first: 2.6, second: 2.36})
            setFontSize(0.3);
        } else if (windowWidth >= 1024 && windowWidth < 1439) {
            setSpacer({one: 50, two: 200, three: 350});
            setLineHeight({label: 3.2, first: 2.6, second: 2.4})
            setFontSize(0.25);
        } else if (windowWidth >= 768 && windowWidth < 1023) {
            setSpacer({one: 30, two: 170, three: 300});
            setLineHeight({label: 3.2, first: 2.6, second: 2.4})
            setFontSize(0.25);
        } else if (windowWidth < 767) {
            setSpacer({one: 32, two: 180, three: 320});
            setLineHeight({label: 3.9, first: 3.1, second: 2.85})
            setFontSize(0.22);
        }

    },[windowWidth])

    const fontProps = { 
        font: '/fonts/self-modern_italic_trial.woff', 
        fontSize: fontSize, 
        letterSpacing: -0.05, 
        lineHeight: 1, 
        color: '#000'
    }

    const normalizedSpacer = 0.008 * spacer[order]; //0.008 = 1px in 2D world

    //TODO: add to calendar etc on click

    return (
        <group>
            <Html position={[-viewport.width/2 + normalizedSpacer, -viewport.height / lineHeight['label'], 0]}>
                <div onClick={(e) => console.log("click inside")} className={styles.pill}>{label}</div>
            </Html>
            <Text {...fontProps} position={[-viewport.width/2 + normalizedSpacer, -viewport.height / lineHeight['first'], 0]} anchorX={"left"}>{firstLine}</Text>
            <Text {...fontProps} position={[-viewport.width/2 + normalizedSpacer, -viewport.height / lineHeight['second'], 0]} anchorX={"left"}>{secondLine}</Text>
        </group>
       
    )
}

export default Info;