function BasketItem({
  mainId,
  displayName,
  price,
  quantity,
  removeFromBasket,
  incQuantity,
  decQuantity
}) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>{displayName}</span>
      <span>
        <button onClick={() => decQuantity(mainId)} className="btn btn-outline-secondary btn-sm mx-1">-</button>
        <strong>{quantity}</strong>
        <button onClick={() => incQuantity(mainId)} className="btn btn-outline-secondary btn-sm mx-1">+</button>
      </span>
      <span>{(price.finalPrice * quantity).toFixed(0)} ₽</span>
      <button className="btn btn-danger btn-sm" onClick={() => removeFromBasket(mainId)}>×</button>
    </li>
  );
}

export default BasketItem;