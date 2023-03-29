// import { useState } from "react"


// const Navbar = () => {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//     const handleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen)
//     }
    
//     return (
//         <div className="w-full top-0 navbar z-10 bg-primary">
//             <div className=" py-2 px-1 lg:px-36 flex flex-row">
//                 <div>
//                     <img src="/img/logo.png" alt="logo" className="h-16"/>
//                 </div>
//                 <div className="grow m-auto hidden md:block">
//                     <ul className="flex flex-row-reverse content-center">
//                         <li>
//                             <a href="/newsideas" className="mx-7 font-rubik font-semibold text-lg bg-white px-3 py-2 px-6 rounded">Assesment</a>
//                         </li>
//                         <li>
//                             <a href="/newsideas" className="mx-7 font-rubik font-semibold text-lg text-white m-auto">News & Ideas</a>
//                         </li>
//                         <li>
//                             <a className="mx-7 font-rubik font-semibold text-lg text-white m-auto">Explore</a>
//                         </li>
//                         <li>
//                             <a className="mx-7 font-rubik font-semibold text-lg text-white m-auto">About</a>
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="my-auto ml-auto mr-3 block md:hidden">
//                     <button onClick={handleMobileMenu} className="cursor-pointer">
//                         <img src="/img/ham-menu-green.png"/>
//                     </button>
//                 </div>
//             </div>
//             <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden nav-mobile bg-white w-full`}>
//                 <ul className="mx-5">
//                     <li className="py-5 font-rubik font-medium text-md">About</li>
//                     <li className="py-5 font-rubik font-medium text-md">Explore</li>
//                     <li className="py-5 font-rubik font-medium text-md">News & Ideas</li>
//                     <li className="py-5 font-rubik font-medium text-md">Assesment</li>
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default Navbar