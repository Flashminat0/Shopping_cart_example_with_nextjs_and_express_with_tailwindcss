import React from 'react';
import Image from "next/image";
import Link from "next/link";

import {ShoppingCartIcon, EmojiHappyIcon} from '@heroicons/react/outline'
import SearchBar from "./SearchBar";


const Header = () => {
    return (

        <div className={`my-4 mx-8 p-2 bg-indigo-300 rounded-lg border border-4 border-indigo-500`}>
            <div className={`grid grid-cols-7 place-items-center`}>
                <h1 className={`text-2xl font-bold`}>Grocery</h1>
                <div className={`col-start-4 col-span-3`}>
                    <SearchBar/>
                </div>
                <div className={`col-start-7 col-span-3 grid grid-cols-2`}>
                    <Link href={'shoppingcart'}><ShoppingCartIcon className={`h-10 `}/></Link>
                    {/*<Image src={'/galaya.jpg'} width={'40px'} height={'40px'}/>*/}
                </div>
            </div>
        </div>
    );
};

export default Header;
