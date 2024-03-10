import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Environment, ScrollControls, Scroll } from "@react-three/drei";
import styles from './styles.module.scss';
import Model from './Model';
import Info from './Info';
import Shift from './Shift';
import Bg from './Bg';
import classNames from 'classnames';
import { data } from './content';
import useLangState from '@/atoms/language_atom';

import Airtable from 'airtable';

//TODO: add window resize to make sure things scale correctly

const Scene = ({ posY }) => {

    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [email, setEmail] = useState('');
    const [error, setError] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [copied, setCopied] = useState('');
    const [mobile, setMobile] = useState(false);

    const [{lang}] = useLangState();
    let content = data[lang];
    
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

    //timeout to hide copied copy after 3 secs
    useEffect(() => {
        let timer = setTimeout(() => {
            setCopied('');
        }, 3000)
    }, [copied])

    //handle Email signups
    const base = new Airtable({apiKey: `${import.meta.env.VITE_AIRTABLE_API_KEY}`}).base(`${import.meta.env.VITE_AIRTABLE_BASE_ID}`);
    const table = base('signups');

    function isValidEmail(email) {
        // Define a regular expression pattern for email validation.
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const handleSignup = (eventType) => {

        setSubmitted(true);

        if (isValidEmail(email)) {
            table.create([
                {
                    "fields": {
                        "email": email,
                        "event": eventType
                    }
                }
            ], function(err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                
                setError(false);
                setEmail('');
                //for debugging
                // records.forEach((rec) => {
                //     console.log(rec.getId())
                // })
            })
        } else {
            setError(true);
        }
    }

    const specialEvents = content.specialEvents.map((item, index) => {
        return (
            <div className={styles.detailsContainer} id={item.id} key={index}>
                <div className={styles.header}>
                    <div className={styles.tag}>Special Program 0.{index + 1}</div>
                    <div className={styles.link} onClick={() => { navigator.clipboard.writeText(item.url); setCopied(item.id)}}>🔗</div>
                    { copied == item.id && <div className={styles.copied}>Link copied!</div> }
                </div>
                
                <h3>{item.title}</h3>
                <p className={classNames(styles.desc, styles.left, {[styles.thai] : lang == 'th'})}>{item.desc}</p>
                <div className={styles.dates}>
                    <div className={styles.row}>
                        <div>Date: </div>
                        <div>Time: </div>
                    </div>
                    <div className={styles.row}>
                        <div>{item.date}</div>
                        <div>{item.time}</div>
                    </div>
                </div>
                <div className={styles.note}>Limited availability. RSVP by <u>April 1</u> to reserve your spot. </div>
                <div className={styles.emailContainer}>
                    <input type="email" pattern=".+@example\.com" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}/>  
                    { !mobile && <button className={styles.button} onClick={() => handleSignup(item.type)}>RSVP</button>}
                    { mobile && <div className={styles.arrow} onClick={() => handleSignup(item.type)}/>}
                    { submitted && <div className={styles.status}>{ error ? 'Uh oh, not a valid email' : 'Thank you! See you soon :)'}</div>}
                </div>
            </div>
        )
    })

    return (
        <div className={styles.canvas}>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Suspense fallback={null}>
                    <ScrollControls pages={mobile ? 4.4 : 3.5} damping={0.1}>
                        <Scroll>
                            <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
                            <Shift windowWidth={windowWidth} />
                            <Model windowWidth={windowWidth} posY={posY}/>
                            <Info windowWidth={windowWidth} label={"location"} firstLine={"1559"} secondLine={"Space"} order={'one'}/>
                            <Info windowWidth={windowWidth} label={"dates"} firstLine={"4–15"} secondLine={"April"} order={'two'}/>
                            <Info windowWidth={windowWidth} label={"daily"} firstLine={"13:00–"} secondLine={"21:00"} order={'three'}/>
                            <Environment files={'/models/warehouse.hdr'} />
                        </Scroll>
                        <Scroll html>
                            <div className={styles.htmlContainer}>
                                <div className={classNames(styles.detailsContainer, styles.first)}>
                                    <h1>Cache presents</h1>
                                    <p className={classNames(styles.desc, {[styles.thai] : lang == 'th'})}>{content.p1}</p>
                                    <h4>{content.h1}</h4>
                                    <p className={styles.desc}>{content.p2}</p>
                                </div>
                                {specialEvents}
                                {
                                    mobile &&
                                    <div className={styles.socialContainer}>
                                        <a href="https://www.instagram.com/thisis.cache/" className={styles.social} target='_blank'>Instagram</a>
                                        <a href="https://www.facebook.com/thisis.cache" className={styles.social} target='_blank'>Facebook</a>
                                    </div>
                                }
                            </div>
                        </Scroll>
                    </ScrollControls>
                    <Bg />
                </Suspense>
             </Canvas>
        </div>
    )
}

export default Scene;