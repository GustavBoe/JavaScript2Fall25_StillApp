//This file will handle the different functions needed for authorizing a user//
const BASE_API_URL = "https://v2.api.noroff.dev";
const AUTH_REGISTER_URL = `${BASE_API_URL}/auth/register`;
const AUTH_LOGIN_URL = `${BASE_API_URL}/auth/login`;
const registerForm = document.querySelector(`#register-form`);

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
