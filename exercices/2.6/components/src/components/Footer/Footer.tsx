import React from "react";

type FooterProps = {
  logoUrl: string;
  children?: React.ReactNode;
};

const Footer = ({ logoUrl, children }: FooterProps) => {
  return (
    <footer className="footer">
      <img src={logoUrl} alt="Logo du footer" className="footer-logo" />
      <div className="footer-content">{children}</div>
    </footer>
  );
};

export default Footer;
