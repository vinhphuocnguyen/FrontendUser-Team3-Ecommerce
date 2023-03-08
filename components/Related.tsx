import React, { useEffect } from "react";
import { useState } from "react";
import { axiosClient } from "../libraries/axiosClient";
import router from "next/router";
type Props = {
  imageUrl: String;
  name: string;
  price: number;
  id: number;
  productId: any;
  category: any;
};
const Related = ({ productId }: Props) => {
  console.log(productId);

  const [products, setProducts] = useState([]);
  let category = productId.category._id;

  const fetchData = async () => {
    let query = `category=${category}`;
    const products: any = await axiosClient.get(`/products?${query}`);
    setProducts(products);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const changeImage = (e: any) => {
    router.push({
      pathname: "/products/[id]",
      query: { id: e.target.id },
    });
  };
  return (
    <div className="mt-5 mx-14 grid grid-cols-5 gap-2">
      {products.map((c: any) => {
        return (
          <div key={c.id} className="mx-4 my-4 row rounded-lg border-2">
            <img
              id={c.id}
              src={`http://localhost:9000${c.imageUrl}`}
              alt=""
              className=" px-2 h-48 w-72 mx-auto"
              onClick={(e: any) => {
                changeImage(e);
              }}
            />{" "}
          </div>
        );
      })}
    </div>
  );
};

export default Related;
