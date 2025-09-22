//This file will handle the different functions needed for authorizing a user//

export const BASE_API_URL = "https://v2.api.noroff.dev";

import { AUTH_REGISTER_URL, registerForm } from "../utils/const.js";

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
  console.log(formFields);

  registerUser(formFields);
}

registerForm.addEventListener("submit", onRegisterFormSubmit);
