import { useContext } from 'react';
import AppContext from '../../context';
import styles from '../Drawer/Drawer.module.css'

const Info = ({image, title, description}) => {
const {setCartOpened} = useContext(AppContext);

  return (
    <div className={styles.emptyCart} >
        <img className={styles.emptyCartImage} width={120} src={image} alt="Empty-cart" />
        <h2>{title}</h2>
        <p className={styles.emptyCartText}>{description}</p>
        <button onClick={() => setCartOpened(false)} className={styles.cartButton}>
            <img width={18} height={18} src="/img/arrow.svg" alt="Arrow" />Вернуться назад
        </button>
    </div>
  )
}

export default Info;