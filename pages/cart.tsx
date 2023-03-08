import React, { useState } from "react";
import { useCartStore } from "../hooks/useCartStore";
import { axiosClient } from "../libraries/axiosClient";
import Router from "next/router";
type Props = {};

const index = (props: Props) => {
  const items = useCartStore((state: any) => state.items);
  const remove = useCartStore((state: any) => state.remove);
  const increase = useCartStore((state: any) => state.increase);
  const decrease = useCartStore((state: any) => state.decrease);
  const clearItems = useCartStore((state: any) => state.clearItems);
  const resetItems = useCartStore((state: any) => state.resetItems);
  let total = 0;
  let totalQuantity = 0;
  for (var i = 0; i < items.length; i++) {
    total +=
      (items[i].product.price -
        items[i].product.price * (items[i].product.discount / 100)) *
      items[i].quantity;
    totalQuantity += items[i].quantity;
  }
  function createOrder(value: any) {
    for (var i = 0; i < value.orderDetails.length; i++) {
      value.orderDetails[i].productId = value.orderDetails[i].product._id;
    }
    axiosClient
      .post("/orders", value)
      .then((res) => {
        window.alert("them moi thanh cong");
        clearItems();
        // Lấy đối tượng form từ id của nó
        const form = document.getElementById(
          "create-course-form"
        ) as HTMLFormElement;
        // Sử dụng hàm reset() để reset form
        form.reset();
      })
      .catch((err) => {});
  }
  function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (formJson.shippingAddress === "") {
      window.alert("Vui lòng nhập địa chỉ ship hàng");
      return false;
    }
    if (formJson.customerPhone === "") {
      window.alert("Vui lòng nhập số điện thoại");
      return false;
    }
    if (formJson.customerName === "") {
      window.alert("Vui lòng nhập tên khách hàng");
      return false;
    }
    if (items.length === 0) {
      window.alert("Giỏ hàng trống");
    } else {
      formJson.orderDetails = items;
      createOrder(formJson);
    }
  }
  return (
    <div className="w-4/5 mx-auto">
      <div className="w-1/2 float-left">
        <button
          onClick={() => {
            Router.push("/");
          }}
        >
          {totalQuantity === 0 && (
            <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-m font-bold text-white">
              Giỏ hàng trống
            </span>
          )}
        </button>
        {items.map((p: any) => {
          return (
            <div
              key={p.product._id}
              className="h-1/4 w-full flex border-2 mt-4"
            >
              <div className=" w-80 h-80 m-2">
                <div className="h-4/6">
                  <img
                    src={`http://localhost:9000${p.product.imageUrl}`}
                    alt="adascas"
                    className="pt-2 px-2 h-full mx-auto"
                  />
                </div>
                <div className="text-center">
                  <h2 className="font-bold pt-2">{p.product.name}</h2>
                  <h2 className="font-bold pt-2">$ {p.product.price}</h2>
                </div>
              </div>
              <div className="w-48 h-28 mx-auto my-auto ">
                Quantity:
                <button
                  className="active:bg-sky-600 h-[24px] w-[24px] border mx-2"
                  onClick={() => {
                    decrease(p.product._id);
                  }}
                >
                  -
                </button>
                <span>{p.quantity}</span>
                <button
                  className="active:bg-sky-600 h-[24px] w-[24px] border mx-2"
                  onClick={() => {
                    increase(p.product._id);
                  }}
                >
                  +
                </button>
                <div className="mt-[10px]">
                  <button
                    className="border-2 h-[32px] w-[120px] border-red-600 active:bg-red-600 rounded-lg"
                    onClick={() => {
                      remove(p.product._id);
                    }}
                  >
                    Dell
                  </button>
                </div>
                <div className="mt-[10px]">
                  <button
                    className="border-2 h-[32px] w-[120px] border-red-600 active:bg-red-600 rounded-lg"
                    onClick={() => {
                      resetItems(p.product._id);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-1/2 float-right ">
        <div className="w-5/6 mx-auto mt-4 ml-4">
          <h2 className="font-bold text-center">Chi tiết đơn hàng</h2>
          <form method="post" onSubmit={handleSubmit} id="create-course-form">
            <div className="mt-8">
              <label>
                Payment:
                <select
                  name="paymentType"
                  defaultValue="COD"
                  className="border border-black float-right w-1/2"
                >
                  <option value="COD">COD</option>
                  <option value="CREDIT CARD">Credit Card</option>
                </select>
              </label>
            </div>
            <div className="mt-8 ">
              <label>
                Address:{" "}
                <input
                  name="shippingAddress"
                  defaultValue=""
                  className="border-black border float-right w-1/2"
                />
              </label>
            </div>
            <div className="mt-8">
              <label>
                Name:{" "}
                <input
                  name="customerName"
                  defaultValue=""
                  className="border-black border float-right w-1/2"
                />
              </label>
            </div>
            <div className="mt-8">
              <label>
                PhoneNumber:{" "}
                <input
                  name="customerPhone"
                  defaultValue=""
                  className="border-black border float-right w-1/2"
                />
              </label>
            </div>
            <div className="mt-8">
              <label>
                Quantity: <strong>{totalQuantity}</strong>
              </label>
            </div>
            <hr className="mt-8 border-black" />
            <span className="pt-4">
              Total:
              <strong>${total}</strong>
            </span>
            <button
              type="submit"
              className="float-right bg-lime-500	text-slate-50	px-[32px] py-[15px] active:bg-sky-600 mt-4"
            >
              Submit
            </button>
            <button
              type="reset"
              className="float-right bg-lime-500	text-slate-50	px-[32px] py-[15px] active:bg-sky-600 mt-4 mr-4"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default index;
