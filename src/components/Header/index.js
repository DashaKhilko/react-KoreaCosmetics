import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header({onClickCart}) {
    return (
        <header>
        <Link to="/">
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
            <img width={28} height={25} src="/img/cart.svg" alt="Cart" />
            <span className={styles.headerText}>399 руб.</span>
          </li>
          <li className={styles.headerList}>
            <Link to="/favorites">
              <img width={28} height={25} src="/img/heart.svg" alt="Favorites" /> 
            </Link>
          </li>
          <li>
          <img width={30} height={28} src="/img/user.svg" alt="User" /> 
          </li>
        </ul>
      </header>
    )
}

export default Header;

