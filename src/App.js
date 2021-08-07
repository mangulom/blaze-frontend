import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import Orders from './pages/orders';
import UpdateOrders from './pages/update-orders';
import CreateOrders from './pages/create-orders';
import Products from './pages/products';

function App() {
  
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/orders' component={Orders} />
        <Route path='/products' component={Products} />
        <Route path='/update-orders/:_id' component={UpdateOrders} />
        <Route path='/create-orders' component={CreateOrders} />
      </Switch>
    </Router>
  );
}

export default App;
