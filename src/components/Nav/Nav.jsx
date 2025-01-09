import { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import useLangState from '@/atoms/language_atom';

const options = [
    // { title: 'Home', path: '/'},
    // { title: 'Info', path: '/info'},
    { title: 'Residency', path: '/future'},
    { title: 'Archive Event', path: '/shift'},
    // { title: '???', path: '/wildcard'},
    // { title: 'Archive', path: '/archive'}, //update height below when add this
];

const Nav = () => {

    const [ open, setOpen ] = useState();

    const location = useLocation();
    const { pathname } = location;

    const [{lang}, setLangState] = useLangState();

    const itemsVariant = {
        open: {
            height: [0, 80, 80], //[0, 120, 120],
            opacity: [0, 0, 1],
            marginTop: [0, 60, 60],
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        },
        close: {
            height: [80, 80, 0], //[120, 120, 0]
            opacity: [1, 0, 0],
            marginTop: [60, 60, 0],
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    }

    const navItems = options.map((item, index) => {
        return (
            <li 
                key={index}
                onClick={() => setOpen(false)} 
                className={classNames({[styles.active] : pathname == item.path})}
            >
                <Link to={item.path}>{item.title}</Link>
            </li>
        )
    })

    return (
        <div className={styles.navContainer}>
            <div className={styles.nav}>
                <div className={styles.topRow} onClick={() => setOpen(!open)}>
                    <svg className={styles.burger} width="22" height="36" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.path animate={{ rotate: open ? -20 : 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }} d="M1 1H21" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M1 9H21" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                        <motion.path animate={{ rotate: open ? 8 : 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }} d="M1 17H21" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <div>Menu</div>
                </div>
                <motion.ul
                    initial={false}
                    animate={ open ? 'open' : 'close' }
                    variants={itemsVariant}
                    className={styles.items}
                >
                    {navItems}
                </motion.ul>
            </div>
            <div className={styles.languageContainer}>
                <div 
                    className={classNames(styles.option, {[styles.selected] : lang == 'en'})} 
                    onClick={() => setLangState((states) => ({...states, lang: 'en'}))}
                >EN</div>
                <div
                    className={classNames(styles.option, {[styles.selected] : lang == 'th'})} 
                    onClick={() => setLangState((states) => ({...states, lang: 'th'}))}
                >TH</div>
            </div>
        </div>
    )
}

export default Nav;