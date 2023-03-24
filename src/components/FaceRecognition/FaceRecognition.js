const FaceRecognition = ({ imageURL }) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        <img src={imageURL} alt="url pic" width="500px" height="auto" />
      </div>
    </div>
  );
};

export default FaceRecognition;
