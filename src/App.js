import './App.css';
import { useState, useEffect } from "react";
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

   
function App() {
  const[items, setItems] = useState([]);
  const[cartItems, setCartItems] = useState([]);
  const[cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch('https://6317427ecb0d40bc41506c4e.mockapi.io/items')
    .then(response => response.json()) 
    .then(json => setItems(json))
  }, [])

  const onAddToCart = (obj) => {
    if (cartItems.title !== obj.title) {
    setCartItems(prev => [...prev, obj])}
  }

  return (
    <div className="wrapper">
      {cartOpened && <Drawer items = {cartItems} onClose={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)}/>
      <div className="content">
        <div className="contentTitle">
          <h1>Каталог</h1>
          <div className="searchBlock">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>        
        <div className="products">
          {items.map(item => <Card 
          title={item.title} 
          price={item.price} 
          image={item.image}
          onFavorite={()=>console.log('Добавили в закладки')}
          onPlus={(obj) => onAddToCart(obj)}
          />)}
        </div>
      </div>
    </div>
  );
}

export default App;
