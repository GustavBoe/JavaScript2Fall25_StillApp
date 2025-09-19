import { getFromLocalStorage } from "./utils/storage.js";
const BASE_API_URL = "https://v2.api.noroff.dev";
const POSTS_URL = `${BASE_API_URL}/social/posts`;
const NOROFF_API_KEY = "98235bd0-6bd9-4268-8607-233ca60225b3";
const displayContainer = document.getElementById("display-container");

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
async function generatePosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    const postContainer = document.createElement("div");

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
        <button>Log in</button>
        <p>Or</p>
        <button>Create new profile</button>
      </div>`;
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
main();
