import React from "react";


type HeaderProps = {
  logoUrl: string;
  children?: React.ReactNode;
};

const Header = ({ logoUrl, children }: HeaderProps) => {
  return (
    <header className="header">
      <img src={logoUrl} alt="Logo du site" className="header-logo" />
      <div className="header-content">{children}</div>
    </header>
  );
};

export default Header;
