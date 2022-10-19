import { Link } from 'react-router-dom';
import styles from './Emptiness.module.css';

function Emptiness ({image, title}) {
    return(
        <div className={styles.content}>
            <p className={styles.image}>
                <img src={image} alt=":(" />
            </p>
            <p className={styles.text}>{title}</p>
            <Link to="/react-KoreaCosmetics/">
                <button className={styles.button}>
                    <img width={18} height={18} src="/img/arrow1.svg" alt="Arrow" />Вернуться назад
                </button>
            </Link>
        </div>
    )
}

export default Emptiness;

