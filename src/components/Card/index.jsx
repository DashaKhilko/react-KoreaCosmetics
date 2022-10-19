import { useState } from 'react';
import { useContext } from 'react';
import AppContext from '../../context';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.css';

function Card ({
  id, 
  title, 
  price, 
  image, 
  onFavorite, 
  onPlus, 
  loading=false,
  isFromFavorites=false
  }) {

  const {isItemAdded,isItemLiked} = useContext(AppContext);
  const obj = {id, parentId : id, title, price, image};

  const onClickFavorite = () => {
    onFavorite(obj);
   
  }
  const onClickPlus =() => {
    onPlus(obj);
  }
    return(
        <div className={styles.card}>
          {loading  
           ? <ContentLoader 
              speed={2}
              width={250}
              height={390}
              viewBox="0 0 250 390"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb">

              <rect x="1" y="0" rx="10" ry="10" width="250" height="240" /> 
              <rect x="0" y="270" rx="5" ry="5" width="250" height="20" />
              <rect x="0" y="300" rx="5" ry="5" width="150" height="20" /> 
              <rect x="1" y="365" rx="5" ry="5" width="100" height="25" /> 
              <rect x="218" y="358" rx="10" ry="10" width="32" height="32" /> 
            </ContentLoader>
          
            : <>
              
              <img className={styles.imageItem} width={250} height={250} src={image} alt="Products" />
              { onFavorite &&
                <div className={styles.favorite}>
                <img
                  onClick={onClickFavorite}
                  width={25}
                  height={23} 
                  src={isItemLiked(id, isFromFavorites) ? "img/liked.png" : "img/unliked.png"}  alt="Unliked" />
              </div>}
              <h5>{title}</h5>
                <div className={styles.cardBottom}>
                    <div className={styles.cardPrice}>
                      <span>Цена:</span>
                      <b>{price} руб.</b>
                    </div>
                    { onPlus && <img 
                    className={styles.imagePlus} 
                    onClick={onClickPlus} 
                    src={isItemAdded(id) ? "img/btn-cheked.svg" : "img/btn-plus.svg"} alt="Plus" />}
                </div> 
              </>
            }
          </div>
    )
}

export default Card; 

