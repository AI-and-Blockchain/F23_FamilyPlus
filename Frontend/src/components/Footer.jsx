import React from 'react';

//footer of website 
const Footer = () => {
    return (
        <footer className="bg-white-200 text-black text-center">
            <div className="container mx-auto">
                <p>
                    © {new Date().getFullYear()} Family+ @RPI All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
