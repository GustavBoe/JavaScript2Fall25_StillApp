import { getFromLocalStorage } from "./utils/storage.js";
import {
  loggedOutText,
  profileContainer,
  profilePostsContainer,
  following,
  profileName,
} from "./utils/const.js";
import {
  fetchUsersPosts,
  fetchFollowing,
  followUser,
  unfollowUser,
} from "./api/apiClient.js";
import { createHeader } from "./components/headerFooterLoader.js";
fetchFollowing();
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
  profilePageUsername.classList = "profile-page-name";

  const followButton = document.createElement("button");
  followButton.textContent = "Follow";
  followButton.classList = "follow-button";
  followButton.addEventListener("click", followUser);

  const unfollowButton = document.createElement("button");
  unfollowButton.textContent = "Unfollow";
  unfollowButton.classList = "unfollow-button";
  unfollowButton.addEventListener("click", unfollowUser);

  if (profile.name === profileName) {
    followButton.style.display = "none";
    unfollowButton.style.display = "none";
  }
  if (following.includes(profile.name)) {
    followButton.style.display = "none";
  } else {
    unfollowButton.style.display = "none";
  }

  const profilePageBio = document.createElement("p");
  profilePageBio.textContent = profile.bio;

  profileContainer.append(
    profilePageBanner,
    profilePageImage,
    profilePageUsername,
    followButton,
    unfollowButton,
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

    postContainer.append(profilePostImage);
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
