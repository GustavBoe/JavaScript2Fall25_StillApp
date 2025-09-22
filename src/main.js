import { getFromLocalStorage } from "./utils/storage.js";

import { POSTS_URL, NOROFF_API_KEY, displayContainer } from "./utils/const.js";

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
    const postContainer = document.createElement("a");
    postContainer.setAttribute("href", `./post.html?id=${posts[i].id}`);

    const postTitle = document.createElement("h2");
    postTitle.textContent = posts[i].title;

    const postBody = document.createElement("p");
    postBody.textContent = posts[i].body;

    postContainer.append(postTitle, postBody);

    displayContainer.append(postContainer);
  }
}

async function main() {
  if (!localStorage.getItem("accessToken")) {
    displayContainer.innerHTML = `
    <h1>Still</h1>
      <p>Get started at Still!</p>
      <div class="index-button-container">
        <button id="login-button">Log in</button>
        <p>Or</p>
        <button id="register-button">Create new profile</button>
      </div>`;
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
