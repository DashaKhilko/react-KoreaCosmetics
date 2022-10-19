import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './context';

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
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://6317427ecb0d40bc41506c4e.mockapi.io/cart'),
          axios.get('https://6317427ecb0d40bc41506c4e.mockapi.io/favorites'),
          axios.get('https://6317427ecb0d40bc41506c4e.mockapi.io/items'),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных :(');
        console.error(error);
      }
    }
    fetchData();
  }, []);


  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((cartObj) => Number(cartObj.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((cartObj) => Number(cartObj.parentId) !== Number(obj.id)));
        await axios.delete(`https://6317427ecb0d40bc41506c4e.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://6317427ecb0d40bc41506c4e.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((cartObj) => {
            if (cartObj.parentId === data.parentId) {
              return {
                ...cartObj,
                id: data.id,
              };
            }
            return cartObj;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };


  const onRemoveCart = (id) => {
    try {
      axios.delete(`https://6317427ecb0d40bc41506c4e.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };


  const onAddToFavorites = async (obj) => {
    try {
      const findItem = favorites.find((favObj) => Number(favObj.parentId) === Number(obj.id));
      if (findItem) {
      setFavorites((prev) => prev.filter((favObj) => Number(favObj.parentId) !== Number(obj.id)));
      await axios.delete(`https://6317427ecb0d40bc41506c4e.mockapi.io/favorites/${findItem.id}`);
      } else {
        setFavorites((prev) => [...prev, obj]);
        const { data } = await axios.post('https://6317427ecb0d40bc41506c4e.mockapi.io/favorites', obj);
        setFavorites((prev) =>
        prev.map((favObj) => {
          if (favObj.parentId === data.parentId) {
            return {
              ...favObj,
              id: data.id,
            };
          }
          return favObj;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в закладки');
      console.error(error);
    }
  };


  const onRemoveFavorites = (obj) => {
    try {
      axios.delete(`https://6317427ecb0d40bc41506c4e.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } catch (error) {
      alert('Ошибка при удалении из закладок');
      console.error(error);
    }
  };


  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };


  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };


  const isItemLiked = (id, fromFavs) => {
    return fromFavs ? fromFavs : favorites.some((obj) => Number(obj.parentId) === Number(id));
  };


  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isLoading,
        isItemLiked,
        isItemAdded,
        onAddToFavorites,
        onRemoveFavorites,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper">
        <Drawer
          items={cartItems}
          onRemoveCart={onRemoveCart}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/react-KoreaCosmetics" element={<Home 
              onChangeSearchInput={onChangeSearchInput} 
              setSearchValue={setSearchValue} 
              searchValue={searchValue} />}
          />
        </Routes>

        <Routes>
          <Route path="/react-KoreaCosmetics/favorites" element={<Favorites />}
          />
        </Routes>

        <Routes>
          <Route path="/react-KoreaCosmetics/orders" element={<Orders />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
