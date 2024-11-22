import React from 'react'
import Logo from "../../assets/inventory-logo.svg";
const Brand = () => {
    return (
        <div className="flex flex-row lg:w-1/4 w-full items-center justify-center lg:justify-normal">
            <img src={Logo} alt="header-logo" className="lg:w-1/3 w-16" />
            <h3 className="text-[black] text-3xl font-semibold">InventoryHUB</h3>
        </div>
    )
}

export default Brand