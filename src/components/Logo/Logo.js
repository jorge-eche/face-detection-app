import Tilt from "react-parallax-tilt";
import BrainLogo from "./brain.png";

const Logo = () => {
  return (
    <div className="m4 mt0">
      <Tilt
        className="br2 shadow-2 ml4"
        style={{
          width: "150px",
          height: "150px",
          background: "linear-gradient(89deg, #ff5edf 0%, #04c8de 100%)",
        }}
      >
        <div className="pa3">
          <img
            src={BrainLogo}
            alt="logo"
            style={{ paddingTop: "5px", width: 150 }}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
