import Card from '../components/Card';
import { useContext } from 'react';
import AppContext from '../context';


function  Home ({onChangeSearchInput, setSearchValue, searchValue}) {
  const {items, onAddToFavorites, onAddToCart, isLoading} = useContext(AppContext);
  
  const renderItems = () => {
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(9)] : filteredItems).map((item, index) => (
          <Card 
          key={index}    
          onFavorite={(obj)=>onAddToFavorites(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
          {...item}
          />))
    }
    return(

    <div className="content">
        <div className="contentTitle">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Каталог"}</h1>
          <div className="searchBlock">
            {searchValue && 
            <img 
              onClick={() => setSearchValue("")} 
              className="imgRemove" 
              src="img/btn-remove.svg"
              alt="Close" />}
            <img src="img/search.svg" alt="Search" />
            <input 
              value={searchValue}
              onChange={onChangeSearchInput}
              placeholder="Поиск..." />
          </div>
        </div> 

        <div className="products">
          {renderItems()}
        </div>

    </div>
    )
}

export default Home;