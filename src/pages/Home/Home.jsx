import Scene from '@/components/Scene';
import styles from './styles.module.scss';

const Home = () => {
    return (
        <div>
            <Scene />
            <div className={styles.emailContainer}>
              <input type="email" pattern=".+@example\.com" placeholder="E-mail"/>  
              <button className={styles.button}>RSVP</button>
            </div>
        </div>
    )
}

export default Home;