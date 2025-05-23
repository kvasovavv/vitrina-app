import BasketItem from './BasketItem';
import { VB_TO_RUB } from '../config';

function BasketList({
  order = [],
  handleBasketShow = Function.prototype,
  removeFromBasket = Function.prototype,
  incQuantity = Function.prototype,
  decQuantity = Function.prototype,
}) {
  const totalPrice = order.reduce((sum, item) => {
    return sum + item.price.finalPrice * item.quantity * VB_TO_RUB;
  }, 0);

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1050,
      }}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        style={{ maxWidth: '700px' }}
      >
        <div className="modal-content rounded-4 shadow-lg">
          <div className="modal-header bg-dark text-white rounded-top-4">
            <h5 className="modal-title">🛒 Корзина</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Закрыть"
              onClick={handleBasketShow}
            ></button>
          </div>
          <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {order.length ? (
              order.map((item) => (
                <BasketItem
                  key={item.mainId}
                  {...item}
                  removeFromBasket={removeFromBasket}
                  incQuantity={incQuantity}
                  decQuantity={decQuantity}
                />
              ))
            ) : (
              <p className="text-center text-muted">Корзина пуста</p>
            )}
          </div>
          <div className="modal-footer justify-content-between">
            <strong>Итого: {totalPrice.toFixed(0)} ₽</strong>
            <button className="btn btn-secondary" onClick={handleBasketShow}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketList;