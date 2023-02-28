import Tilt from "react-parallax-tilt";

const Logo = () => {
  return (
    <div className="m4 mt0">
      <Tilt>
        <div
          style={{
            width: "150px",
            height: "150px",
          }}
        >
          <h1
            style={{
              background: "linearGradient(89deg, #ff5edf 0%, #04c8de 100%)",
            }}
          >
            React Parallax Tilt 👽
          </h1>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
