import styles from './Drawer.module.css';

function Drawer({onClose, items=[]}) {
    return(
      <div className={styles.overlay}>
        <div className={styles.drawer}>
          <h2>Корзина
            <img onClick={onClose} className={styles.imgRemove} src="/img/btn-remove.svg" alt="Close" />
          </h2>
          <div className={styles.items}>
            {
              items.map(obj => (
                <div className={styles.cartItem}>
                  <img className={styles.cartImage} width={70} height={70} src={obj.image} alt="Products" />
                  <div className={styles.cartText}>
                    <p className={styles.cartDescription}>{obj.title}</p>
                    <b className={styles.cartPrice}>{obj.price} руб.</b>
                  </div>
                  <img className={styles.imgRemove} src="/img/btn-remove.svg" alt="Remove" />
                </div>
              ) )
            }
            </div>
          <div className={styles.cartList}>
            <ul>
              <li>
                <span>Налог 5%</span>
                <div></div>
                <b>2 руб. 50 коп.</b>
              </li>
              <li>
                <span>Итого</span>
                <div></div>
                <b>798 руб.</b>
              </li>
            </ul>
            <button className={styles.cartButton}>Оформить заказ
              <img width={20} height={20} src="/img/arrow.svg" alt="Arrow" />
            </button>
          </div>
        </div>
      </div>
    )
}

export default Drawer;