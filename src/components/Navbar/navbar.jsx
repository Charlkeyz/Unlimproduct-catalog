// import React from 'react'
import Logo from "/images/Group 1000004238.png"
import BellLogo from "/images/Group 1000004246.png"
import MaskImg from "/images/Mask group.png"
import { FaChevronDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useContext } from "react";
import { ContextApi } from "../ContextAPI/ContextApi";

const Navbar = () => {

    const {handleSearchInput, searchInput} = useContext(ContextApi)
  return (
    <nav className='w-screen bg-white flex sm:justify-between items-center p-3 gap-2 overflow-hidden'>
        <div className="flex sm:justify-between justify-center items-center sm:gap-20 gap-2">
            <div className="flex justify-center items-center">
                <img src={Logo} alt="logo" className="sm:w-[56.72px] sm:h-[56px] w-[20px]"/>
                <h1 className="sm:text-[40.0px] font-semibold sm:leading-[48.45px] text-[#0341A7] font-Inter text-[15px]">Unlimi<span className="text-red-600">.</span></h1>
            </div>
            <div className="flex justify-center items-center bg-white p-2 border border-gray-300 rounded-xl gap-2">
                <CiSearch/>
                <input type="text" placeholder='Search by patients...' className="outline-none text-[10px] sm:text-sm sm:w-[264px] sm:h-[20px] w-[100px] h-[10px]" onChange={handleSearchInput} value={searchInput} />
            </div>
        </div>
        <div className="flex sm:justify-between items-center sm:gap-3 gap-1">
            <img src={BellLogo} alt="BellLogo" className="bg-gray-100 rounded-full" />
            <img src={MaskImg} alt="" />
            <span>Deko</span>
            <FaChevronDown/>
        </div>
    </nav>
  )
}

export default Navbar