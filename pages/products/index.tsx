import React, { useState, useEffect } from "react";
import { axiosClient } from "../../libraries/axiosClient";
import Product from "../../components/Products";
import Filter from "../../components/Filter";
import Sort from "../../components/Sort";
import Related from "../../components/Related";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);
  const [price, setPrice] = useState("");

  const fetchData = async ({ category, price }: any) => {
    let query = `price=${price}`;

    if (category !== "all") {
      query += `&category=${category}`;
    }
    const products: any = await axiosClient.get(`/products?${query}`);

    const categories: any = await axiosClient.get("/categories");
    const prices: any = await axiosClient.get("/products");
    setProducts(products);
    setCategories(categories);
    setPrices(prices);
  };

  const handleChangeCategory = (category: any) => {
    setCategory(category);
  };

  const handleChangePrice = (price: any) => {
    setPrice(price);
  };

  useEffect(() => {
    fetchData({ category, price });
  }, [category, price]);

  return (
    <div className="mt-9 mx-14	">
      <div className="">
        <div className="h-10 w-5">
          <Filter
            categories={categories}
            onChangeCategory={(category) => handleChangeCategory(category)}
          />
        </div>
        <div className="h-10 w-5 px-15">
          <Sort
            prices={prices}
            onChangePrice={(price) => handleChangePrice(price)}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {products.map((p: any) => {
          return (
            <div key={p._id}>
              <Product
                imgUlr={`http://localhost:9000${p.imageUrl}`}
                name={p.name}
                price={p.price}
                product={p}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
