import React, { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "../hooks/useCartStore";
import { useState } from "react";
type Props = {};

const Header = (props: Props) => {
  const items = useCartStore((state: any) => state.items);
  const [cartItemsCount, setCartItemsCount] = useState();
  let totalQuantity = 0;
  for (var i = 0; i < items.length; i++) {
    totalQuantity += items[i].quantity;
  }
  useEffect(() => {
    setCartItemsCount(totalQuantity);
  });
  return (
    <div className="w-full flex	h-16 leading-[64px]">
      <div className="w-1/3 text-center font-bold">
        <Link href="/">LA COLLECTION</Link>
      </div>
      <div className="w-1/3 text-center">
        <ul className="flex space-x-4">
          <li className="hover:text-blue-500 ">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-500 ">
            <Link href="/products">Products</Link>
          </li>
          <li className="hover:text-blue-500 ">
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>
      <div className="w-1/4">
        <div className="w-[64px] mx-auto my-auto h-full flex">
          <Link href="/cart">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Shopping_cart_icon.svg/2501px-Shopping_cart_icon.svg.png"
              alt="cart"
              className="h-[48px] pt-[10px]"
            />
          </Link>
          <a>
            {cartItemsCount > 0 && (
              <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </a>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Header;
