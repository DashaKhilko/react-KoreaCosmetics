import { useState } from "react";
import styles from './Card.module.css';

function Card ({id, title, price, image, onFavorite, onPlus, favorited=false}) {
  const[isAdded, setIsAdded] = useState(false);
  const[isFavorite, setIsFavorite] = useState(favorited);

  const onClickFavorite = () => {
    onFavorite({id, title, price, image});
    setIsFavorite(!isFavorite)
  }
  const onClickPlus =() => {
    onPlus({title, price, image});
    setIsAdded(!isAdded);
  }
    return(
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                width={25}
                height={23} 
                src={isFavorite ? "/img/liked.png" : "/img/unliked.png"}  alt="Unliked" />
            </div>
            <img className={styles.imageItem} width={250} height={250} src={image} alt="Products" />
            <h5>{title}</h5>
              <div className={styles.cardBottom}>
                  <div className={styles.cardPrice}>
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                  </div>
                  <img 
                  className={styles.imagePlus} 
                  onClick={onClickPlus} 
                  src={isAdded ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"} alt="Plus" />
              </div>
          </div>
    )
}

export default Card; 

