import { getFromLocalStorage } from "./utils/storage.js";

import {
  FEED_POSTS_URL,
  NOROFF_API_KEY,
  displayContainer,
  loggedOutText,
} from "./utils/const.js";
import { createHeader } from "./components/headerFooterLoader.js";

async function fetchPosts() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(FEED_POSTS_URL, fetchOptions);
    const json = await response.json();

    return json.data;
  } catch (error) {
    console.log(error);
  }
}

export async function generatePosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    const userContainer = document.createElement("a");
    userContainer.classList = "user-container-feed";
    userContainer.setAttribute(
      "href",
      `./profile.html?name=${posts[i].author.name}`
    );
    const profilePic = document.createElement("img");
    profilePic.src = posts[i].author.avatar.url;
    profilePic.classList = "profile-pic-feed";

    const profileUsername = document.createElement("p");
    profileUsername.textContent = posts[i].author.name;
    profileUsername.classList = "profile-username-feed";

    const postContainer = document.createElement("a");
    postContainer.setAttribute("href", `./post.html?id=${posts[i].id}`);
    postContainer.classList = "post-container-feed";

    const postTitle = document.createElement("h2");
    postTitle.textContent = posts[i].title;
    postTitle.classList = "post-title-feed";
    const postImage = document.createElement("img");
    postImage.classList = "post-image-feed";
    if (posts[i].media) {
      postImage.src = posts[i].media.url;
    } else {
      postImage.src = "https://i.imghippo.com/files/AVMh8683c.png";
    }

    const postBody = document.createElement("p");
    postBody.textContent = posts[i].body;
    postBody.classList = "post-body-feed";
    userContainer.append(profilePic, profileUsername);
    postContainer.append(postTitle, postImage, postBody);

    displayContainer.append(userContainer, postContainer);
  }
}

async function main() {
  createHeader();
  if (!localStorage.getItem("accessToken")) {
    displayContainer.innerHTML = loggedOutText;
    const loginButton = document.getElementById("login-button");
    const registerButton = document.getElementById("register-button");
    loginButton.addEventListener("click", onClickLogInButton);
    registerButton.addEventListener("click", onCLickRegisterButton);
  } else {
    try {
      const posts = await fetchPosts();
      generatePosts(posts);
    } catch (error) {
      console.log(error);
      alert("Something went wrong, please return later!");
    }
  }
}
function onClickLogInButton() {
  window.location.href = "./login.html";
}
function onCLickRegisterButton() {
  window.location.href = "./register.html";
}

main();
