//This file will handle the different functions needed for authorizing a users actions//
import { POSTS_URL, createForm, NOROFF_API_KEY } from "../utils/const.js";
async function createPost(postDetails) {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      method: "POST",

      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
      body: JSON.stringify(postDetails),
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

  window.location.href = "./index.html";
}

createForm.addEventListener("submit", onCreateFormSubmit);
