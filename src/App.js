import {Component} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom' 
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

// Key for Local Storage
const cartListStorageKey = 'myCartList'

class App extends Component {
  constructor(props) {
    super(props)
    // 1. Retrieve cartList from Local Storage on initialization
    const storedCartList = localStorage.getItem(cartListStorageKey)
    this.state = {
      cartList: storedCartList ? JSON.parse(storedCartList) : [],
    }
  }

  // Helper function to update state and Local Storage
  updateCartListState = (newState, callback) => {
    this.setState(newState, () => {
      // 2. Update Local Storage after state is updated
      localStorage.setItem(
        cartListStorageKey,
        JSON.stringify(this.state.cartList),
      )
      if (callback) {
        callback()
      }
    })
  }

  removeAllCartItems = () => {
    this.updateCartListState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updateCartList = cartList.filter(list => list.id !== id)
    this.updateCartListState({cartList: updateCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })
    this.updateCartListState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(list => list.id === id)
    if (item.quantity === 1) {
      this.removeCartItem(id)
    } else {
      const updatedCartList = cartList.map(list => {
        if (list.id === id) {
          return {...list, quantity: list.quantity - 1}
        }
        return list
      })
      this.updateCartListState({cartList: updatedCartList})
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const existingItem = cartList.find(item => item.id === product.id)
    if (existingItem) {
      const updatedCartList = cartList.map(item => {
        if (item.id === product.id) {
          return {...item, quantity: item.quantity + product.quantity}
        }
        return item
      })
      this.updateCartListState({cartList: updatedCartList})
    } else {
      this.updateCartListState(prevState => ({
        cartList: [
          ...prevState.cartList,
          {...product, quantity: product.quantity || 1},
        ],
      }))
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        {/* ⚠️ CHANGED: Switch is replaced by Routes */}
        <Routes>
          {/* ⚠️ CHANGED: component prop is replaced by the element prop, which takes JSX */}
          <Route path="/login" element={<LoginForm />} />
          
          {/* ProtectedRoute component must now render its component via the element prop */}
          <Route exact path="/" element={<ProtectedRoute component={Home} />} />
          <Route exact path="/products" element={<ProtectedRoute component={Products} />} />
          <Route
            exact
            path="/products/:id"
            element={<ProtectedRoute component={ProductItemDetails} />}
          />
          <Route exact path="/cart" element={<ProtectedRoute component={Cart} />} />
          
          <Route path="/not-found" element={<NotFound />} />
          
          {/* ⚠️ CHANGED: Redirect to="not-found" is replaced by a catch-all Route and Navigate */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </CartContext.Provider>
    )
  }
}

export default App