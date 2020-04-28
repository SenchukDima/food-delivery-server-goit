const mainRoute = require('../db/main/main');
const productsRoute = require('../db/products/products');
const signUpRoute = require('../db/signup/signup');


const router = {
    '/': mainRoute,
    '/products': productsRoute,
    '/signup': signUpRoute,
    default: mainRoute
}

module.exports = router;