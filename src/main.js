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
    let postSrc = "";
    let postAlt = "";
    if (posts[i].media === null || posts[i].media === undefined) {
      postSrc = "https://i.imghippo.com/files/AVMh8683c.png";
      postAlt = "Placeholder: Grey mountains and sun";
    } else {
      postSrc = posts[i].media.url;
      postAlt = "A post by" + `${posts[i].author.name}`;
    }
    displayContainer.innerHTML = `
<div>
<a href= "
./profile.html?name="${posts[i].author.name}>
<img src= ${posts[i].author.avatar.url} />
<p>${posts[i].author.name}</p>
</a>
<a href ="./post.html?id=${posts[i].id}">
<h2>${posts[i].title}</h2>
<img src=${postSrc} alt=${postAlt} />
<p>${posts[i].body}</p>
</a>
</div>
`;
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
