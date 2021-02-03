import React from 'react';
import { ReactComponent as WheelchairIcon } from '../../icons/wheelchair.svg';

const Navbar = (props) => {
    return (
      <div className="header">
        <a class="navbar-brand" href="javascript:void(0);">
          <span className="website-icon">{<WheelchairIcon/>}</span>
          SoAccessible
        </a>
        <nav className="navbar">
          <ul className="navbar-nav">{props.children}</ul>
        </nav>
      </div>
    );
}
export default Navbar;