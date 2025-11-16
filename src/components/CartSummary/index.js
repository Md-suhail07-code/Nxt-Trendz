import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(item => {
        total += item.price * item.quantity
      })
      return (
        <div className="cart-summary-cont">
          <div className="summ-head">
            <h1 className="order-head">Order Total: </h1>
            <h1 className="price-head"> Rs {total}/-</h1>
          </div>
          <p className="cart-length-para">{cartList.length} items in cart</p>
          <button type="button" className="check-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
