import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import AppContext from '../context';
import Card from '../components/Card';

function Orders () {
    
    const {onAddToCart, onAddToFavorites} = useContext(AppContext);
    const[orders, setOrders] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        (async () => {   
           try {
            const {data} = await axios.get('https://6317427ecb0d40bc41506c4e.mockapi.io/orders');
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
            setIsLoading(false);
            } catch (error) {
            alert('Ошибка при запросе заказов');
            console.error(error);
           }
        })();
    }, []);

    return(

    <div className="content">
        <div className="contentTitle">
            <h1> Мои заказы </h1>
        </div> 
        <div>
            <div className="products">
            {(isLoading ? Array(6).fill({}) : orders).map(item => 
                    <Card 
                        key={item.title}    
                        loading={isLoading}
                        {...item}
                    />)}
            </div>
          
        </div>
    </div>
    )
}

export default Orders;