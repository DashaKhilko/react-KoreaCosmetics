import Card from '../components/Card';

function  Home ({
  items, 
  cartItems,
  searchValue, 
  setSearchValue, 
  onChangeSearchInput, 
  onAddToFavorites, 
  onAddToCart,
  isLoading}) {
    

  const renderItems = () => {
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? Array(9).fill({}) : filteredItems).map(item => (
          <Card 
          key={item.title}    
          onFavorite={(obj)=>onAddToFavorites(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
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
          {renderItems()}
        </div>

    </div>
    )
}

export default Home;