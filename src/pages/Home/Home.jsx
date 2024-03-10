import { useState, useEffect } from 'react'
import Scene from '@/components/Scene';
import styles from './styles.module.scss';
import useLangState from '@/atoms/language_atom';
import { data } from './content';

const Home = () => {

    const [mobile, setMobile] = useState(false);
    const [{lang}] = useLangState();
    let content = data[lang];

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
        <div>
            <Scene />
            {
                !mobile &&
                <div className={styles.socialContainer}>
                    <a href="https://www.instagram.com/thisis.cache/" className={styles.social} target='_blank'>Instagram</a>
                    <a href="https://www.facebook.com/thisis.cache" className={styles.social} target='_blank'>Facebook</a>
                </div>
            }
        </div>
    )
}

export default Home;