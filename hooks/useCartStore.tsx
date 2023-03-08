import React from "react";
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  add: ({ product, quantity }) => {
    const items = get().items;
    const found = items.find((x: any) => x.product._id === product._id);
    if (found) {
      found.quantity++;
    } else {
      items.push({ product, quantity });
    }
    return set({ items: items });
  },
  remove: (id) => {
    const items = get().items;
    const newItems = items.filter((x: any) => x.product.id !== id);
    return set({ items: newItems });
  },
  increase: (id) => {
    const items = [...get().items]; // create a new array with the spread operator
    const found = items.find((x: any) => x.product.id === id);
    found.quantity++;
    return set({ items }); // update the state with the new array
  },

  decrease: (id) => {
    let items = [...get().items];
    const found = items.find((x: any) => x.product.id === id);
    if (found.quantity === 1) {
      items = items.filter((x: any) => x.product.id !== found.product.id);
      return set({ items });
    } else {
      found.quantity--;
      return set({ items });
    }
  },

  clearItems: () => {
    set({ items: new Array() });
   
  },
  resetItems: (id) => {
    let items = [...get().items];
    const found = items.find((x: any) => x.product.id === id);
    if (found.quantity !== 1) {
      found.quantity=1;
      return set({items})
    }
  },
}));
