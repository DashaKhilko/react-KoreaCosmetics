import { useState } from 'react';
import axios from 'axios';
import styles from './Drawer.module.css';
import Info from '../Info';
import { useCart } from '../../hook/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, onRemoveCart, opened , items=[]}) {

  const {cartItems, setCartItems, totalPrice} = useCart();
  const [orderId, setOderId] = useState([]);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async() => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://6317427ecb0d40bc41506c4e.mockapi.io/orders', {items : cartItems})
      setOderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://6317427ecb0d40bc41506c4e.mockapi.io/cart/' + item.id)
        await delay(1000);
      }
  
    } catch(error) {
      alert('Ошибка при создании заказа :(')
    }
    setIsLoading(false);
  }

    return(
      <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
        <div className={styles.drawer}>
          <h2>Корзина
            <img onClick={onClose} className={styles.imgRemove} src="img/btn-remove.svg" alt="Close" />
          </h2>

          {
            items.length > 0 
            ? <>
                <div className={styles.items}>
                {items.map(obj => (
                  <div key={obj.parentId} className={styles.cartItem}>
                    <img className={styles.cartImage} width={70} height={70} src={obj.image} alt="Products" />
                    <div className={styles.cartText}>
                      <p className={styles.cartDescription}>{obj.title}</p>
                      <b className={styles.cartPrice}>{obj.price} руб.</b>
                    </div>
                    <img onClick={() => onRemoveCart(obj.id)} className={styles.imgRemove} src="img/btn-remove.svg" alt="Remove" />
                  </div>
                  ))
                }
                </div>
                <div className={styles.cartList}>
                  <ul>
                    <li>
                      <span>Налог 5%</span>
                      <div></div>
                      <b>{(totalPrice * 5 / 100).toFixed(2)} руб.</b>
                    </li>
                    <li>
                      <span>Итого</span>
                      <div></div>
                      <b>{totalPrice} руб.</b>
                    </li>
                  </ul>
                  <button disabled={isLoading} onClick={onClickOrder} className={styles.cartButton} >Оформить заказ
                    <img width={18} height={18} src="img/arrow.svg" alt="Arrow" />
                  </button>
                </div>
              </>
            : <Info title ={isOrderComplete ? "Заказ оформлен" : "Корзина пуста"}
                    image={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"}
                    description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы один продукт, чтобы сделать заказ"} 
                    />
          }           
        </div>
      </div>
    )
}

export default Drawer;