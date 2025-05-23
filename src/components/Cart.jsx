function Cart({ quantity = 0, handleBasketShow = Function.prototype }) {
    return (
        <div
        className="cart position-fixed top-0 end-0 m-3 bg-light p-2 rounded shadow"
        style={{ cursor: 'pointer', zIndex: 1000 }}
        onClick={handleBasketShow}
        >
        🛒 Корзина {quantity ? <span className="badge bg-danger">{quantity}</span> : null}
        </div>
    );
}

export default Cart;