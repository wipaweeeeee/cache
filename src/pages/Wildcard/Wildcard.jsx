import { useState } from 'react';
import styles from './styles.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { data } from './data';

const Wildcard = () => {

    const [ show, setShow ] = useState(0);
    const [score, setScore] = useState([]);
    const [currOption, setCurrOption] = useState();
    const max = 3;
    
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

    return (
        <div className={styles.quizContainer}>
            {questions}
            <div className={styles.controllers}>
                <button className={styles.button} onClick={() => setShow(show <= 0 ? show : show - 1)}>Prev</button>
                <button 
                    className={styles.button} 
                    onClick={() => {
                        setShow(show < max ? show + 1 : show);
                        setCurrOption('');
                        setScore(currOption); //this is wrong rn
                    }}
                >Next</button>
            </div>
        </div>
    )
}

export default Wildcard;