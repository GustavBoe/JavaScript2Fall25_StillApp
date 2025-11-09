import {
  addToLocalStorage,
  getFromLocalStorage,
  logOut,
} from "..//utils/storage.js";
import { AUTH_LOGIN_URL, loginForm, logoutButton } from "..//utils/const.js";
import { createHeader } from "../components/headerFooterLoader.js";
if (getFromLocalStorage("accessToken")) {
  window.location.href = "./index.html";
}
createHeader();

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

    const accessToken = json.data.accessToken;
    const profileName = json.data.name;

    addToLocalStorage("accessToken", accessToken);
    addToLocalStorage("profileName", profileName);
  } catch (error) {
    console.log(error);
  }
}
async function onLoginFormSubmit(event) {
  // Checking code taken from "https://stackoverflow.com/questions/49219399/make-html-input-contain-something-to-validate"
  event.preventDefault();

  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);
  await loginUser(formFields);
  location.href = "./index.html";
}
loginForm.addEventListener("submit", onLoginFormSubmit);
