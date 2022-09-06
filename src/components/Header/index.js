import styles from './Header.module.css';

function Header({onClickCart}) {
    return (
        <header>
        <div className={styles.headerLeft}>
          <img width={40} height={40} src="/img/logo.png" alt="" />
          <div>
            <h3 className={styles.headerTitle}>KOREA_BY</h3>
            <p className={styles.headerText}>Магазин корейской косметики</p>
          </div>
        </div>
        <ul  className={styles.headerRight}>
          <li onClick={onClickCart} className={styles.headerList}>
            <img width={18} height={18} src="/img/cart.png" alt="" />
            <span>399 руб.</span>
          </li>
          <li>
          <img width={20} height={20} src="/img/user.png" alt="" /> 
          </li>
        </ul>
      </header>
    )
}

export default Header;