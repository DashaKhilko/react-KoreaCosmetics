import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './context';

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
          <Route path="/react-KoreaCosmetics/" element={<Home 
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
