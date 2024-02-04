import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EmbeddedPlayer from "./components/EmbeddedPlayer";
import FormTextInput from "./components/FormTextInput";

function App() {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({});
  const server_url = import.meta.env.VITE_SERVER_URL;

  function handleChangeEventFormInput(key, value) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [key]: value,
      };
    });
  }

  async function submitFormData() {
    const sendSongsToDB = await fetch(`${server_url}/songs/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const response = await sendSongsToDB.json();
    alert(response.result);
  }

  // const [showButton, setShowButton] = useState(false);

  // // const requestSongs = await fetch(`${server_url}/songs`)

  // async function handleShowButton(event) {
  //   event.preventDefault();
  //   // const slackLoginRequest = await fetch(`${server_url}/slack-sign-in`);
  //   const slackLoginRequest = await fetch(
  //     `https://stay-tuned-radio-server.onrender.com/slack-sign-in`
  //   );
  //   const slackLoginResponse = await slackLoginRequest;
  //   console.log("You clicked me Boop!");

  //   console.log(slackLoginResponse);

  //   // setShowButton(true);
  // }


  function createPopupWin(pageURL, pageTitle,
    popupWinWidth, popupWinHeight) {
    let left = (screen.width - popupWinWidth) / 2;
    let top = (screen.height - popupWinHeight) / 4;

    let myWindow = window.open(pageURL, pageTitle,
        'resizable=yes, width=' + popupWinWidth
        + ', height=' + popupWinHeight + ', top='
        + top + ', left=' + left);
}

  async function handleClick(event) {
    //stop pesky refresh
    event.preventDefault()
    //calls slack-sign-in endpoint
    const requestCall = await fetch(`${server_url}/slack-sign-in`)
    //waits for response from fetch call. Returns {url: `https://slack.com/openid/connect/authorize?${queryParams}`}
    const responseCall = await requestCall.json()
    // set slackLoginPortal to https://slack.com/openid/connect/authorize?${queryParams (from response)
    const slackLoginPortal = responseCall.url
    // window.open(slackLoginPortal, "Window", "popup height=600 width=600");
    //createPopupWin is exactly same as window.open except it calculates screen size and centres window
    createPopupWin(slackLoginPortal, "Slack Login", 600, 600)
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <EmbeddedPlayer />
      <FormTextInput
        inputName="Artist"
        inputID="artist"
        handleChangeEventFormInput={handleChangeEventFormInput}
      />
      <FormTextInput
        inputName="Song Title"
        inputID="song_title"
        handleChangeEventFormInput={handleChangeEventFormInput}
      />
      <FormTextInput
        inputName="Spotify URL"
        inputID="spotify_url"
        handleChangeEventFormInput={handleChangeEventFormInput}
      />
      <button onClick={submitFormData}>Submit</button>
      {/* /////////////////////////////// */}
      {/* //////////////////////////////// */}
      <div>
        {/* this is visible to everyone */}
        <h1>bla bla</h1>
        {showButton === true ? (
          // this is visible when showButton equals true
          <>
            <p>test - your logged in and verified: this shows now!</p>
          </>
        ) : (
          // this shows when showButton does not equal true
          <>
            <p>you are not authorised</p>
            <button onClick={handleShowButton}>Login to Add Songs</button>
          </>
        )}
      </div>
      {/* //////////////////////////////// */}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={handleClick}>Login</button>

    </>
  );
}

export default App;
