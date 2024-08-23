import React, { useReducer } from 'react';
import './Cartform.css'; 
import image1 from './armni.jpg';
import image2 from './bsshirt.jpg';
import image3 from './gucc.jpg';
import image4 from './pteng.jpg';
import image5 from './tomhil.jpg'


const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  CHANGE_QUANTITY: 'CHANGE_QUANTITY',
  REMOVE_ITEM: 'REMOVE_ITEM',
};

const initialState = [
  { id: 1, name: 'Peter England Shirt', rate: 1000, quantity: 0 },
  { id: 2, name: 'Basics Shirt', rate: 1100, quantity: 0 },
  { id: 3, name: 'Tommy Hilfiger pant', rate: 1900, quantity: 0 },
  { id: 4, name: 'Gucci pant', rate: 3200, quantity: 0 },
  { id: 5, name: 'Armani T-shirts', rate: 1800, quantity: 0 },
];

const cartReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return state.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case ActionTypes.DECREMENT:
      return state.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    case ActionTypes.CHANGE_QUANTITY:
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Number(action.payload.quantity) }
          : item
      );
    case ActionTypes.REMOVE_ITEM:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

const CartForm = () => {
  const [items, dispatch] = useReducer(cartReducer, initialState);

  const incrementQuantity = (id) => {
    dispatch({ type: ActionTypes.INCREMENT, payload: id });
  };

  const decrementQuantity = (id) => {
    dispatch({ type: ActionTypes.DECREMENT, payload: id });
  };

  const handleChange = (e, id) => {
    const { value } = e.target;
    dispatch({ type: ActionTypes.CHANGE_QUANTITY, payload: { id, quantity: value } });
  };

  const handleRemove = (id) => {
    dispatch({ type: ActionTypes.REMOVE_ITEM, payload: id });
  };

  const calculateTotal = (quantity, rate) => {
    return quantity * rate;
  };

  const getTotalAmount = () => {
    return items.reduce((total, item) => total + calculateTotal(item.quantity, item.rate), 0);
  };

  return (
    <div>
      <h1>E-commerce Cart</h1>
      <div className='img'>
      <img src={image1}></img>
      <img src={image2}></img>
      <img src={image3}></img>
      <img src={image4}></img>
      <img src={image5}></img>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.rate}</td>
              <td>
                <button onClick={() => decrementQuantity(item.id)}>-</button>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleChange(e, item.id)}
                  min="1"
                />
                <button onClick={() => incrementQuantity(item.id)}>+</button>
              </td>
              <td>{calculateTotal(item.quantity, item.rate)}</td>
              <td>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total Amount: ₹{getTotalAmount()}</h2>
    </div>
  );
};

export default CartForm;
