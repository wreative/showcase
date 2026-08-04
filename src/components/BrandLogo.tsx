import React from "react";
import Logo from "../../assets/wreative.png";

interface BrandLogoProps {
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "h-6 w-9" }) => {
  return (
    <img
      src={Logo}
      alt="Wreative"
      className={`invert dark:invert-0 transition-[filter] duration-300 ${className}`}
    />
  );
};

export default BrandLogo;
