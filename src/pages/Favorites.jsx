import { useContext } from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites () {

  const {favorites, onAddToFavorites} = useContext(AppContext);

  return(

    <div className="content">
        <div className="contentTitle">
          <h1> Мои закладки </h1>
        </div> 
        <div>
        <div className="products">
          {favorites.map(item => 
                <Card 
                key={item.id}    
                favorited={true}
                onFavorite={onAddToFavorites}
                {...item}
                />)}
        </div>
          
        </div>
    </div>
    )
}

export default Favorites;