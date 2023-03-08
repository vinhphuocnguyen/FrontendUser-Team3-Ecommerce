import React, { useState } from "react";
type Props = {
  prices: any;
  onChangePrice: (price: any) => void;
};

const Sort = ({ prices, onChangePrice }: Props) => {
  let arrprices = [
    {
      _id: "all",
    },
    ...prices,
  ];
  const [price, setPrice] = useState();
  const handlePrice = (e: any) => {
    setPrice(e.target.value);
    onChangePrice(e.target.value);
  };
  return (
    <div className="px-5 text-center col-md-2 mt-2">
      <p className="text-left bg-slate-300 w-20">Price</p>
      <div>
        <div>
          {" "}
          <select
            className=" bg-red-200"
            value={price}
            onChange={handlePrice}
            name="price"
          >
            {arrprices.map((c: any) => (
              <option key={c._id} value={c.price}>
                {c.price}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sort;
