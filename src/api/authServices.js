//This file will handle the different functions needed for authorizing a user//

import { createHeader } from "../components/headerFooterLoader.js";
import { AUTH_REGISTER_URL, registerForm } from "../utils/const.js";
createHeader();
/**
 * Creates a new account using the data from the user
 * @param {FormData} userDetails - The data that gets added to the body of the POST request.
 */
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
