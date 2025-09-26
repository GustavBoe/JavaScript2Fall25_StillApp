import { getFromLocalStorage } from "./utils/storage.js";

import {
  POSTS_URL,
  NOROFF_API_KEY,
  displayContainer,
  loggedOutText,
} from "./utils/const.js";

async function fetchPosts() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(POSTS_URL, fetchOptions);
    const json = await response.json();

    return json.data;
  } catch (error) {
    console.log(error);
  }
}

export async function generatePosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    const userContainer = document.createElement("div");
    userContainer.classList = "user-container-feed";

    const profilePic = document.createElement("img");
    profilePic.src = posts[i].author.avatar.url;
    profilePic.classList = "profile-pic-feed";

    const profileUsername = document.createElement("p");
    profileUsername.textContent = posts[i].author.name;
    profileUsername.classList = "profile-username-feed";

    const postContainer = document.createElement("a");
    postContainer.setAttribute("href", `./post.html?id=${posts[i].id}`);

    const postTitle = document.createElement("h2");
    postTitle.textContent = posts[i].title;
    const postImage = document.createElement("img");
    postImage.classList = "feedImage";
    if (posts[i].media) {
      postImage.src = posts[i].media.url;
    } else {
      postImage.src = "https://i.imghippo.com/files/AVMh8683c.png";
    }

    const postBody = document.createElement("p");
    postBody.textContent = posts[i].body;
    userContainer.append(profilePic, profileUsername);
    postContainer.append(postTitle, postImage, postBody);

    displayContainer.append(userContainer, postContainer);
  }
}

async function main() {
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
      alert("Something wnt wrong, please return later!");
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
