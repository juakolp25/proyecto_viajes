import React from "react";

const Banner = () => {
  return (
    <div className="banner">
      <div className="hover-overlay" style={{ position: 'relative' }}>
        <img src="banner/imagen.jpg" alt="Imagen Principal" style={{ width: '100%', height: '350px' }} />
        <div className="mask" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <img src="logo.png" alt="Logo" />
        </div>
      </div>
    </div>  
  );
};

export default Banner;
