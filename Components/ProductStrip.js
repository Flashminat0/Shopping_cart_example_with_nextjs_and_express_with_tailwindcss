import React, {useEffect, useState} from 'react';
import axios from "axios";


const ProductStrip = ({title}) => {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/api/load-product')
            .then(res => {
                setProducts(res.data.products);
            })
    }, []);


    const addProductToShoppingCart = (productId) => {
        console.log(productId);

        //TODO remove this in sprint 2
        let userId = "625ba245615947ebd82537de";
        axios.post('http://localhost:8000/api/add-product-shopping-cart-user', {
            userId: userId,
            productId: productId
        })
            .then(res => {
                console.log(res.data);
            })
        console.log('add product to shopping cart');
    };

    return (
        <div>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{title}</h2>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product, idx) => (
                            <div key={product._id}>
                                <div  className="group relative">
                                    <div
                                        className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <img
                                            src={product.image}
                                            alt={""}
                                            className="w-full h-full object-center object-cover lg:w-full lg:h-full hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                                <div className={'grid place-items-center pt-2'}>
                                    <button
                                        onClick={() => addProductToShoppingCart(product._id)}
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Buy one {product.name} for {product.price}$
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductStrip;
