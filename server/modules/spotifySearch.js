const { query } = require("express");
const querystring = require("querystring");

const searchForSongsOnSpotify = async function (req, res) {
  //calling the /refresh_token endpoint to call the function to get the access and refresh tokens
  const serverURL = process.env.server_url;
  const requestRefreshToken = await fetch(`${serverURL}/refresh_token`);
  const newTokenObject = await requestRefreshToken.json();
  const newAccessToken = newTokenObject.access_token;

  const { q, type, limit } = req.query;

  const queryParams = querystring.stringify({
    q: q,
    type: type,
    limit: limit,
  });

  console.log(queryParams);

  const searchRequest = await fetch(
    `https://api.spotify.com/v1/search?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAccessToken}`,
      },
    }
  );

  const searchResponse = await searchRequest.json();

  const searchItems = searchResponse.tracks;

  res.send(searchItems);
};
module.exports = searchForSongsOnSpotify;
