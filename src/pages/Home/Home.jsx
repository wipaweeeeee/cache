import { useState } from 'react'
import Scene from '@/components/Scene';
import styles from './styles.module.scss';
import Airtable from 'airtable';

const Home = () => {

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
        <div>
            <Scene />
            <div className={styles.emailContainer}>
              <input type="email" pattern=".+@example\.com" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>  
              <button className={styles.button} onClick={handleSignup}>RSVP</button>
              { submitted && <div className={styles.status}>{ error ? 'Uh oh, not a valid email' : 'Thank you! See you soon :)'}</div>}
            </div>
        </div>
    )
}

export default Home;