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
  const profilePageBannerContainer = document.createElement("div");
  profilePageBannerContainer.classList = "w-full max-h-25 overflow-hidden";
  const profilePageBanner = document.createElement("img");
  profilePageBanner.src = profile.banner.url;
  profilePageBanner.alt = profile.banner.alt;
  profilePageBanner.classList = "object-cover";

  profilePageBannerContainer.append(profilePageBanner);

  const profileInfoContainer = document.createElement("div");
  profileInfoContainer.classList = "flex flex-row items-end gap-10 mt-5";
  const profilePageImageContainer = document.createElement("div");
  profilePageImageContainer.classList =
    "w-12 h-12 rounded-full overflow-hidden ml-10";
  const profilePageImage = document.createElement("img");
  profilePageImage.src = profile.avatar.url;
  profilePageImage.alt = profile.avatar.alt;
  profilePageImageContainer.append(profilePageImage);

  const profilePageUsername = document.createElement("h2");
  profilePageUsername.textContent = profile.name;
  profilePageUsername.classList = "font-medium";

  const followButton = document.createElement("button");
  followButton.textContent = "Follow";
  followButton.classList = "ml-10";
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
  profilePageBio.classList =
    "max-w-[70%] border border-black/30 p-2 break-words mt-5 mx-auto";

  profileInfoContainer.append(
    profilePageImageContainer,
    profilePageUsername,
    followButton,
    unfollowButton,
  );
  profileContainer.append(
    profilePageBannerContainer,
    profileInfoContainer,
    profilePageBio,
  );
}

async function renderPosts(posts) {
  for (let i = posts.length - 1; i >= 0; i--) {
    const postContainer = document.createElement("a");
    postContainer.setAttribute("href", `./post.html?id=${posts[i].id}`);
    postContainer.classList = "mx-auto";
    const profilePostImageContainer = document.createElement("div");
    profilePostImageContainer.classList = "overflow-hidden aspect-square";
    const profilePostImage = document.createElement("img");
    profilePostImage.classList = "h-full w-full object-cover";
    if (posts[i].media) {
      profilePostImage.src = posts[i].media.url;
    } else {
      profilePostImage.src = "https://i.imghippo.com/files/NbAO4967o.png";
    }

    profilePostImageContainer.append(profilePostImage);
    postContainer.append(profilePostImageContainer);

    profilePostsContainer.append(postContainer);
  }
  profilePostsContainer.classList = "grid grid-cols-2 md:grid-cols-3 gap-2";
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
