/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './all-products'
export {default as SingleProduct} from './single-product'
export {default as ProductDetail} from './product-detail'
export {default as AllCategories} from './categories'
export {default as SingleCategory} from './single-category'
export {default as Cart} from './cart'
export {default as AllReviews} from './all-reviews'
export {default as ProductReviews} from './product-reviews'
export {default as AdminIndex} from './admin-index'
export {default as AdminProducts} from './admin-products'
export {default as AdminUsers} from './admin-users'
export {default as AdminOrders} from './admin-orders'
export {default as PasswordReset} from './password-reset'
