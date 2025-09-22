import { addToLocalStorage } from "..//utils/storage.js";
import { AUTH_LOGIN_URL, loginForm, logoutButton } from "..//utils/const.js";

async function loginUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(AUTH_LOGIN_URL, fetchOptions);
    const json = await response.json();
    console.log(json);
    const accessToken = json.data.accessToken;
    addToLocalStorage("accessToken", accessToken);
  } catch (error) {
    console.log(error);
  }
}
function onLoginFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);
  loginUser(formFields);
}
function logOut() {
  localStorage.clear();
  alert("Logged out! Sending you to home page");
  window.location.href = "/";
}
loginForm.addEventListener("submit", onLoginFormSubmit);
logoutButton.addEventListener("click", logOut);
