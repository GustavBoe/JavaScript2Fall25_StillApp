//This file will render a specific post//
import {
  NOROFF_API_KEY,
  singlePostContainer,
  SINGLE_URL,
} from "../utils/const.js";
import { getFromLocalStorage } from "../utils/storage.js";

async function fetchSinglePost() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(SINGLE_URL, fetchOptions);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}
async function generateSinglePost(post) {
  if (post.media) {
    const postContainer = document.createElement("div");
    const postTitle = document.createElement("h1");
    postTitle.classList = "single-title";
    postTitle.textContent = post.title;
    const postMedia = document.createElement("img");
    postMedia.classList = "single-image";
    postMedia.src = post.media.url;
    postMedia.alt = post.media.alt;

    const postBody = document.createElement("p");
    postBody.classList = "single-body";
    postBody.textContent = post.body;

    postContainer.append(postTitle, postMedia, postBody);

    singlePostContainer.append(postContainer);
  } else {
    const postContainer = document.createElement("div");
    const postTitle = document.createElement("h1");
    postTitle.textContent = post.title;

    const postBody = document.createElement("p");
    postBody.textContent = post.body;

    postContainer.append(postTitle, postBody);

    singlePostContainer.append(postContainer);
  }
}
async function mainPost() {
  try {
    const post = await fetchSinglePost();
    generateSinglePost(post);
  } catch (error) {
    alert(error, "Something went wrong, please return to homepage");
  }
}
mainPost();
