import { useContext } from 'react';
import Card from '../components/Card'; 
import AppContext from '../context';
import Emptiness from '../components/Emptiness';

function Favorites () {

  const {favorites, onRemoveFavorites} = useContext(AppContext);

  return(

    <div className="content">
        <div className="contentTitle">
          <h1> Мои закладки </h1>
        </div> 
        <div>
          <div className="products">
          {favorites.map((item, index) => 
              <Card 
              key={index}
              onFavorite={onRemoveFavorites}
              isFromFavorites={true}
              {...item}
              />)}
          {!favorites.length && <Emptiness 
              title={"Вы ничего не добавляли в закладки"}
              image={"img/sad-emoticon1.svg"}/>}
          </div>
        </div>
    </div>
    )
}

export default Favorites;