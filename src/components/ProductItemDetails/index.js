import {Component} from 'react'
// ⚠️ CHANGED: Add Navigate for v6 and useParams hook for data fetching
import {Link, useNavigate, useParams} from 'react-router-dom' 
import Cookies from 'js-cookie'
// ⚠️ CHANGED: Import the specific loader component (ThreeDots)
import {ThreeDots} from 'react-loader-spinner' 
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import CartContext from '../../context/CartContext'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// ⚠️ MODIFIED: The component now expects params and navigate from props via the HOC
class ProductItemDetails extends Component {
  state = {
    productData: {},
    similarProductsData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductData()
  }
  
  // ⚠️ ADDED: To refetch data if component props change (e.g., navigating to a similar product)
  componentDidUpdate(prevProps) {
    const {params} = this.props
    if (prevProps.params.id !== params.id) {
      this.getProductData()
    }
  }

  getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  getProductData = async () => {
    // ⚠️ CHANGED: Get id from this.props.params (injected by HOC)
    const {params} = this.props 
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedSimilarProductsData = fetchedData.similar_products.map(
        eachSimilarProduct => this.getFormattedData(eachSimilarProduct),
      )
      this.setState({
        productData: updatedData,
        similarProductsData: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    // ⚠️ CHANGED: If status is 404 AND we are using a ProtectedRoute structure, 
    // it's safer to check for unauthorized access first.
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    } else if (response.status === 401) {
        // Handle unauthorized access if necessary, though ProtectedRoute should handle this
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      {/* ⚠️ CHANGED: Use ThreeDots component directly */}
      <ThreeDots color="#0b69ff" height={50} width={50} /> 
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {productData, quantity, similarProductsData} = this.state
        const {
          availability,
          brand,
          description,
          imageUrl,
          price,
          rating,
          title,
          totalReviews,
        } = productData
        const {addCartItem} = value
        const onClickAddToCart = () => {
          // ensure 'quantity' is passed to the cart item
          addCartItem({...productData, quantity})
        }

        return (
          <div className="product-details-success-view">
            {/* ... rest of the JSX remains the same ... */}
            <div className="product-details-container">
              <img src={imageUrl} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">{title}</h1>
                <p className="price-details">Rs {price}/-</p>
                <div className="rating-and-reviews-count">
                  <div className="rating-container">
                    <p className="rating">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p className="reviews-count">{totalReviews} Reviews</p>
                </div>
                <p className="product-description">{description}</p>
                <div className="label-value-container">
                  <p className="label">Available:</p>
                  <p className="value">{availability}</p>
                </div>
                <div className="label-value-container">
                  <p className="label">Brand:</p>
                  <p className="value">{brand}</p>
                </div>
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                    data-testid="minus"
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                    data-testid="plus"
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <h1 className="similar-products-heading">Similar Products</h1>
            <ul className="similar-products-list">
              {similarProductsData.map(eachSimilarProduct => (
                // When SimilarProductItem is clicked, it navigates to a new URL, 
                // triggering a re-render of this component and componentDidUpdate
                <SimilarProductItem
                  productDetails={eachSimilarProduct}
                  key={eachSimilarProduct.id}
                  // It's good practice to pass the navigate function if the child needs it
                  // navigate={this.props.navigate} 
                />
              ))}
            </ul>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

// ⚠️ ADDED: HOC to inject v6 hooks (params and navigate) into the Class Component
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate()
    const params = useParams()
    return <Component {...props} navigate={navigate} params={params} />
  }

  return ComponentWithRouterProp
}

// ⚠️ CHANGED: Export the wrapped component
export default withRouter(ProductItemDetails)