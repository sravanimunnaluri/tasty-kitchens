import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

import Cart from './components/Cart'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import RestaurantCardDetails from './components/RestaurantCardDetails'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute
      exact
      path="/"
      component={() => <Home sortByOptions={sortByOptions} />}
    />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantCardDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)
export default App
