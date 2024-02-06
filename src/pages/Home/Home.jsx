import { useState, useEffect } from 'react'
import Scene from '@/components/Scene';
import styles from './styles.module.scss';
import Airtable from 'airtable';
import { easeIn, motion } from 'framer-motion';

//TODO: add modal to add email on mobile instead to avoid keyboard push bug

const Home = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [mobile, setMobile] = useState(false);

    const base = new Airtable({apiKey: `${import.meta.env.VITE_AIRTABLE_API_KEY}`}).base(`${import.meta.env.VITE_AIRTABLE_BASE_ID}`);
    const table = base('signups');

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

    const modalVariant = {
        open: {
            y: '0%',
            opacity: 1,
            transition: {
                duration: 0.25,
                easing: easeIn
            }
        }, 
        close: {
            y: '100%',
            opacity: 0,
            transition: {
                duration: 0.25,
                easing: easeIn
            }
        }
    }

    const scrimVariant = {
        open: {
            opacity: 1,
            zIndex: 2,
            transition: {
                duration: 0.25,
                easing: easeIn
            }
        }, 
        close: {
            opacity: 0,
            zIndex: -1,
            transition: {
                duration: 0.25,
                easing: easeIn
            }
        }
    }

    return (
        <div>
            <motion.div 
                className={styles.modalContainer}
                variants={modalVariant}
                initial={false}
                animate={ openModal && mobile ? 'open' : 'close'}
            >
                <div className={styles.close} onClick={() => setOpenModal(false)}>~ Close ~</div>
                <div className={styles.form}>
                    <input type="email" pattern=".+@example\.com" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}/> 
                    <div className={styles.arrow} onClick={handleSignup}/>
                </div>
                { submitted && <div className={styles.status}>{ error ? 'Uh oh, not a valid email' : 'Thank you! See you soon :)'}</div>}
            </motion.div>
            <Scene />
            {
                !mobile &&
                <div className={styles.emailContainer}>
                    <input type="email" pattern=".+@example\.com" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}/>  
                    <button className={styles.button} onClick={handleSignup}>RSVP</button>
                    { submitted && <div className={styles.status}>{ error ? 'Uh oh, not a valid email' : 'Thank you! See you soon :)'}</div>}
                </div>
            }
            {
                mobile && 
                <div className={styles.mobileContainer}>
                    <button className={styles.button} onClick={() => setOpenModal(true)}>RSVP</button>
                </div>
            }
            <motion.div 
                className={styles.scrim}
                initial={false}
                variants={scrimVariant}
                animate={ openModal ? 'open' : 'close'}
                onClick={() => setOpenModal(false)}
            />
        </div>
    )
}

export default Home;