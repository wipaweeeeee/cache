import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { data, answer } from './data';

const Wildcard = () => {

    const [ show, setShow ] = useState(0);
    const [score, setScore] = useState([]);
    const [currOption, setCurrOption] = useState('');
    const [loading, setLoading] = useState();
    const [winner, setWinner] = useState();
    const [result, setResult] = useState();
    const max = 6;

    const handleResult = () => {
        
        function getOccurrence(array, value) {
            return array.filter((v) => (v === value)).length;
        }

        let results = [];
        score.forEach(item => {
            let scoreCount = getOccurrence(score, item);
            results.push({option: item, count: scoreCount})
        })

       let resultOrder = results.sort((a, b) => b.count - a.count);
       let uniqueSet = resultOrder.filter((obj, index) => {
        return index === resultOrder.findIndex(o => obj.option === o.option)
       })
        
       if (uniqueSet[0].count == uniqueSet[1].count) {

        //absolute winner
        if (uniqueSet[0].option == uniqueSet[1].option) {
            setWinner(uniqueSet[0].option);
        } 
        //no specific choice; result lukewarm answer
        else {
            setWinner('medium');
        }
       } else {
        setWinner(uniqueSet[0].option);
       }

    }

    //handle show next question
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

    //TODO: remove option if hit previous? 

    return (
        <div className={styles.quizContainer}>
            <div className={styles.title}>
                <div>ตามหา “พลิก” ในตัวคุณ </div>
                <div>รู้หรือไม่ ในตัวคุณอาจมี “พลิก” แอบซ่อนอยู่ มาลองตามหาพลิกของคุณกันเลย</div>
            </div>
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
                        className={styles.result}
                    >
                        <div>
                            {answer.filter(item => item.category == winner)[0].title}
                        </div>
                        <div>
                            {answer.filter(item => item.category == winner)[0].content}
                        </div>
                        <div className={styles.closer}>
                            ถ้าอยากตามหา “พลิก” แบบใหม่ที่คุณไม่เคยเห็นมาก่อน มาพบกันได้ที่งาน “พลิก[SHIFT] by cache” ที่จะทำพลิกกำแพงระหว่างโลกเทคโนโลยีและศิลปะให้มาอยู่ด้วยกัน แบบแยกไม่ออก 
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Wildcard;