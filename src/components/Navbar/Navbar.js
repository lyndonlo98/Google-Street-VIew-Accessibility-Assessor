import React, { useEffect, useRef} from 'react';
import { ReactComponent as WheelchairIcon } from '../../icons/wheelchair.svg';
import lottie from 'lottie-web';

const Navbar = (props) => {

  
const websiteIconContainer = useRef(null);

useEffect(()=>{
  lottie.loadAnimation({
    container: websiteIconContainer.current,
    renderer: "svg",
    autoplay: true,
    loop: 1,
    animationData: require('../../icons/wheelchair2.json'),
    name: 'wheelchair'
  })
},[])
    return (
      <div className="header">
        <a className="navbar-brand" href="javascript:void(0);">
          {/* <span className="website-icon" 
          > */}
            <div className="website-icon-container" 
            ref={websiteIconContainer}
            onMouseEnter={() => lottie.play('wheelchair')}
            onMouseLeave={() => lottie.stop('wheelchair')}/>
          {/* </span> */}
          SoAccessible
        </a>
        <nav className="navbar">
          <ul className="navbar-nav">{props.children}</ul>
        </nav>
      </div>
    );
}
export default Navbar;