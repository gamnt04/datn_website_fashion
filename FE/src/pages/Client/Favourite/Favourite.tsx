// import {
//   CartIcon,
//   HeartIcon,
//   HeartIconRed,
//   TrashIcon,
// } from "../../../resources/svg/Icon/Icon";
// import { useFavoriteProducts } from "../../../common/hooks/FavoriteProducts/FavoriteProduct";
// import { IProduct } from "../../../common/interfaces/Product";
// // import { useCart } from "../../../common/hooks/Cart/useCart";
// import useLocalStorage from "../../../common/hooks/Storage/useStorage";
// import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
// import { Link } from "react-router-dom";
// const Favourite = () => {
//   const [user] = useLocalStorage("user", {});
//   const account = user?.user;
//   // const { addToCart } = useCart();
//   const { removeFavoriteProduct } = useFavoriteProducts();

//   const onLoginWarning = () => {
//     alert("Please log in to your account");
//   };
//   const { data } = useFavoriteProducts();
//   return (
//     <div className="lg:mt-[40px] mt-[60px]">
//       <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
//         Home &#10148; Products &#10148; Favorites
//       </div>
//       <div className="mt-8 grid mb:grid-cols-[49%_49%] md:grid-cols-[32%_32%_32%] lg:grid-cols-[19%_19%_19%_19%_19%] xl:auto-rows-[450px] justify-between gap-y-8 ">
//         {data?.products.length === 0 ? (
//           <div className="">add product</div>
//         ) : (
//           <>
//             {data?.products?.map((item: IProduct, index: number) => (
//               <div
//                 className="w-full text-start flex flex-col gap-y-6"
//                 key={index}
//               >
//                 <div className="relative group rounded w-full h-[70%] overflow-hidden bg-[#F6F6F6]">
//                   <Link
//                     onClick={ScrollTop}
//                     to={"/shops/detail_product"}
//                     className="h-full cursor-pointer *:drop-shadow"
//                   >
//                     <img
//                       className="group-hover:scale-105 duration-500 w-full h-full lg:px-8 mb:px-10 lg:py-6 mb:py-6"
//                       loading="lazy"
//                       src={item.image}
//                       alt={item.name}
//                     />
//                   </Link>
//                   {/* hover show icon cart */}
//                   <div className="absolute flex flex-col bg-white rounded top-0 pt-1 translate-y-[-100%] right-0 group-hover:translate-y-0 duration-200">
//                     {account ? (
//                       <>
//                         <button
//                           className="p-2 rounded *:cursor-pointer border-none hover:scale-110"
//                           onClick={() =>
//                             addToCart.mutate({
//                               productId: item._id,
//                               quantity: 1,
//                             })
//                           }
//                         >
//                           <CartIcon />
//                         </button>
//                         <button
//                           className="p-2 rounded *:cursor-pointer border-none hover:scale-110"
//                           onClick={() =>
//                             removeFavoriteProduct.mutate(item.productId)
//                           }
//                         >
//                           <HeartIconRed />
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           className="p-2 rounded *:cursor-pointer border-none hover:scale-110"
//                           onClick={() => onLoginWarning()}
//                         >
//                           <CartIcon />
//                         </button>
//                         <button
//                           className="p-2 rounded *:cursor-pointer border-none hover:scale-110"
//                           onClick={() => onLoginWarning()}
//                         >
//                           <HeartIcon />
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <Link
//                     onClick={ScrollTop}
//                     to={"/shops/detail_product"}
//                     className="text-xl font-medium text-gray-700 hover:text-black"
//                   >
//                     Dome Lamp {data.i}
//                   </Link>
//                   <p className="text-sm font-normal text-[#999999] my-2">
//                     {item.name}
//                   </p>
//                   <p className="text-md font-semibold text-[#222222]">
//                     2.000.000 VND
//                   </p>
//                   <div className="flex justify-center mt-4 items-center gap-x-4">
//                     <Link
//                       className="md:block mb:hidden bg-black text-white py-2 px-4 rounded hover:scale-105 duration-300 cursor-pointer"
//                       to={""}
//                     >
//                       Buy Now
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="flex justify-center gap-2 mt-4">
//                   {item.gallery?.map((image: File | string, index: number) => (
//                     <img
//                       key={index}
//                       className="w-[40px] h-[40px] p-2 rounded-full border duration-300 hover:border-[#F68E56]"
//                       src={renderImage(image)}
//                       alt={`Gallery image ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
// export default Favourite;
