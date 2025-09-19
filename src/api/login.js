import { getFromLocalStorage, addToLocalStorage } from "..//utils/storage.js";

const BASE_API_URL = "https://v2.api.noroff.dev";
const AUTH_LOGIN_URL = `${BASE_API_URL}/auth/login`;
const loginForm = document.querySelector("#login-form");
const logoutButton = document.getElementById("logout-button");

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
function clearStorage() {
  localStorage.clear();
}
loginForm.addEventListener("submit", onLoginFormSubmit);
logoutButton.addEventListener("click", clearStorage);
