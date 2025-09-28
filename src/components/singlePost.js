//This file will render a specific post//
import { singlePostContainer, profileName } from "../utils/const.js";

import { fetchSinglePost } from "..//api/apiClient.js";
import { createHeader } from "./headerFooterLoader.js";

async function generateSinglePost(post) {
  const postContainer = document.createElement("div");
  const postTitle = document.createElement("h1");
  postTitle.classList = "single-title";
  postTitle.textContent = post.title;
  const postMedia = document.createElement("img");
  postMedia.classList = "single-image";
  if (post.media) {
    postMedia.src = post.media.url;
    postMedia.alt = post.media.alt;
  } else {
    postMedia.src = "https://i.imghippo.com/files/AVMh8683c.png";
    postMedia.alt = "Placeholder image of a dark grey mountain and a sun";
  }

  const postBody = document.createElement("p");
  postBody.classList = "single-body";
  postBody.textContent = post.body;
  postContainer.append(postTitle, postMedia, postBody);
  if (profileName === post.author.name) {
    const sendToEditButton = document.createElement("button");
    sendToEditButton.classList = "editButton";
    sendToEditButton.textContent = "Edit post";
    sendToEditButton.addEventListener("click", () => {
      window.location.href = `./edit.html?id=${post.id}`;
    });
    postContainer.append(sendToEditButton);
  }
  singlePostContainer.append(postContainer);
}
async function mainPost() {
  createHeader();
  try {
    const post = await fetchSinglePost();
    generateSinglePost(post);
  } catch (error) {
    alert(error, "Something went wrong, please return to homepage");
  }
}

mainPost();
