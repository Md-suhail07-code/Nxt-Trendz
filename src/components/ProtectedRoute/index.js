import {Navigate} from 'react-router-dom'
import Cookie from 'js-cookie'

// NOTE: In React Router v6, this component is typically rendered inside 
// the 'element' prop of the main <Route> component (see App.js).
const ProtectedRoute = (props) => {
  const {component: Component, ...rest} = props
  const token = Cookie.get('jwt_token')

  // If the token is not present, use the Navigate component to redirect
  if (token === undefined) {
    return <Navigate to="/login" replace />
  }

  // If the token is present, render the protected component directly.
  // We use the destructured 'Component' prop (which is the actual page component, 
  // like Home or Products) and pass all remaining props.
  return <Component {...rest} />
}

export default ProtectedRoute