import React from "react";
import "./FilterDropdown.css";

const FilterDropdown = ({ handleCategory }) => {
    return (
        <div className="filter-dropdown-container">
            <button className="filter-btn">Filters ▼</button>

            <div className="filter-menu">
                <div className="filter-item has-submenu">
                    Mens ❯
                    <div className="filter-submenu">
                        <p onClick={() => handleCategory("mens", "shirts")}>Shirts</p>
                        <p onClick={() => handleCategory("mens", "pants")}>Pants</p>
                        <p onClick={() => handleCategory("mens", "tshirts")}>Tshirts</p>
                    </div>
                </div>

                <div className="filter-item has-submenu">
                    Kids ❯
                    <div className="filter-submenu">
                        <p onClick={() => handleCategory("kids", "shirts")}>Shirts</p>
                        <p onClick={() => handleCategory("kids", "pants")}>Pants</p>
                        <p onClick={() => handleCategory("kids", "tshirts")}>Tshirts</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterDropdown;
