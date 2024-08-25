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

  const updateQuantity = (menu, quantity) => {
    const totalQuantity = calculateTotalQuantity();

    if (
      quantity >= 0 &&
      totalQuantity + (quantity - orders[menu].quantity) <= 20
    ) {
      dispatch({
        type: "UPDATE_ORDER",
        payload: { menu, quantity },
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

      {[
        {
          key: "IcedCaffeAmericano",
          title: "아이스 카페 아메리카노",
          subtitle: "Iced Caffe Americano",
          image: "/img/coffee.jpg",
        },
        {
          key: "IcedCaffeLatte",
          title: "아이스 카페 라떼",
          subtitle: "Iced Caffe Latte",
          image: "/img/latte.jpg",
        },
        {
          key: "IcedLavenderCafeBreve",
          title: "아이스 라벤더 카페 브레베",
          subtitle: "Iced Lavender Cafe Breve",
          image: "/img/lavender.png",
        },
        {
          key: "GrapefruitMangoFrappuccino",
          title: "자몽 망고 프라푸치노",
          subtitle: "Grapefruit Mango Frappuccino",
          image: "/img/mango.jpg",
        },
      ].map((item) => (
        <div key={item.key} className="order-item">
          <div className="order-image">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="order-details">
            <p className="order-title">{item.title}</p>
            <p className="order-subtitle">{item.subtitle}</p>
            <p className="order-size">ICED | Tall</p>
          </div>
          <div className="order-price">
            {orders[item.key].price.toLocaleString()}원
          </div>
          <div className="order-actions">
            <button
              onClick={() =>
                updateQuantity(
                  item.key,
                  Math.max(0, orders[item.key].quantity - 1)
                )
              }
              className="quantity-btn"
            >
              -
            </button>
            <span className="quantity">{orders[item.key].quantity}</span>
            <button
              onClick={() =>
                updateQuantity(item.key, orders[item.key].quantity + 1)
              }
              className="quantity-btn"
            >
              +
            </button>
          </div>
          <div className="order-total">
            {(
              orders[item.key].quantity * orders[item.key].price
            ).toLocaleString()}
            원
          </div>
        </div>
      ))}

      <div className="total-section">
        <div className="total-summary">
          <span className="total-quantity">
            총 {calculateTotalQuantity()}개 / 20개
            <p className="max-order-warning">최대 20개까지 주문 가능합니다.</p>
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
