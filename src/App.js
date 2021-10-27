import React from "react";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AdminContext } from './AdminContext';
import { getRole, storeRole,getCart, storeCart } from './helpers';
import SingleProduct from './pages/SingleProduct';
import Home from './pages/Home';
// import Loader from './pages/Loader';
import addProducts from './pages/addProducts';
import Payments from './pages/Admin/Payments';
import ProductsList from './pages/Admin/ProductsList';
import Message from './pages/Admin/Message';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Footer from './components/Footer';
import DeleteModal from './components/DeleteModal';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import { CartContext } from './CartContext';
import { RefundPolicy } from "./pages/RefundPolicy";
import { Terms } from "./pages/Terms";
import Contact from "./components/Contact";
import UpdateProfile from './pages/UpdateProfile';

const App = () => { 
    let temp;
    const [ role, setRole ] = useState('customer');
    const [ cart, setCart ] = useState({});

    // Fetch cart from local storage
    useEffect(() => {
        getCart().then(cart => {
        temp = JSON.parse(cart);
        setCart(temp);
    
        });
        // setCart(temp);
    
        getRole().then(role => {
            setRole(role);
        });

    }, []);

    useEffect(() => {
        storeRole(role);
    }, [role]);
    
    useEffect(() => {
        storeCart(JSON.stringify(cart));
        // console.log(JSON.stringify(cart))
    }, [cart]);



   return (
        <>

            <Router>
                {/* <CartContext.Provider value={{ cart, setCart }}> */}
                <AdminContext.Provider value={{ role, setRole }}>
                <CartContext.Provider value={{ cart, setCart }}>

                    <NavBar  />
                    <Switch>
                            <Route path="/" component={Home} exact></Route>
                            <Route path="/admin/addproducts" component={addProducts} exact></Route>
                            <Route path="/admin/payments" component={Payments} exact></Route>
                            <Route path="/admin/messages" component={Message} exact></Route>
                            <Route path="/admin/analytics" component={Admin} exact></Route>
                            <Route path="/admin/products" component={ProductsList} exact></Route>
                            <Route path="/admin" component={Admin} exact></Route>
                            {/* <Route path="/loader" component={Loader} exact></Route> */}
                            <Route path="/dashboard" component={Dashboard} exact></Route>
                            <Route path="/login" component={Login} exact></Route>
                            <Route path="/register" component={Register} exact></Route>
                            <Route path="/error" component={DeleteModal} exact></Route>
                            <Route path="/products/:_id" component={SingleProduct}></Route>
                            <Route path="/cart" component={Cart} exact></Route>
                            <Route path="/updateprofile" component={UpdateProfile} exact></Route>
                            <Route path="/terms" component={Terms} exact></Route>
                            <Route path="/RefundPolicy" component={RefundPolicy} exact></Route>
                            <Route path="/support" component={Contact} exact></Route>
                            {/* <Route path="/products/:_id" component={SingleProduct}></Route> */}
                            <Route component={NotFound} />
                    </Switch>
                </CartContext.Provider>
                </AdminContext.Provider>

                    <Footer/>
            
            </Router>
        </>
    )
}

export default App;