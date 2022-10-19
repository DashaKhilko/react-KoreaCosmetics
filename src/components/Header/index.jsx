import { Link } from 'react-router-dom';
import { useCart } from '../../hook/useCart';
import styles from './Header.module.css';

function Header({onClickCart}) {
  
  const {totalPrice} = useCart();

    return (
        <header>
        <Link to="/react-KoreaCosmetics">
          <div className={styles.headerLeft}>
            <img width={50} height={50} src="/img/logo.png" alt="LogoType" />
            <div>
              <h3 className={styles.headerTitle}>KOREA_BY</h3>
              <p className={styles.headerText}>Магазин корейской косметики</p>
            </div>
          </div>
        </Link>
        <ul  className={styles.headerRight}>
          <li onClick={onClickCart} className={styles.headerList}>
            <img className={styles.imageCart} width={28} height={25} src="/img/cart.svg" alt="Cart" />
            <span className={styles.headerText}>{totalPrice} руб.</span>
          </li>
          <li className={styles.headerList}>
            <Link to="/react-KoreaCosmetics/favorites">
              <img className={styles.imageCart} width={28} height={25} src="/img/heart.svg" alt="Favorites" /> 
            </Link>
          </li>
          <li>
            <Link to="/react-KoreaCosmetics/orders">
              <img width={30} height={28} src="/img/user.svg" alt="User" /> 
            </Link>
          </li>
        </ul>
      </header>
    )
}

export default Header;

