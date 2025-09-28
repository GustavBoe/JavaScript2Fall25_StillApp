import { addToLocalStorage, getFromLocalStorage } from "..//utils/storage.js";

import {
  NOROFF_API_KEY,
  SINGLE_URL,
  PROFILE_URL,
  PROFILE_POSTS_URL,
  FOLLOW_PROFILE_URL,
  UNFOLLOW_PROFILE_URL,
  LOGGEDIN_PROFILE_URL,
} from "..//utils/const.js";

export async function fetchSinglePost() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(SINGLE_URL, fetchOptions);
    const json = await response.json();

    return json.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUser() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(PROFILE_URL, fetchOptions);
    const json = await response.json();
    return json.data;
  } catch (error) {
    window.location.href = "./index.html";
    console.log(error);
  }
}
export async function fetchFollowing() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(LOGGEDIN_PROFILE_URL, fetchOptions);
    const json = await response.json();
    const following = json.data.following;
    const followingNames = following.map((follow) => follow.name);
    addToLocalStorage("followingNames", followingNames);
  } catch (error) {
    window.location.href = "./index.html";
    console.log(error);
  }
}
export async function fetchUsersPosts() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(PROFILE_POSTS_URL, fetchOptions);
    const json = await response.json();
    return json.data;
  } catch (error) {
    window.location.href = "./index.html";
    console.log(error);
  }
}
/**
 * Adds the viewed profile to the users _following tag
 * */
export async function followUser() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(FOLLOW_PROFILE_URL, fetchOptions);
    if (response.ok) {
      location.reload();
    }
  } catch (error) {
    alert("Could not follow user, please return to homepage");
    console.log(error[0].message);
  }
}
export async function unfollowUser() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(UNFOLLOW_PROFILE_URL, fetchOptions);
    if (response.ok) {
      location.reload();
    }
  } catch (error) {
    alert("Could not follow user, please return to homepage");
    console.log(error[0].message);
  }
}
