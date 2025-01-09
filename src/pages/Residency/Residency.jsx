import { useState, useEffect } from 'react'
import styles from './styles.module.scss';
import useLangState from '@/atoms/language_atom';
// import { data } from './content';
import Marquee from "react-fast-marquee";

import Airtable from 'airtable';

const Residency = () => {

    const [{lang}] = useLangState();
    // let content = data[lang];

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [form, setForm] = useState({email: '', notes: ''})

    //handle airtable
    const base = new Airtable({apiKey: `${import.meta.env.VITE_AIRTABLE_API_KEY}`}).base(`${import.meta.env.VITE_AIRTABLE_BASE_ID}`);
    const table = base('residency');

    function isValidEmail(email) {
        // Define a regular expression pattern for email validation.
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const handleSignup = () => {

        setError(false);

        if (isValidEmail(form.email)) {
            table.create([
                {
                    "fields": {
                        "email": form.email,
                        "notes": form.notes,
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
                //     console.log(rec.getId(), rec.getId() == null)
                // })

                //to show success message
                records.forEach((rec) => {
                    if (rec.getId() !== null) {
                        setSuccess(true)
                    }
                })
            })
        } else {
            setError(true);
        }
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentBlock}>
                <div className={styles.blockTitle}>
                    <span>RESIDENCY</span>
                    <span>!!</span>
                </div>
                
                <div className={styles.desc}>If you end up here...it’s most likely because  you’re interested in some sort of residency program in Bangkok with Cache. Sign up below to hear more on what the residency is about and how to be a part of it...when we figure that part out  👀</div>
                <div className={styles.formRow}>
                    <label className={styles.label}>
                        <div className={styles.title}>E-mail</div>
                        <input type="text" onChange={(e) => setForm((states) => ({...states, email: e.target.value}))} value={form.email}/>
                    </label>
                </div>
                <div className={styles.formRow}>
                    <label className={styles.label}>
                        <div className={styles.title}>Anything else you'd like us to know</div>
                        <textarea onChange={(e) => setForm((states) => ({...states, notes: e.target.value}))} value={form.notes}/>
                    </label>
                </div>
                <button className={styles.button} onClick={() => handleSignup()}>{success ? "thank you!" :"Let's go"}</button>
                { error && <div className={styles.status}>Uh oh, not a valid email.</div> }
            </div>
            <div className={styles.marquee}>
                <Marquee autoFill speed={30}>
                    <span style={{ marginRight: '12px'}}>Cache is a multidisciplinary collective focusing on provoking deep curiosity in technology through the lens of electronic art. </span> 
                </Marquee>
            </div>
        </div>
    )
}

export default Residency;