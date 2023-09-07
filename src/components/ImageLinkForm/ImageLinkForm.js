import "./ImageLinkForm.css";

const ImageLinkForm = ({ input, onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className="f3 mb4">
        This Magic Brain will detect faces in your pictures. Give it a try!
      </p>
      <ol className="mb2 purple">
        <li>1. Google search an image with a face.</li>
        <li>2. Click the one you like and open it on a new tab.</li>
        <li>3. Copy/paste its URL on the bar below.</li>
        <li>4. Wait for the magic to happen!</li>
      </ol>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          {" "}
          <input
            className="f4 pa2 w-70 center bn"
            type="text"
            value={input}
            placeholder="Image URL"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple bn"
            onClick={onPictureSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
