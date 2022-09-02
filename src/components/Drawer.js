function Drawer() {
    return(
      <div className="overlay" style={{display: 'none'}}>
        <div className="drawer">
          <h2>Корзина
            <img className="imgRemove" src="/img/btn-remove.svg" alt="Remove" />
          </h2>
          <div className="items">
            <div className="cartItem">
              <img className="cartImage" width={70} height={70} src="/img/sneakers/1.jpg" alt="Sneakers" />
              <div className="cartText">
                <p className="cartDescription">Мужские Кроссовки Nike Air Max 270</p>
                <b className="cartPrice">399 руб.</b>
              </div>
                <img className="imgRemove" src="/img/btn-remove.svg" alt="Remove" />
            </div>
            <div className="cartItem">
              <img className="cartImage" width={70} height={70} src="/img/sneakers/1.jpg" alt="Sneakers" />
              <div className="cartText">
                <p className="cartDescription">Мужские Кроссовки Nike Air Max 270</p>
                <b className="cartPrice">399 руб.</b>
              </div>
                <img className="imgRemove" src="/img/btn-remove.svg" alt="Remove" />
            </div>
          </div>
          <div className="cartList">
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
            <button className="cartButton">Оформить заказ
              <img width={20} height={20} src="/img/arrow.svg" alt="Arrow" />
            </button>
          </div>
        </div>
      </div>
    )
}

export default Drawer;