import Homepage from './Components/Homepage/Homepage';
import Checkout from './Components/Checkout/Checkout';

const routes = [
    {
      path:'/',
      name: 'Home Page',
      component: Homepage,
      exact: true,    
    },
    {
      path:'/checkout',
      name: 'Checkout',
      component: Checkout,
      exact: false,    
    },

  ]

  export default routes