import styles from './Drawer.module.css';

function Drawer({onClose, onRemoveCart, items=[]}) {
    return(
      <div className={styles.overlay}>
        <div className={styles.drawer}>
          <h2>Корзина
            <img onClick={onClose} className={styles.imgRemove} src="/img/btn-remove.svg" alt="Close" />
          </h2>
          {
            items.length > 0 
            ? <>
                <div className={styles.items}>
                {items.map(obj => (
                  <div className={styles.cartItem}>
                    <img className={styles.cartImage} width={70} height={70} src={obj.image} alt="Products" />
                    <div className={styles.cartText}>
                      <p className={styles.cartDescription}>{obj.title}</p>
                      <b className={styles.cartPrice}>{obj.price} руб.</b>
                    </div>
                    <img onClick={() => onRemoveCart(obj.id)} className={styles.imgRemove} src="/img/btn-remove.svg" alt="Remove" />
                  </div>
                  ))
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
                    <img width={18} height={18} src="/img/arrow.svg" alt="Arrow" />
                  </button>
                </div>
              </>
            : <div className={styles.emptyCart} >
                <img className={styles.emptyCartImage} width={120} height={120} src="/img/empty-cart.jpg" alt="Empty-cart" />
                <h2>Корзина пустая</h2>
                <p className={styles.emptyCartText}>Добавьте хоья бы один продукт, чтобы сделать заказ.</p>
                <button onClick={onClose} className={styles.cartButton}>
                  <img width={18} height={18} src="/img/arrow.svg" alt="Arrow" />Вернуться назад
                </button>
              </div>
          }           
        </div>
      </div>
    )
}

export default Drawer;