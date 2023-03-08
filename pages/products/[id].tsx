import React, { useState } from "react";
import { axiosClient } from "../../libraries/axiosClient";
import Link from "next/link";
import Head from "next/head";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillGoogleCircle,
  AiOutlineInstagram,
  AiFillCodeSandboxCircle,
  AiFillStar,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import router from "next/router";
import { FaInternetExplorer, FaSupple } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { useCartStore } from "../../hooks/useCartStore";
import Related from "../../components/Related";
type Props = {
  product: any;
  products: any;
};
const DetailProduct = ({ product }: Props) => {
  //count quanlity
  const [index, setIndex] = React.useState(0);

  //like, notlike product
  const [like, setLike] = React.useState(false);

  //review product
  const [stars] = React.useState(5);
  let array = [1, 2, 3, 4, 5];

  //prodcut tab description, info, reviews
  const defaultTabs = [
    {
      title: "DESCRIPTION",
      content: { content: product.description },
    },
    {
      title: "INFORMATION",
      content: { content: "Updating" },
    },
    {
      title: "REVIEWS",
      content: { content: "Updating" },
    },
  ];
  // selected tab
  const [selectedTabIndex, setSlectedTabIndex] = React.useState(0);
  const add = useCartStore((state: any) => state.add);
  const handleAdd = () => {
    add({ product, quantity: index });
    router.push({
      pathname: "/cart",
    });
  };

  return (
    <div className="mt-9 mx-14 ">
      <Head>
        <title>Detail Product</title>
      </Head>
      <div className="pt-5 ">
        <Link
          className="py-1 border-2 h-[32px] w-[70px] border-sky-600 active:bg-sky-600 rounded-lg"
          href={"/"}
        >
          Back To Home
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-5">
        <div className="h-full">
          <img
            src={`http://localhost:9000${product.imageUrl}`}
            alt=""
            className="object-contain h-full w-1/2 mx-auto"
          />{" "}
        </div>
        <div className="h-full">
          <div className="h-2/3 rounded-lg object-cover w-full">
            <ul className="">
              <li>
                <h1 className="text-lg text-black text-1xl">{product.name}</h1>
              </li>
              <li className="flex">
                {array.map((item) => {
                  if (item <= stars) {
                    return (
                      <AiFillStar key={item} style={{ color: "orange" }} />
                    );
                  }
                })}
              </li>
              <hr className="border-2 color bg-green-700"></hr>
              <li>Price:${product.price}</li>
              <li>
                Status:
                <span style={{ color: "green" }}>
                  {product.stock > 0 ? "In stock" : "Unavailable"}
                </span>
              </li>

              <hr className="border-2 color bg-green-700"></hr>
              <div className="flex h-50">
                <div>
                  <div>
                    {" "}
                    <p>Quantily</p>
                  </div>
                  <div className="flex border-2 rounded-lg">
                    <div>
                      {" "}
                      <button
                        className="h-[32px] w-[64px] text-black"
                        disabled={index === 0}
                        style={{ backgroundColor: index === 0 ? "gray" : null }}
                        onClick={() => setIndex(index - 1)}
                      >
                        -
                      </button>
                    </div>
                    <div>
                      <h2>{index}</h2>
                    </div>
                    <div>
                      {" "}
                      <button
                        className="h-[32px] w-[64px] text-black"
                        onClick={() => setIndex(index + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex pt-6 mx-10">
                  {" "}
                  <div>
                    <button
                      className="border-2 h-[55px] w-[80px] bg-black text-white active:bg-sky-600 rounded-lg"
                      onClick={() => {
                        add({ product, quantity: index });
                      }}
                    >
                      Add to card
                    </button>
                  </div>
                  <div>
                    <button
                      className="border-2 h-[55px] w-[80px] bg-red-500 text-white active:bg-sky-600 rounded-lg"
                      onClick={() => {
                        handleAdd();
                      }}
                    >
                      Buy now
                    </button>
                  </div>
                  <div>
                    {like && (
                      <AiFillHeart
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          setLike(false);
                        }}
                      />
                    )}
                    {!like && (
                      <AiOutlineHeart
                        onClick={() => {
                          setLike(true);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <hr className="border-2 color bg-green-700"></hr>
              <div className="flex h-10 pt-2">
                {" "}
                <p>Share</p>
                <div className="flex justify-end">
                  <div>
                    <AiFillFacebook
                      style={{ color: "blue", cursor: "pointer" }}
                    />
                  </div>
                  <div>
                    <AiFillTwitterCircle
                      style={{ color: "blue", cursor: "pointer" }}
                    />
                  </div>
                  <div>
                    <AiFillGoogleCircle
                      style={{ color: "green", cursor: "pointer" }}
                    />
                  </div>
                  <div>
                    <AiOutlineInstagram
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
              <hr className="border-2 color bg-green-700"></hr>
            </ul>
          </div>
          <div className="h-2/6 rounded-lg border-4 bg-slate-300">
            <div className="flex">
              <FaInternetExplorer />
              <p className="px-2">Shipping worldwide</p>
            </div>
            <div className="flex">
              <AiFillCodeSandboxCircle />
              <p className="px-2">Free 7-day return if eligble, so easy</p>
            </div>
            <div className="flex">
              <FaSupple />
              <p className="px-2">Supplier give bills for this product.</p>
            </div>
            <div className="flex">
              <MdPayment />
              <p className="px-2">Pay online or when receiving goods</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex flex-row ">
          {defaultTabs.map((tab, index) => {
            const isActiveTab = index === selectedTabIndex;
            return (
              <button
                onClick={() => {
                  setSlectedTabIndex(index);
                }}
                style={{
                  color: isActiveTab ? "black" : "#66666",
                  backgroundColor: isActiveTab ? "white" : "#EEEEEE",
                  width: "150px",
                  height: "32px",
                }}
                key={index}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
        <div className="">
          {defaultTabs.map((tab, index) => {
            if (index === selectedTabIndex) {
              return <div key={tab}>{tab.content.content}</div>;
            }
            return null;
          })}
        </div>
      </div>
      <div className="pt-10">
        {" "}
        <hr className="pt-2"></hr>
      </div>
      <div className="pt-0 justify-center">
        <div
          className="bg-gray-200 text-black flex justify-center"
          style={{ fontSize: 20 }}
        >
          RELATED PRODUCT
        </div>

        <div>
          <Related productId={product} />
        </div>
      </div>
    </div>
  );
};
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const products = (await axiosClient.get("/products")) as any[];

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = products.map((product: any) => ({
    params: { id: product._id },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

// This also gets called at build timeo
export async function getStaticProps({ params }: any) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const product = await axiosClient(`/products/${params.id}`);
  // Pass post data to the page via props
  return {
    props: { product },
  };
}

export default DetailProduct;
