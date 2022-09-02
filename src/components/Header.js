function Header() {
    return (
        <header>
        <div className="headerLeft">
          <img width={40} height={40} src="/img/logo.png" alt="" />
          <div>
            <h3 className="headerTitle">React Sneakers</h3>
            <p className="headerText">Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul  className="headerRight">
          <li className="headerList">
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