const querystring = require("querystring");

const searchForSongsOnSpotify = async function (req, res) {
  //calling the /refresh_token endpoint to call the function to get the access and refresh tokens
  const serverURL = process.env.server_url;
  const requestRefreshToken = await fetch(`${serverURL}/refresh_token`);
  const newTokenObject = await requestRefreshToken.json();
  const newAccessToken = newTokenObject.access_token;

  console.log(req.query);
  res.send(newAccessToken);
};
module.exports = searchForSongsOnSpotify;