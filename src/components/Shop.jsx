import { useEffect, useState } from 'react';
import Cart from './Cart';
import BasketList from './BasketList';
import Alert from './Alert';
import { API_URL, API_KEY, VB_TO_RUB } from '../config';



function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    useEffect(() => {
        fetch(API_URL, {
        headers: {
            Authorization: API_KEY,
        },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.shop) {
            setGoods(data.shop);
            }
            setLoading(false);
        })
        .catch((err) => {
            console.error('Ошибка при загрузке товаров:', err);
            setLoading(false);
        });
    }, []);

    const addToBasket = (item) => {
        const itemIndex = order.findIndex((el) => el.mainId === item.mainId);

        if (itemIndex < 0) {
        const newItem = {
            ...item,
            quantity: 1,
        };
        setOrder([...order, newItem]);
        } else {
        const newOrder = order.map((el, index) => {
            if (index === itemIndex) {
            return {
                ...el,
                quantity: el.quantity + 1,
            };
            } else {
            return el;
            }
        });
        setOrder(newOrder);
        }

        setAlertName(item.displayName); // показать уведомление
    };

    const removeFromBasket = (itemId) => {
        setOrder(order.filter((item) => item.mainId !== itemId));
    };

    const incQuantity = (itemId) => {
        const newOrder = order.map((el) => {
        if (el.mainId === itemId) {
            return { ...el, quantity: el.quantity + 1 };
        }
        return el;
        });
        setOrder(newOrder);
    };

    const decQuantity = (itemId) => {
        const newOrder = order.map((el) => {
        if (el.mainId === itemId) {
            return { ...el, quantity: el.quantity > 1 ? el.quantity - 1 : 1 };
        }
        return el;
        });
        setOrder(newOrder);
    };

    const closeAlert = () => {
        setAlertName('');
    };

    return (
        <main className="container my-4 position-relative">
        <Cart
            quantity={order.reduce((acc, item) => acc + item.quantity, 0)}
            handleBasketShow={() => setBasketShow(!isBasketShow)}
        />

        {isBasketShow && (
            <BasketList
            order={order}
            handleBasketShow={() => setBasketShow(false)}
            removeFromBasket={removeFromBasket}
            incQuantity={incQuantity}
            decQuantity={decQuantity}
            />
        )}

        {alertName && <Alert name={alertName} closeAlert={closeAlert} />}

        <h2>Магазин </h2>
        {loading ? (
            <h5>Загрузка товаров...</h5>
        ) : (
            <div className="row">
            {goods.length > 0 ? (
                goods.map((item) => (
                <div className="col-md-4 mb-4" key={item.mainId}>
                    <div className="card h-100">
                    <img
                        src={item.displayAssets[0]?.url}
                        className="card-img-top"
                        alt={item.displayName}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{item.displayName}</h5>
                        <p className="card-text">
                        Цена: {(item.price.finalPrice * VB_TO_RUB).toFixed(0)} ₽
                        </p>
                        <button
                        className="btn custom-buy-button" back
                        onClick={() => addToBasket(item)}
                        >
                        Купить
                        </button>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <p>Нет доступных товаров</p>
            )}
            </div>
        )}
        </main>
    );
}

export default Shop;