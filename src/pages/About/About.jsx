import { useState } from 'react';
import styles from './styles.module.scss';
import Airtable from 'airtable';
import Marquee from "react-fast-marquee";

const About = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState();
    const [submitted, setSubmitted] = useState(false);

    const base = new Airtable({apiKey: `${import.meta.env.VITE_AIRTABLE_API_KEY}`}).base(`${import.meta.env.VITE_AIRTABLE_BASE_ID}`);
    const table = base('signups');

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
                    <p style={{ marginBottom: '20px' }}>
                    CACHE is an evolving platform for emerging new media & technology artists working in and around Thailand. We are a collective of varying interest and background, but shared intent to develop a new kind of artistic community; one that is focused on pushing artistic forms and expressions of technology in the local context, while at the same time contributing to the broader discourse around the applications of technology in the art and creative world.
                    </p>
                    <p>
                    Our particular artistic point of view is neither generic nor vague; we bias works and perspectives that demonstrate the fringes of how technology is applied: work that explores the playful, the non-anthropocentric, the emotional, the absurd — crossing and surprising normative expectations of how technology is used in commercial worlds and Big Tech.
                    </p>
                </div>
                <div className={styles.twoUp}>
                    <div className={styles.column}>
                        <p>
                        Through research, residencies, working groups, and exhibitions, CACHE equips artists with time, space, tools, intellectual framework, and community to create new works of art whose medium is digital, virtual, or interactive in some way. We aim to be inclusive of all forms and levels of, a grassroots initiative to grow the community of Thai artists working in these fields.
                        </p>
                    </div>
                    <div className={styles.column}>
                        <p>
                        If you’re interested in learning more or becoming involved, please join the mailing list:
                        </p>
                        <div className={styles.form}>
                            <input type="email" pattern=".+@example\.com" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}/> 
                            <div className={styles.arrow} onClick={handleSignup}/>
                        </div>
                        { submitted && <div className={styles.status}>{ error ? 'Uh oh, not a valid email' : 'Thank you for your interest :)'}</div>}
                    </div>
                </div>
                
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