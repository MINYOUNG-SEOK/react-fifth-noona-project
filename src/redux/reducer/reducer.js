const initialState = {
  orders: {
    Tall: { quantity: 0, price: 4500 },
    Grande: { quantity: 0, price: 5300 },
    Venti: { quantity: 0, price: 6100 },
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_ORDER":
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.payload.size]: {
            ...state.orders[action.payload.size],
            quantity: action.payload.quantity,
          },
        },
      };
    default:
      return state;
  }
}

export default reducer;
