**Nxt-Trendz**

Modern e-commerce demo built with React. This repository contains a small storefront application showcasing product listing, searching and filtering, product details, authentication (via JWT cookie), and a shopping cart implemented using React Context and Local Storage.

**Summary**:
- **Purpose**: Learning / demo app that implements common e-commerce flows (login, product browsing, filtering, cart management).
- **Stack**: React (v19), React Router (v6), Context API, `js-cookie`, fetch-based API calls, and `react-loader-spinner` for loading states.

**Quick Links**
- **Source**: `./src`
- **Main entry**: `./src/index.js`
- **App root**: `./src/App.js`

**Getting Started**

Prerequisites:
- Node.js (>=16 recommended) and npm installed.

Install dependencies:

```
npm install
```

Run the development server:

```
npm start
```

Build for production:

```
npm run build
```

Run tests (if available):

```
npm test
```

**Available Scripts** (from `package.json`)
- `start`: Runs the app in development mode using `react-scripts start`.
- `build`: Bundles the app for production using `react-scripts build`.
- `test`: Starts the test runner.
- `eject`: Ejects `create-react-app` configuration.

**Tech Stack & Notable Dependencies**
- **React** 19 — UI library.
- **react-router-dom** 7.x — routing (App uses v6-style `Routes` + `Navigate`).
- **js-cookie** — cookie management for JWT token.
- **react-loader-spinner** — loading indicators.
- **react-icons** — optional iconography.

**Project Structure (high level)**
- `public/` — static HTML and manifest.
- `src/` — application source code.
  - `index.js` — application bootstrap (uses `createRoot` from `react-dom/client`).
  - `App.js` — top-level component: sets up `CartContext`, routing, and localStorage persistence for the cart.
  - `context/CartContext.js` — React Context containing cart API surface.
  - `components/` — reusable components and pages (see list below).

**High-level Architecture & Data Flow**
- Authentication: login form POSTs to `https://apis.ccbp.in/login`. On success the server returns a JWT which is stored as a cookie (`jwt_token`) using `js-cookie`.
- Routing: `react-router-dom` v6 used with `<Routes>` and `<Route element=.../>`. `ProtectedRoute` reads `jwt_token` and redirects to `/login` when absent.
- Product API: product listing is fetched from `https://apis.ccbp.in/products` with query params for sorting, category, search and rating. Authorization header uses the cookie token (`Bearer ${jwtToken}`).
- Cart state: maintained in `App.js` and provided via `CartContext`. Cart is synchronized to `localStorage` under the key `myCartList`.

**Key Components & Purpose**
- `Header` — top navigation and cart link.
- `LoginForm` — login page; stores `jwt_token` cookie and redirects on success.
- `Home` — landing page for logged-in users.
- `Products` — page that composes product sections.
  - `PrimeDealsSection` — highlighted products or deals.
  - `AllProductsSection` — full catalog with filtering, sorting, and search. Handles API calls, loading and error states.
  - `ProductCard` — individual product presentation and add-to-cart action.
- `ProductItemDetails` — product details page (fetched by id via route param).
- `Cart` — cart page; lists `CartItem`s and shows `CartSummary`.
  - `CartItem` — single cart row with increment/decrement and remove actions.
  - `CartSummary` — totals and checkout actions.
- `FiltersGroup` — UI for category, rating, and search filters used by `AllProductsSection`.
- `ProtectedRoute` — wrapper that checks for `jwt_token` cookie and redirects to `/login` if missing.

**State Management**
- Cart state is kept in top-level `App` as `this.state.cartList`. Actions provided via `CartContext`:
  - `addCartItem(product)`
  - `removeCartItem(id)`
  - `incrementCartItemQuantity(id)`
  - `decrementCartItemQuantity(id)`
  - `removeAllCartItems()`
- `App.updateCartListState` centralizes state updates and persists to `localStorage`.

**Authentication & Security Notes**
- JWT is stored in a cookie using `js-cookie`. `ProtectedRoute` validates presence of `jwt_token` cookie before allowing route access.
- For a production app:
  - Use HttpOnly, Secure cookies set from the server to mitigate XSS-based cookie theft.
  - Sanitize and validate all inputs, and use HTTPS for API calls.

**API Endpoints (used by app)**
- `POST https://apis.ccbp.in/login` — login endpoint that returns `jwt_token`.
- `GET https://apis.ccbp.in/products` — products list with query params: `sort_by`, `category`, `title_search`, `rating`.
- Product details endpoint: `GET https://apis.ccbp.in/products/:id` (used by `ProductItemDetails`).

**Testing**
- The repository contains the standard `create-react-app` test setup (`@testing-library/*`). Add unit and integration tests under `src/` as needed. Run `npm test` to start the test runner.

**Development Tips**
- React Router v6 changes: `Switch` -> `Routes`, `Redirect` -> `Navigate`, `component` prop replaced by `element` with JSX. The codebase already uses these patterns with adapter components (e.g., `ProtectedRoute` returns the component directly).
- If you change authentication behavior, update `ProtectedRoute` and the login flow accordingly.

**Contributing**
- Fork the repository, create a feature branch, and open a pull request with a clear description.
- Keep changes focused: update component-level CSS in `components/*` and avoid unrelated refactors in the same PR.

**License**
- No license specified. Add a `LICENSE` file if you want to open-source this repository (MIT, Apache-2.0, etc.).

**Contact / Author**
- Repository owner: `Md-suhail07-code` (project workspace maintained locally by `Md.Suhail`).

If you want, I can also:
- Add a short demo GIF or screenshots to this `README.md`.
- Add a `LICENSE` file (MIT template).
- Hook up GitHub Actions for CI (lint/test/build) and add a `CONTRIBUTING.md`.

---
Generated: automated project summary & README for `nxt-trendz`.
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
