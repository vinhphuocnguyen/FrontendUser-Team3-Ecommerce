import React from "react";
import { useState } from "react";
type Props = {
  categories: any;
  onChangeCategory: (category: any) => void;
};

const Filter = ({ categories, onChangeCategory }: Props) => {
  const [category, setCategory] = useState();
  const arrCategories = [{ _id: "all", name: "All" }, ...categories];
  const handleCategory = (e: any) => {
    setCategory(e.target.value);
    onChangeCategory(e.target.value);
  };
  return (
    <div className="px-5 text-center col-md-2 mt-2">
      <p className="text-left bg-slate-300 w-20">Category</p>
      <div className="flex">
        <div>
          <select
            className=" bg-red-200"
            value={category}
            onChange={handleCategory}
          >
            {arrCategories.map((c: any) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
