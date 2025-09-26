import { getFromLocalStorage } from "./utils/storage.js";
import { loggedOutText, profileContainer } from "./utils/const.js";
import { fetchUser, fetchUsersPosts } from "./api/apiClient.js";

async function renderProfile() {
  const profile = await fetchUser();
  const profilePosts = await fetchUsersPosts();
  console.log(profile);
  console.log(profilePosts);
}

if (!getFromLocalStorage("accessToken")) {
  profileContainer.innerHTML = loggedOutText;
} else {
  renderProfile();
}
