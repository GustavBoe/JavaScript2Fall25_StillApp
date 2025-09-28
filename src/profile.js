import { getFromLocalStorage } from "./utils/storage.js";
import {
  loggedOutText,
  profileContainer,
  profilePostsContainer,
} from "./utils/const.js";
import { fetchUsersPosts } from "./api/apiClient.js";
import { createHeader } from "./components/headerFooterLoader.js";

async function renderProfile(profile) {
  const profilePageBanner = document.createElement("img");
  profilePageBanner.src = profile.banner.url;
  profilePageBanner.alt = profile.banner.alt;
  profilePageBanner.classList = "profile-page-banner";
  const profilePageImage = document.createElement("img");
  profilePageImage.src = profile.avatar.url;
  profilePageImage.alt = profile.avatar.alt;
  profilePageImage.classList = "profile-page-image";

  const profilePageUsername = document.createElement("h2");
  profilePageUsername.textContent = profile.name;

  const profilePageBio = document.createElement("p");
  profilePageBio.textContent = profile.bio;

  console.log(profile);

  profileContainer.append(
    profilePageBanner,
    profilePageImage,
    profilePageUsername,
    profilePageBio
  );
}
async function renderPosts(posts) {
  for (let i = posts.length - 1; i >= 0; i--) {
    const postContainer = document.createElement("a");
    postContainer.setAttribute("href", `./post.html?id=${posts[i].id}`);
    const profilePostImage = document.createElement("img");
    if (posts[i].media) {
      profilePostImage.src = posts[i].media.url;
    } else {
      profilePostImage.src = "https://i.imghippo.com/files/AVMh8683c.png";
    }
    profilePostImage.classList = "profile-post-image";
    const profilePostTitle = document.createElement("p");
    profilePostTitle.textContent = posts[i].title;
    profilePostTitle.classList = "profile-post-title";
    postContainer.append(profilePostImage, profilePostTitle);
    profilePostsContainer.append(postContainer);
  }
}

async function mainProfile() {
  createHeader();
  try {
    const profile = await fetchUsersPosts();
    const posts = profile.posts;

    renderProfile(profile);
    renderPosts(posts);
  } catch (error) {
    alert("Something went wrong", error);
  }
}
if (!getFromLocalStorage("accessToken")) {
  profileContainer.innerHTML = loggedOutText;
} else {
  mainProfile();
}
