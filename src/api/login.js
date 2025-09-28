import { addToLocalStorage, logOut } from "..//utils/storage.js";
import { AUTH_LOGIN_URL, loginForm, logoutButton } from "..//utils/const.js";
import { createHeader } from "../components/headerFooterLoader.js";

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
  event.preventDefault();
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);
  await loginUser(formFields);

  window.location.href = "./index.html";
}

loginForm.addEventListener("submit", onLoginFormSubmit);

logoutButton.addEventListener("click", logOut);
