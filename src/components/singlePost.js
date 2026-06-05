//This file will render a specific post//
import { singlePostContainer, profileName } from "../utils/const.js";

import { fetchSinglePost } from "..//api/apiClient.js";
import { createHeader } from "./headerFooterLoader.js";

async function generateSinglePost(post) {
  const postContainer = document.createElement("div");
  postContainer.classList =
    "mx-auto max-w-[80%] flex flex-col items-center gap-5 h-fit";
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

  const profileContainer = document.createElement("div");
  profileContainer.classList =
    "h-20 w-[80%] border-2 flex space-around items-center pl-5 gap-3 hover:bg-black hover:text-white hover:border-white";

  const profileImageContainer = document.createElement("div");
  profileImageContainer.classList =
    "h-15 w-15 rounded-full border overflow-hidden";

  const profileImage = document.createElement("img");
  profileImage.src = post.author.avatar.url;
  profileImage.alt = post.author.avatar.alt;

  const postAuthorLink = document.createElement("a");
  postAuthorLink.setAttribute(
    "href",
    `./profile.html?name=${post.author.name}`,
  );
  postAuthorLink.textContent = `${post.author.name}`;
  profileImageContainer.append(profileImage);
  profileContainer.append(profileImageContainer, postAuthorLink);
  postContainer.append(postMedia, postTitle, postBody, profileContainer);
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
