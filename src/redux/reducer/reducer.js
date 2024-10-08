const initialState = {
  orders: {
    IcedCaffeAmericano: { size: "Tall", quantity: 0, price: 4500 },
    IcedCaffeLatte: { size: "Tall", quantity: 0, price: 5000 },
    IcedLavenderBreve: { size: "Tall", quantity: 0, price: 7000 },
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_ORDER":
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.payload.menu]: {
            ...state.orders[action.payload.menu],
            quantity: action.payload.quantity,
          },
        },
      };
    default:
      return state;
  }
}

export default reducer;
