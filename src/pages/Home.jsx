import Card from '../components/Card';

function  Home ({
  items, 
  searchValue, 
  setSearchValue, 
  onChangeSearchInput, 
  onAddToFavorites, 
  onAddToCart}) {
    
  return(

    <div className="content">
        <div className="contentTitle">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Каталог"}</h1>
          <div className="searchBlock">
            {searchValue && 
            <img 
              onClick={() => setSearchValue("")} 
              className="imgRemove" 
              src="/img/btn-remove.svg"
              alt="Close" />}
            <img src="/img/search.svg" alt="Search" />
            <input 
              value={searchValue}
              onChange={onChangeSearchInput}
              placeholder="Поиск..." />
          </div>
        </div> 

        <div className="products">
          {items
          .filter(item => {
            return item.title.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map(item => 
          <Card 
          key={item.title}    
          onFavorite={(obj)=>onAddToFavorites(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          {...item}
          />)}
        </div>

    </div>
    )
}

export default Home;