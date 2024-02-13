import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { data } from './data';

const Wildcard = () => {

    const [ show, setShow ] = useState(0);
    const [score, setScore] = useState([]);
    const [currOption, setCurrOption] = useState('');
    const [loading, setLoading] = useState();
    const max = 5;

    const handleResult = () => {
        console.log(score)
    }

    useEffect(() => {

        let timer;
        setLoading(true);

        if (show == max) {
           timer = setTimeout(() => {
            setLoading(false);
            handleResult();
           },[ 500 ])
        }

        return () => clearTimeout(timer);

    }, [show])
    
    const questions = data && data.map((item, index) => {

        let options = item.options.map((option, i) => {
            return (
                <label key={i} className={classNames(styles.option, {[styles.selected] : option.category == currOption})}>
                    <input 
                        type="radio" 
                        name={item.question} 
                        value={option.category} 
                        onClick={() => setCurrOption(option.category)}
                    />
                    {option.content} 
                </label>
            )
        })

        return (
            <AnimatePresence key={index}>
            {index == show && (
                <motion.div
                    key="content"
                    initial={{ opacity: 0, x: '-50%', y: '100%' }}
                    animate={{ opacity: 1, x: '-50%', y: '0%' }}
                    exit={{ opacity: 0, x: '-50%',y: '-100%' }}
                    className={styles.questionContainer}
                >
                    <div className={styles.question}>{item.question}</div>
                    <div className={styles.optionsContainer}>{options}</div>
                </motion.div>
            )}
            </AnimatePresence>
        )
    })

    console.log(show)
    //TODO: remove option if hit previous? 
    //TODO: handle results......

    return (
        <div className={styles.quizContainer}>
            {questions}
            <motion.div 
                className={styles.controllers}
                animate={ show >= max ? { opacity: 0, transitionEnd: { display: 'none' }} : { opacity: 1 }}
            >
                <button className={styles.button} onClick={() => setShow(show <= 0 ? show : show - 1)}>Prev</button>
                <button 
                    disabled={currOption == '' ? true : false} 
                    className={styles.button} 
                    onClick={() => {
                        setShow(show < max ? show + 1 : show);
                        setCurrOption('');
                        setScore(score => [...score, currOption]); 
                    }}
                >Next</button>
            </motion.div>
            <AnimatePresence>
                { show == max && loading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        loading
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                { show == max && !loading && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {score}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Wildcard;