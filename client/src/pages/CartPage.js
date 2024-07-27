import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => { 
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style:"currency",
                currency: "MAD",
            });
        } catch (error) {
            console.log(error);
            toast.error("There was an error in the total");
        }
    };
    //delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
           console.log(error);
           toast.error("There was an error in removing the item") 
        }
    };

    //get payment gateway Token
    const getToken = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/products/braintree/token`
            );
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error);
            toast.error("There was an error in payment")
        }
    };
    useEffect(() => {
        getToken();
    }, [auth?.token]);

    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const {nonce} = await instance.requestPaymentMethod();
            const {data} = await axios.post(
                `${process.env.REACT_APP_API}/api/products/braintree/payment`,{
                    nonce, 
                    cart,
                }
            );
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success("Payment Completed Successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
     return (
        <Layout title={"Cart page"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.firstname}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length
                                ? ` You have ${cart.length} items in you cart 
                                ${auth?.token ? "" : "You have to login first before you go to checkout"} `
                                : "Your cart is emty" 
                            }
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {
                            cart?.map((p) => (
                                <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                    <div className="col-md-4">
                                        <img 
                                            src={`${process.env.REACT_APP_API}/api/products/photoURL/${p?._id}`} 
                                            className="card-img-top" 
                                            alt={p.name}
                                            width="100px" 
                                            height={"100px"}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <h2>{p.name}</h2>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price: {p.price} MAD</p>
                                        <button 
                                            className="btn3 btn-danger"
                                            onClick={() => removeCartItem(p._id)}
                                            >
                                                Remove
                                        </button>
                                    </div>    
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                            <div className="mb-3">
                                <h4>Current Address</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button className="update-address-btn btn-outline-warning"
                                onClick={() => navigate('/dashboard/user/profile')}
                                >
                                    Update Address
                                </button>
                            </div>
                            </>
                        ): (
                            <div className="mb-3">
                                {
                                    auth?.token ? (
                                        <button 
                                            className="btn btn-outline-warning"  
                                            onClick={() => navigate('/dashboard/user/profile')}
                                        >
                                            Update Address
                                        </button>
                                    ) : (
                                        <button 
                                            className="btn btn-outline-warning" 
                                            onClick={() => navigate('/login', {
                                                state:"/cart",
                                        })
                                    }
                                    >
                                        Please Login To Checkout
                                    </button>
                                    )} 
                            </div>
                        )}
                        <div className="mt-2">
                            {
                                !clientToken || !cart?.length ? (""): (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal:{
                                                    flow:'vault',
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                            />
                                            <button 
                                                className="make-payment-btn btn-primary" 
                                                onClick={handlePayment}
                                                disabled={loading || !instance || !auth?.user?.address} 
                                            >
                                                { loading ? "Processing ..." : "Make Payment"} 
                                            </button>  
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div> 
        </Layout>
    );
};

export default CartPage;
