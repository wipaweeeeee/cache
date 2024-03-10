import { useState } from 'react';
import styles from './styles.module.scss';
import Airtable from 'airtable';
import Marquee from "react-fast-marquee";
import useLangState from "@/atoms/language_atom";
import { data } from "./content";
import classNames from 'classnames';

const About = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState();
    const [submitted, setSubmitted] = useState(false);

    const base = new Airtable({apiKey: `${import.meta.env.VITE_AIRTABLE_API_KEY}`}).base(`${import.meta.env.VITE_AIRTABLE_BASE_ID}`);
    const table = base('signups');

    const [{lang}] = useLangState();
    let content = data[lang];

    function isValidEmail(email) {
        // Define a regular expression pattern for email validation.
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const handleSignup = () => {

        setSubmitted(true);

        if (isValidEmail(email)) {
            table.create([
                {
                    "fields": {
                        "email": email
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

    return (
        <div className={styles.aboutContainer}>
            <div className={styles.bigCache}>
                <img src="/cache.svg" />
            </div>
            <div className={styles.content}>
                <div className={styles.column}>
                    <p style={{ marginBottom: '20px' }} className={classNames({[styles.thai] : lang == 'th'})}>{content.block1}</p>
                    <p className={classNames({[styles.thai] : lang == 'th'})}>{content.block2}</p>
                </div>
                <div className={styles.twoUp}>
                    <div className={styles.column}>
                        <p className={classNames({[styles.thai] : lang == 'th'})}>{content.block3}</p>
                    </div>
                    <div className={styles.column}>
                        <p className={classNames({[styles.thai] : lang == 'th'})}>{content.block4}</p>
                        <div className={styles.form}>
                            <input type="email" pattern=".+@example\.com" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}/> 
                            <div className={styles.arrow} onClick={handleSignup}/>
                        </div>
                        { submitted && <div className={styles.status}>{ error ? 'Uh oh, not a valid email' : 'Thank you for your interest :)'}</div>}
                    </div>
                </div>
            </div>
            <div className={styles.contact}>
                <div className={styles.column}>
                    <p>Email:</p>
                    <p>Instagram:</p>
                    <p>Facebook:</p>
                </div>
                <div className={styles.column}>
                    <a href="mailto:hello@thisiscache.com">hello@thisiscache.com</a>
                    <a href="https://www.instagram.com/thisis.cache/">@thisis.cache</a>
                    <a href="https://www.facebook.com/thisis.cache">facebook.com/thisis.cache</a>
                </div>
                <div className={styles.press}>For press kit, click <a href="https://drive.google.com/drive/folders/1k3_orO0io-klPI8J5SAyhZe15zp6srDx?usp=sharing" target="_blank">here.</a></div>
            </div>
            <div className={styles.marquee}>
                <Marquee autoFill speed={30}>
                    <span style={{ marginRight: '12px'}}>Cache is a multidisciplinary collective focusing on provoking deep curiosity in technology through the lens of electronic art. </span> 
                </Marquee>
            </div>
        </div>
    )
}

export default About;