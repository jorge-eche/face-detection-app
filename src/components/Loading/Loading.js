import Spinner from "react-spinners/RingLoader";
const Loading = () => {
  return (
    <>
      <Spinner
        color="#e75480"
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
        cssOverride={{ margin: "auto" }}
      />
      <p className="purple">
        App freely hosted on Render, please be patient =){" "}
      </p>
    </>
  );
};

export default Loading;
