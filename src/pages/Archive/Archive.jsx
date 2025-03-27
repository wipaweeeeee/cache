import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import useLangState from '@/atoms/language_atom';
// import { data } from './content';
import classNames from 'classnames';
import Marquee from "react-fast-marquee";

import Airtable from 'airtable';

const ArchiveImage = () => {

    const [hover, setHover] = useState(false)

    return (
        <div
            className={classNames(styles.test, {[styles.hover] : hover})} 
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img src="test.jpg" />
            <svg>
                <filter id="filter1" colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
                    <feFlood floodColor="#000000" floodOpacity="0.20" x="0%" y="0%" result="flood"/>
                    <feBlend mode="normal" x="0%" y="0%" in="SourceGraphic" in2="flood" result="blend1"/>
                    <feImage className="ditherImage" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA5ElEQVQYlQXBgQbCUABA0fdrk0ySSZJJkiRJMjOTTGZmkiRJZiYzyczMzGQmfdrtHPH7/TgcDuR5zna7pWka9vs9aZqyXq8R0+mU5/OJoihcLhfG4zFBENDtdjmdToj3+81yueTz+WCaJnEcM5/PKcsSXdcRsizjeR6j0YjH40Gr1cJxHAaDAbfbDVHXNbvdjiRJWK1WfL9fLMsiyzI2mw1CVVV836fT6XA8HplMJoRhSK/X43w+I6IoYjabURQFmqbxer1YLBZUVYVhGAhJkrBtm36/z/V6pd1u47ouw+GQ+/3OH4/Fn8FvF/NxAAAAAElFTkSuQmCC" x="0" y="0" width="4" height="4" crossOrigin="anonymous" result="image1"/>
                    <feTile x="0" y="0"  in="image1" result="tile"/>
                    <feBlend mode="overlay" x="0%" y="0%"  in="blend1" in2="tile" result="blend2"/>
                    <feColorMatrix type="saturate" values="0.1"/>
                    <feComponentTransfer>
                        <feFuncR type="discrete" tableValues="0 0"/>
                        <feFuncG type="discrete" tableValues="0 1"/>
                        <feFuncB type="discrete" tableValues="1 0"/>
                    </feComponentTransfer>
                </filter>
            </svg>
    </div>
    )
}

const Archive = () => {

    const [mobile, setMobile] = useState(false);
    const [{lang}] = useLangState();
    // let content = data[lang];

    const [hover, setHover] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);

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
        <div className={styles.archivePage}>
            <div className={classNames(styles.eventCount, {[styles.hide] : showPhoto})}>
                <img src="cache.svg" className={styles.cache}/>
                <div className={styles.index}>
                    001
                </div>
            </div>
            <div className={classNames(styles.imagesContainer, {[styles.hide] : showPhoto})}>
                <ArchiveImage />
                <ArchiveImage />
                <ArchiveImage />
                <ArchiveImage />
            </div>
            <div className={classNames(styles.eventName, {[styles.show] : showPhoto})}>
                <div className={styles.title}>Shift</div>
                <div className={styles.moreButton} onClick={() => setShowPhoto(!showPhoto)}>
                    <span>see more</span>
                    <span>&rarr;</span>
                </div>
                <div className={styles.eventDetail}>
                    <div>April 4–15, 2024</div>
                    <div>1559 SPACE</div>
                    <div>Bangkok, Thailand</div>
                </div>
            </div>
            <div className={classNames(styles.eventPhoto, {[styles.show] : showPhoto})}>
                <img src="test.jpg" />
                <img src="test.jpg" />
                <img src="test.jpg" />
                <img src="test.jpg" />
                <img src="test.jpg" />
                <img src="test.jpg" />
                <img src="test.jpg" />
                <img src="test.jpg" />
            </div>
            {/* <div className={styles.marquee}> 
                <Marquee autoFill speed={5} >
                    <ArchiveImage />
                    <ArchiveImage />
                    <ArchiveImage />
                    <ArchiveImage />
                </Marquee>
            </div>  */}
        </div>
    )
}

export default Archive;