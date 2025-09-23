//This file will handle the different functions needed for authorizing a user//
import { getFromLocalStorage } from "../utils/storage.js";
import {
  AUTH_REGISTER_URL,
  POSTS_URL,
  registerForm,
  createForm,
  NOROFF_API_KEY,
} from "../utils/const.js";

async function registerUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(AUTH_REGISTER_URL, fetchOptions);
  } catch (error) {
    console.log(error);
  }
}

function onRegisterFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const formFields = Object.fromEntries(formData);

  registerUser(formFields);
}

registerForm.addEventListener("submit", onRegisterFormSubmit);

async function createPost(postDetails) {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(postDetails),
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(POSTS_URL, fetchOptions);
  } catch (error) {
    console.log(error);
  }
}

function onCreateFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const formFields = Object.fromEntries(formData);

  createPost(formFields);
}

createForm.addEventListener("submit", onCreateFormSubmit);
