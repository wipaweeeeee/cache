import { useState, useEffect } from 'react'
import Scene from '@/components/Scene';
import styles from './styles.module.scss';
import Airtable from 'airtable';
import { easeIn, motion } from 'framer-motion';

const Home = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [openDesc, setOpenDesc] = useState(false);

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
            zIndex: 1,
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

    const descVariant = {
        open: {
            opacity: 1,
            zIndex: 2,
            scale: 1,
            x: '-50%',
            y: '-50%',
            transition: {
                duration: 0.25,
                easing: easeIn
            }
        }, 
        close: {
            opacity: 0,
            scale: 0.5,
            x: '-50%',
            y: '-50%',
            transition: {
                duration: 0.25,
                easing: easeIn
            },
            transitionEnd: { zIndex: -1 }
        }
    }

    const descCTAVariant = {
        show: {
            opacity: 1,
            transition: {
                duration: 0.25,
                easing: easeIn,
                delay: 0.5
            }
        },
        hide: {
            opacity: 0,
            transition: {
                duration: 0.25,
                easing: easeIn
            }
        }
    }

    const descCTAVariantMob = {
        open: {
            opacity: 1,
            zIndex: 10,
            rotate: 45,
            transition: {
                duration: 0.25,
                easing: easeIn,
                delay: 0.25
            }
        }, 
        close: {
            opacity: 0,
            rotate: 45,
            transition: {
                duration: 0.25,
                easing: easeIn
            },
            transitionEnd: { zIndex: -1 }
        }
    }

    return (
        <div>
            <motion.div 
                className={styles.descCTA} 
                initial={false}
                variants={descCTAVariant}
                animate={openDesc ? 'hide' : 'show'}
                onClick={() => setOpenDesc(true)}
            />
            {
               mobile && 
               <motion.div 
                    className={styles.closeCTA} 
                    onClick={() => setOpenDesc(false)}
                    initial={false}
                    variants={descCTAVariantMob}
                    animate={openDesc ? 'open' : 'close'}
                />
            }
            <motion.div 
                className={styles.desc}
                initial={false}
                variants={descVariant}
                animate={openDesc ? 'open' : 'close'}
            >
            {
               !mobile && <div className={styles.closeCTA} onClick={() => setOpenDesc(false)}/>
            }
                <p>
                    SHIFT brings together the varied work of five emerging artists and technologists originally from Thailand to demonstrate that neither art nor technology can be understood through just one perspective and audience. Instead of technology being the sole property of nerds, tech bros, venture capitalists, could it instead function as a softer, artistic canvas to express something painful, moving, or strange? Instead of art being a conversation solely between painters, hipsters, gallerists, and collectors, what can those fluent in the language of technology bring to the conversation?
                </p>
                <p>
                    The work in this show probes and plays with these dynamics through new ideas, deviant strategies, and absurd forms of technology, code, and pixels — proving that technology can be a fertile canvas used to challenge and critique our interaction with daily life, question the notion of beauty, challenge the concept of time, or have no meaningful 'functionality' at all.
                </p>
            </motion.div>
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