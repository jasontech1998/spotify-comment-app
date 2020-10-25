

export const authEndpoint = "https://accounts.spotify.com/authorize/";

//If deployed, redirect here
// const redirectUri = "https://podspot-ede01.web.app/"
const redirectUri = "https://podspot.live/"

//If local, redirect here
// const redirectUri = "http://localhost:3000/"

const client_id = process.env.REACT_APP_SPOTIFY_ID; // Your client id

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "streaming"
];

export const getToken = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {})
}

export const loginUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;