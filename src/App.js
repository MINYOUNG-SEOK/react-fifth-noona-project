import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const calculateTotalQuantity = () => {
    return Object.values(orders).reduce(
      (total, order) => total + order.quantity,
      0
    );
  };

  const updateQuantity = (size, quantity) => {
    const totalQuantity = calculateTotalQuantity();

    if (
      quantity >= 0 &&
      totalQuantity + (quantity - orders[size].quantity) <= 20
    ) {
      dispatch({
        type: "UPDATE_ORDER",
        payload: { size, quantity },
      });
    }
  };

  const calculateTotalPrice = () => {
    return Object.values(orders).reduce(
      (total, order) => total + order.quantity * order.price,
      0
    );
  };

  return (
    <div className="order-page">
      <div className="title-section">
        <h1 className="title">장바구니</h1>
      </div>

      {["Tall", "Grande", "Venti"].map((size) => (
        <div key={size} className="order-item">
          <div className="checkbox">
            <input type="checkbox" />
          </div>
          <div className="order-image">
            <img src="/img/coffee.jpg" alt="coffee" />
          </div>
          <div className="order-details">
            <p className="order-title">아이스 카페 아메리카노</p>
            <p className="order-subtitle">Iced Caffe Americano</p>
            <p className="order-size">ICED | {size}</p>
          </div>
          <div className="order-price">
            {orders[size].price.toLocaleString()}원
          </div>
          <div className="order-actions">
            <button
              onClick={() =>
                updateQuantity(size, Math.max(0, orders[size].quantity - 1))
              }
              className="quantity-btn"
            >
              -
            </button>
            <span className="quantity">{orders[size].quantity}</span>
            <button
              onClick={() => updateQuantity(size, orders[size].quantity + 1)}
              className="quantity-btn"
            >
              +
            </button>
          </div>
          <div className="order-total">
            {(orders[size].quantity * orders[size].price).toLocaleString()}원
          </div>
        </div>
      ))}

      <div className="total-section">
        <div className="total-summary">
          <span className="total-quantity">
            총 {calculateTotalQuantity()}개 / 20개
          </span>
          <span className="total-price">
            {calculateTotalPrice().toLocaleString()}원
          </span>
        </div>
        <button className="order-btn" disabled={calculateTotalQuantity() === 0}>
          주문하기
        </button>
      </div>
    </div>
  );
}

export default App;
