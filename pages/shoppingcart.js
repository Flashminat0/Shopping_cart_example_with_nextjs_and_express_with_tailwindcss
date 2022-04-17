import React, {useEffect, useState} from 'react';
import {
    CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon as XIconSolid, ChevronLeftIcon, ChevronRightIcon
} from '@heroicons/react/solid'
import axios from "axios";
import {useRouter} from "next/router";

const products = [{
    id: 1,
    name: 'PopCorn',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc: 'https://i.pinimg.com/originals/97/b5/aa/97b5aa3c6eb75eddf20fc48976679152.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
}, {
    id: 2,
    name: 'Dingdong',
    href: '#',
    price: '$32.00',
    color: 'Black',
    inStock: false,
    leadTime: '3–4 weeks',
    size: 'Large',
    imageSrc: 'https://3.img-dpreview.com/files/p/E~C59x0S472x354T1200x900~articles/1546545533/monkey1.jpeg',
    imageAlt: "Front of men's Basic Tee in black.",
}, {
    id: 3,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc: 'https://i.pinimg.com/originals/97/b5/aa/97b5aa3c6eb75eddf20fc48976679152.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
},
];

const ShoppingCart = () => {
    const [productArray, setProductArray] = useState([]);

    const router = useRouter();

    useEffect(async () => {
        //TODO remove this in sprint 2
        let userId = "625ba245615947ebd82537de";

        await axios.get('http://localhost:8000/api/get-user-shopping-cart', {
            params: {
                userId: userId
            }
        }).then(r => {
            axios.all(r.data.shoppingCart.map(async (product) => {
                return await axios.get('http://localhost:8000/api/load-product-from-id', {
                    params: {
                        productId: product
                    }
                })
            })).then(
                axios.spread((...res) => {
                    setProductArray(res.map(r => r.data.product));
                })
            ).catch(err => {
            })
        }).catch(e => {
            console.log(e);
        });

    }, []);


    return (
        <div className={`max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8`}>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
            <div className={`mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16`}>
                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                    <h2 id="cart-heading" className="sr-only">
                        Items in your shopping cart
                    </h2>

                    <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                        {productArray.map((product, productIdx) => (<li key={product.id} className="flex py-6 sm:py-10">
                            <div className="flex-shrink-0">
                                <img
                                    src={product.image}
                                    alt={""}
                                    className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                                />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                    <div>
                                        <div className="flex justify-between">
                                            <h3 className="text-sm">
                                                <a href={product.href}
                                                   className="font-semibold text-lg text-gray-700 hover:text-gray-800">
                                                    {product.name}
                                                </a>
                                            </h3>
                                        </div>
                                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price}.00$</p>
                                    </div>

                                    <div className="mt-4 sm:mt-0 sm:pr-9">
                                        <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                                            Quantity, {product.name}
                                        </label>
                                        <span className="relative z-0 inline-flex shadow-sm rounded-md">
                                        <button
                                            type="button"
                                            className="relative inline-flex  items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <span className="sr-only">add</span>
                                                    <ChevronLeftIcon className="h-5 w-5 rotate-90" aria-hidden="true"/>
                                        </button>
                                        <button
                                            disabled={true}
                                            type="button"
                                            className="relative inline-flex items-center px-4 py-2  border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <span className="sr-only">amount</span>
                                                    1
                                        </button>
                                        <button
                                            type="button"
                                            className="-ml-px relative inline-flex  items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <span className="sr-only">remove</span>
                                            <ChevronRightIcon className="h-5 w-5 rotate-90" aria-hidden="true"/>
                                        </button>
                                    </span>

                                        <div className="absolute top-2 right-0">
                                            <button type="button"
                                                    className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Remove</span>
                                                <XIconSolid className="h-5 w-5" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>))}
                    </ul>
                </section>
                <section
                    aria-labelledby="summary-heading"
                    className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                >
                    <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                        Order summary
                    </h2>

                    <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <dt className="text-sm text-gray-600">Subtotal</dt>
                            <dd className="text-sm font-medium text-gray-900">$99.00</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="flex items-center text-sm text-gray-600">
                                <span>Shipping estimate</span>
                                <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Learn more about how shipping is calculated</span>
                                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true"/>
                                </a>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="flex text-sm text-gray-600">
                                <span>Tax estimate</span>
                                <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Learn more about how tax is calculated</span>
                                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true"/>
                                </a>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="text-base font-medium text-gray-900">Order total</dt>
                            <dd className="text-base font-medium text-gray-900">$112.32</dd>
                        </div>
                    </dl>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Checkout
                        </button>
                        <button
                            onClick={() => {
                                router.push('/');
                            }}
                            type="submit"
                            className="w-full bg-red-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500 mt-4"
                        >
                            Go back
                        </button>
                    </div>
                </section>
            </div>
        </div>);
};

export default ShoppingCart;
