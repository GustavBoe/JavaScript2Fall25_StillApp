//This file will handle the different functions needed for authorizing a users actions//
import { POSTS_URL, createForm, NOROFF_API_KEY } from "../utils/const.js";
import { getFromLocalStorage } from "../utils/storage.js";
async function createPost(postDetails) {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(postDetails),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(POSTS_URL, fetchOptions);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

function onCreateFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const postFields = Object.fromEntries(formData);

  const media = {
    url: postFields.url,
    alt: postFields.alt,
  };
  postFields.media = media;
  createPost(postFields);
}

createForm.addEventListener("submit", onCreateFormSubmit);
