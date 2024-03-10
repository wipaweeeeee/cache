import { useState, useEffect } from 'react'
import Scene from '@/components/Scene';
import styles from './styles.module.scss';
import useLangState from '@/atoms/language_atom';
import { data } from './content';
import classNames from 'classnames';

import Airtable from 'airtable';

const Home = () => {

    const [mobile, setMobile] = useState(false);
    const [{lang}] = useLangState();
    let content = data[lang];

    const [error, setError] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [copied, setCopied] = useState('');
    const [form, setForm] = useState({name: '', phone: '', email: '', social: '', website: '', presenting: false, attending: false, detail: '' })

    useEffect(() => {

        if (window.location.hash !== '') {
            let id = window.location.hash.replace('#', '');
            let scrollOffset = document.getElementById(id).offsetTop + 0.8 * window.innerHeight - 80;
            window.scrollTo({top: scrollOffset, behavior: 'smooth'});
        }

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

        setSubmitted(eventType);

        if (isValidEmail(form.email)) {
            table.create([
                {
                    "fields": {
                        "name": form.name,
                        "phone": form.phone,
                        "social": form.social,
                        "website": form.website,
                        "email": form.email,
                        "attending": form.attending,
                        "presenting": form.presenting,
                        "detail": form.detail,
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

    console.log(form)

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
                    <div className={styles.formRow}>
                        <label className={styles.label}>
                            <div className={styles.title}>Name</div>
                            <input type="text" onChange={(e) => setForm((states) => ({...states, name: e.target.value}))} value={form.name}/>
                        </label>
                        <label className={styles.label}>
                            <div className={styles.title}>Phone Number</div>
                            <input type="text" onChange={(e) => setForm((states) => ({...states, phone: e.target.value}))} value={form.phone}/>
                        </label>
                    </div>
                    <div className={styles.formRow}>
                        <label className={styles.label}>
                            <div className={styles.title}>Social Media</div>
                            <input type="text" onChange={(e) => setForm((states) => ({...states, social: e.target.value}))} value={form.social}/>
                        </label>
                        <label className={styles.label}>
                            <div className={styles.title}>Website (optional)</div>
                            <input type="text" onChange={(e) => setForm((states) => ({...states, website: e.target.value}))} value={form.website}/>
                        </label>
                    </div>
                    {
                        item.type == 'open projector' && 
                        <div className={styles.formRow}>
                            <label className={classNames(styles.label, styles.radio)}>
                                <div className={classNames(styles.title, {[styles.thai] : lang == 'th'})}>{lang == "th" ? "สนใจเข้าฟัง" : "Just attending :)"}</div>
                                <div className={classNames(styles.checkbox, {[styles.checked] : form.attending})} onClick={() => setForm((states) => ({...states, attending: !form.attending}))}/>
                            </label>
                            <label className={classNames(styles.label, styles.radio)}>
                            <div className={classNames(styles.title, {[styles.thai] : lang == 'th'})}>{lang == "th" ? "สนใจร่วมพรีเซ้นท์" : "I'd like to share work!"}</div>
                                <div className={classNames(styles.checkbox, {[styles.checked] : form.presenting})} onClick={() => setForm((states) => ({...states, presenting: !form.presenting}))}/>
                            </label>
                        </div>
                    }
                    {
                        item.type == 'open projector' && form.presenting && 
                        <div className={styles.formColumn}>
                                 <div className={classNames(styles.title, {[styles.thai] : lang == 'th'})}>
                                    {lang == "th" ? "โปรดอธิบายงานสั้นๆ" : "Please describe briefly what you are planning to share"}
                                </div>
                                <textarea onChange={(e) => setForm((states) => ({...states, detail: e.target.value}))} value={form.detail}/>
                        </div>
                    }
                    <div className={styles.formRow}>
                        <label className={classNames(styles.label, styles.long)}>
                            <div className={styles.title}>E-mail</div>
                            <input type="email" pattern=".+@example\.com" onChange={(e) => setForm((states) => ({...states, email: e.target.value}))} value={form.email}/>
                        </label>
                        { !mobile && <button className={styles.button} onClick={() => handleSignup(item.type)}>RSVP</button>}
                        { mobile && <div className={styles.arrow} onClick={() => handleSignup(item.type)}/>}
                    </div>
                    { submitted == item.type && <div className={styles.status}>{ error ? 'Uh oh, not a valid email' : 'Thank you! See you soon :)'}</div>}
                </div>
            </div>
        )
    })


    return (
        <div>
            <Scene />
            <div className={styles.htmlContainer}>
                <div className={classNames(styles.detailsContainer, styles.first)}>
                    <h1>Cache presents</h1>
                    <p className={classNames(styles.desc, {[styles.thai] : lang == 'th'})}>{content.p1}</p>
                    <h4>{content.h1}</h4>
                    <p className={styles.desc}>April 4–15, 1pm-9pm daily at <a href="https://maps.app.goo.gl/3eeriHbHgYdgeA5H6" target="_blank">1559 Space</a>, Bangkok, Thailand</p>
                </div>
                {specialEvents}
                {
                    mobile &&
                    <div className={styles.socialContainerMobile}>
                        <a href="https://www.instagram.com/thisis.cache/" className={styles.social} target='_blank'>Instagram</a>
                        <a href="https://www.facebook.com/thisis.cache" className={styles.social} target='_blank'>Facebook</a>
                    </div>
                }
            </div>
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