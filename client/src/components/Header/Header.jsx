import { useState } from "react";
import {Link,NavLink,ScrollRestoration} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Navigate } from "react-router-dom";

export default function Header({isAuth}) {
  let [openMenu,setopenMenu]=useState(false)
  return (
    <header className="shadow-md bg-white z-50 sticky top-0 ">
      <nav className="lg:flex  bg-white py-2.5 items-center justify-between max-w-screen-xl mx-auto lg:px-6 px-4 ">
        <div>
          <Link to={'/'} className="flex items-center">
            <img
              src="src/assets/brainwave.svg"
              className="mr-2 w-12"
              alt=""
            />
            <span className="font-mono text-2xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">BrainWave</span>
          </Link>
        </div>
        <div className="absolute right-8 top-5 cursor-pointer lg:hidden " onClick={()=>setopenMenu(!openMenu)}>
        <button className="text-2xl">{openMenu ?<RxCross2 />: <GiHamburgerMenu/>}</button>
        </div>
        <div className={`absolute lg:static bg-white lg:z-auto z-[-1] left-0 w-full lg:w-auto transition-all duration-500 ease-in ${openMenu ? 'top-21 opacity-100':'top-[-500px]'} `}>
          <ul className="lg:flex lg:items-center lg:gap-6 text-center">
            <li> <NavLink to={"/"} className={() =>`border-b  hover:text-orange-700 duration-200 block py-4  lg:border-0 lg:py-0 lg:my-0 `}>Home</NavLink></li>
            <li><NavLink  to= {"/courses"} className={() => `border-b  hover:text-orange-700 duration-200 block py-4 lg:border-0 lg:py-0  lg:my-0  `}>Courses</NavLink></li>
            <li> <NavLink to={"/about"} className={() =>`border-b  hover:text-orange-700 duration-200 block py-4  lg:border-0 lg:py-0 lg:my-0 `}>About Us</NavLink></li>
            {/* <li> <NavLink to="/Signup" className={() => `border-b lg:bg-orange-400 lg:px-6 rounded-md lg:text-white lg:hover:text-white lg:hover:opacity-80 py-4 hover:text-orange-700 duration-200  block  lg:border-0 lg:py-3 lg:my-0 `}>Get Started</NavLink></li> */}
            <li>{isAuth?(
              <NavLink to={"/account"} className={() => ` border-b lg:bg-orange-400 lg:px-8 rounded-md lg:text-white lg:hover:text-white lg:hover:opacity-80 py-4 hover:text-orange-700 duration-200  block  lg:border-0 lg:py-3 lg:my-0`}>Account</NavLink>
            ):
            (
              <NavLink to={"/login"} className={() => ` border-b lg:bg-orange-400 lg:px-8 rounded-md lg:text-white lg:hover:text-white lg:hover:opacity-80 py-4 hover:text-orange-700 duration-200  block  lg:border-0 lg:py-3 lg:my-0`}>Login</NavLink>
            )}
            </li>
          </ul >
          
        </div>
       

       
      </nav>
    </header>
  );
}