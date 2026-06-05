//This file will render a specific post//
import { singlePostContainer, profileName } from "../utils/const.js";

import { fetchSinglePost } from "..//api/apiClient.js";
import { createHeader } from "./headerFooterLoader.js";

async function generateSinglePost(post) {
  const postContainer = document.createElement("div");
  postContainer.classList =
    "mx-auto max-w-[80%] flex flex-col items-center gap-5";
  const postTitle = document.createElement("h1");
  postTitle.classList = "font-tsukimi text-3xl text-center";
  postTitle.textContent = post.title;

  const postMedia = document.createElement("img");
  postMedia.classList = "single-image";
  if (post.media) {
    postMedia.src = post.media.url;
    postMedia.alt = post.media.alt;
  } else {
    postMedia.src = "https://i.imghippo.com/files/NbAO4967o.png";
    postMedia.alt = "Placeholder Still";
  }

  const postBody = document.createElement("p");
  postBody.classList = "text-center";
  postBody.textContent = post.body;
  postContainer.append(postMedia, postTitle, postBody);
  if (profileName === post.author.name) {
    const sendToEditButton = document.createElement("button");
    sendToEditButton.classList = "edit-button";
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
