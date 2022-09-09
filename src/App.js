import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

// [
//   {
//    "id": 1,
//    "title": "Лифтинг-сыворотка с черным трюфелем BUENO Hydro Volume Lift Serum - 40 мл",
//    "price": 119.59,
//    "image": "/img/products/1.jpg"
//   },
//   {
//    "id": 2,
//    "title": "Филлер для восстановления волос LADOR Perfect Hair Fill-Up - 150 ml",
//    "price": 49.99,
//    "image": "/img/products/2.jpg"
//   },
//   {
//    "id": 3,
//    "title": "Шампунь от выпадения волос для сухой кожи RYO Hair Loss Care Shampoo Normal Dry Scalp - 400 мл",
//    "price": 56.99,
//    "image": "/img/products/3.jpg"
//   },
//   {
//    "id": 4,
//    "title": "Сыворотка-автобронзатор для лица St.Moriz Advanced Pro Formula Tan Boosting Facial Serum - 15мл",
//    "price": 86.15,
//    "image": "/img/products/4.jpg"
//   },
//   {
//    "id": 5,
//    "title": "Охлаждающая маска-носочки для ног EVAS Bordo Cooling Leg Mask - 20гр",
//    "price": 12.65,
//    "image": "/img/products/5.jpg"
//   },
//   {
//    "id": 6,
//    "title": "Гидрогелевые патчи с экстрактом розы Medi-Peel Hyaluron Rose Peptide 9 Ampoule Eye Patch - 60шт",
//    "price": 135.99,
//    "image": "/img/products/6.jpg"
//   },
//   {
//    "id": 7,
//    "title": "Лифтинг-патчи для глаз с протеинам шелка JMsolution Water Luminous Golden Cocoon Eye Mask Black - 4мл",
//    "price": 5.59,
//    "image": "/img/products/7.jpg"
//   },
//   {
//    "id": 8,
//    "title": "Эссенция для волос ELIZAVECCA Cer-100 Milky Piggy Collagen Coating Protein Ion Injection - 50 мл",
//    "price": 32.69,
//    "image": "/img/products/8.jpg"
//   },
//   {
//    "id": 9,
//    "title": "Шампунь с яблочным уксусом MASIL 5 Probiotics Apple Vinegar Shampoo - 500ml",
//    "price": 69.79,
//    "image": "/img/products/9.jpg"
//   },
//   {
//    "id": 10,
//    "title": "Черная маска-пенка ELIZAVECCA Hell-Pore Bubble Blackboom Pore Pack - 150 мл",
//    "price": 49.99,
//    "image": "/img/products/10.jpg"
//   },
//   {
//    "id": 11,
//    "title": "Охлаждающий спрей для ног EVAS Bordo Cool Mint Cooling Foot Spray - 150 мл",
//    "price": 27.85,
//    "image": "/img/products/11.jpg"
//   },
//   {
//    "id": 12,
//    "title": "Яблочный пилинг-гель MIZON Apple Smoothie Peeling Gel - 120 мл",
//    "price": 34.99,
//    "image": "/img/products/12.jpg"
//   }
//  ]


   
function App() {
  const[items, setItems] = useState([]);
  const[cartItems, setCartItems] = useState([]);
  const[favorites, setFavorites] = useState([]);
  const[searchValue, setSearchValue] = useState("");
  const[cartOpened, setCartOpened] = useState(false);
  const[isLoading, setIsLoading] = useState(true);


  useEffect(() => {
   async function fetchData () {
  
    const cartResponse = await axios.get('https://6317427ecb0d40bc41506c4e.mockapi.io/cart');
    const favoritesResponse = await axios.get('https://6317427ecb0d40bc41506c4e.mockapi.io/favorites');
    const itemsResponse = await axios.get('https://6317427ecb0d40bc41506c4e.mockapi.io/items');
    
    setIsLoading(false);

    setCartItems(cartResponse.data);
    setFavorites(favoritesResponse.data);
    setItems(itemsResponse.data);;
  }

  fetchData ();

}, [])



  const onAddToCart = (obj) => {
    try{
      if (cartItems.find(cartObj => Number(cartObj.id) === Number(obj.id))) {
        axios.delete(`https://6317427ecb0d40bc41506c4e.mockapi.io/cart/${obj.id}`)
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id))) 
      } else {
        axios.post('https://6317427ecb0d40bc41506c4e.mockapi.io/cart', obj)
        setCartItems(prev => [...prev, obj])}
      }
      catch(error)   {
        alert('Не удалось добавить в корзину')
      }
    }

  const onRemoveCart = (id) => {
    axios.delete(`https://6317427ecb0d40bc41506c4e.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }
 

  const onAddToFavorites = async (obj) => {
    try{
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://6317427ecb0d40bc41506c4e.mockapi.io/favorites/${obj.id}`)
      } else {
        const {data} = await axios.post('https://6317427ecb0d40bc41506c4e.mockapi.io/favorites', obj)
        setFavorites(prev => [...prev, data])}
      }
      catch(error)   {
        alert('Не удалось добавить в фаворит')
      }
  }
    

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper">
      
      {cartOpened && 
      <Drawer 
        items = {cartItems} 
        onRemoveCart={onRemoveCart}
        onClose={() => setCartOpened(false)} />}
      
      <Header onClickCart={() => setCartOpened(true)}/>
       
      <Routes>
        <Route  path="/"  element={
          <Home   
            items={items}
            cartItems={cartItems}
            searchValue={searchValue} 
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorites={onAddToFavorites}
            onAddToCart={onAddToCart}
            isLoading={isLoading}/>}
        />                
      </Routes> 

      <Routes>
        <Route  path="/favorites"  element={
          <Favorites 
            items = {favorites} 
            onAddToFavorites={onAddToFavorites}
          />}
        />                
      </Routes> 
              
    </div>
  );
}

export default App;
