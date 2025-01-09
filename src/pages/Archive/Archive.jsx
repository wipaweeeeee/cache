import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import Bg from '@/components/Bg';
import styles from './styles.module.scss';
import useLangState from '@/atoms/language_atom';
// import { data } from './content';
import classNames from 'classnames';

import Airtable from 'airtable';

const Archive = () => {

    const [mobile, setMobile] = useState(false);
    const [{lang}] = useLangState();
    // let content = data[lang];
    
    useEffect(() => {

        const handleResize = () => {
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
                    <Bg />
                </Suspense>
             </Canvas>
        </div>
    )
}

export default Archive;