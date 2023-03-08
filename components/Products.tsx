import React from "react";
import { useCartStore } from "../hooks/useCartStore";
import router from "next/router";
type Props = {
  imgUlr: String;
  name: string;
  price: number;
  product: any;
  id: number;
};

const Products = (props: Props) => {
  const add = useCartStore((state: any) => state.add);

  // const items = useCartStore((state: any) => state.items);

  return (
    <div className="h-96 w-72 mx-4 my-4 row rounded-lg border-2">
      <div className="h-4/6 ">
        <img
          src={props.imgUlr}
          alt="adascas"
          className="pt-2 px-2 h-full mx-auto"
        />
      </div>
      <div className="text-center">
        <h2 className="font-bold pt-2">{props.name}</h2>
        <h2 className="font-bold pt-2">
          ${props.price}
          <span className="text-red-600"> -{props.product.discount}%</span>
        </h2>
      </div>
      <div className="text-center pt-3">
        <button
          className="border-2 h-[32px] w-[64px] border-sky-600 active:bg-sky-600 rounded-lg"
          onClick={() => {
            add({ product: props.product, quantity: 1 });
          }}
        >
          Buy
        </button>
        <button
          onClick={() => {
            router.push({
              pathname: "/products/[id]",
              query: { id: props.id },
            });
          }}
          className="m-2 border-2 h-[32px] w-[64px] border-sky-600 active:bg-sky-600 rounded-lg"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default Products;
