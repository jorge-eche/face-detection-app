import { useState } from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import SignIn from "./components/SignIn/SignIn";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");

  const onRouteChange = (route) => {
    setRoute(route);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiBox =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const heigth = Number(image.height);
    return {
      leftCol: clarifaiBox.left_col * width,
      topRow: clarifaiBox.top_row * heigth,
      rightCol: width - clarifaiBox.right_col * width,
      bottomRow: heigth - clarifaiBox.bottom_row * heigth,
    };
  };

  const displayFaceBox = (boxCoordinates) => {
    console.log(boxCoordinates);
    setBox(boxCoordinates);
  };

  const returnClarifaiRequestOptions = (imageURL) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "100d7e616b544154a64cf0c855c3ce67";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "jecheverria";
    const APP_ID = "SmartBrainAus";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";
    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    return requestOptions;
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageURL(input);
    fetch(
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      returnClarifaiRequestOptions(input)
    )
      .then((response) => response.json())
      .then((response) => {
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" color="#FFFFFF" bg={true} />
      <Navigation onRouteChange={onRouteChange} />

      {route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageURL={imageURL} box={box} />
        </>
      )}
    </div>
  );
}

export default App;
