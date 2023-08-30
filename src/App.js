import { useState } from "react";
import ParticlesBg from "particles-bg";
import Spinner from "react-spinners/RingLoader";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: new Date(),
  });

  const [loading, setIsLoading] = useState(false);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onRouteChange = (route) => {
    if (route === "signin") {
      setIsSignedIn(false);
      setUser({ id: "", name: "", email: "", entries: 0, joined: new Date() });
      setImageURL("");
    } else if (route === "home") {
      setIsSignedIn(true);
    }
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

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const resetInput = () => {
    setInput("");
  };

  const onPictureSubmit = () => {
    const url = input;
    setImageURL(input);
    resetInput();
    fetch("https://smartbrainapi-vcz5.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: url,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          //Change "https://smartbrainapi-vcz5.onrender.com/image" to "http://localhost/image" if you plan to run it locally.
          fetch("https://smartbrainapi-vcz5.onrender.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              const newEntries = {
                entries: count,
              };
              setUser({
                ...user,
                ...newEntries,
              });
            })
            .catch(console.log);

          displayFaceBox(calculateFaceLocation(response));
        }
      })
      .catch((err) => console.log(err));
  };

  const loadingHandler = () => {
    setIsLoading((prevState) => !prevState);
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" color="#FFFFFF" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />

      {route === "home" ? (
        <>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm
            input={input}
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition imageURL={imageURL} box={box} />
        </>
      ) : route === "signin" ? (
        <>
          <SignIn
            onRouteChange={onRouteChange}
            loadUser={loadUser}
            loadingHandler={loadingHandler}
          />
          <Spinner
            color="#e75480"
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
            cssOverride={{ margin: "auto" }}
          />
        </>
      ) : (
        <>
          <Register
            onRouteChange={onRouteChange}
            loadUser={loadUser}
            loadingHandler={loadingHandler}
          />
          <Spinner
            color="#e75480"
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
            cssOverride={{ margin: "auto" }}
          />
        </>
      )}
    </div>
  );
}

export default App;
