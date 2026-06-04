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
    const eachPostContainer = document.createElement("div");
    eachPostContainer.classList = "mb-5 flex flex-col gap-2 min-w-100";
    const userContainer = document.createElement("a");
    userContainer.classList = "flex items-center  gap-2";
    userContainer.setAttribute(
      "href",
      `./profile.html?name=${posts[i].author.name}`,
    );
    const profilePicContainer = document.createElement("div");
    profilePicContainer.classList = "h-15 w-15 overflow-clip rounded-full";
    const profilePic = document.createElement("img");

    profilePic.src = posts[i].author.avatar.url;
    profilePic.onerror = () => {
      profilePic.src = "https://i.imghippo.com/files/IZs8626q.png";
    };
    profilePicContainer.append(profilePic);
    const profileUsername = document.createElement("p");
    profileUsername.textContent = posts[i].author.name;

    const postContainer = document.createElement("a");
    postContainer.setAttribute("href", `./post.html?id=${posts[i].id}`);
    postContainer.classList = "post-container-feed";

    const postTitle = document.createElement("h2");
    postTitle.textContent = posts[i].title;
    postTitle.classList = "mt-2 font-medium pl-2";

    const postImageContainer = document.createElement("div");
    postImageContainer.classList = "h-50 w-100 overflow-hidden border";
    const postImage = document.createElement("img");
    postImage.classList = "object-cover w-full h-full";
    if (
      posts[i].media === null ||
      posts[i].media.url === undefined ||
      posts[i].media.url.includes("https://i.imgur.com")
    ) {
      postImage.src = "https://i.imghippo.com/files/NbAO4967o.png";
    } else {
      postImage.src = posts[i].media.url;
    }

    postImageContainer.append(postImage);
    const postBody = document.createElement("p");
    if (posts[i].body.length >= 50) {
      postBody.textContent = posts[i].body.slice(0, 50) + "...";
    } else {
      postBody.textContent = posts[i].body.slice(0, 49);
    }

    postBody.classList = "max-w-100 opacity-50";
    userContainer.append(profilePicContainer, profileUsername);
    postContainer.append(postImageContainer, postTitle);

    eachPostContainer.append(userContainer, postContainer);
    displayContainer.append(eachPostContainer);
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
