import { getFromLocalStorage } from "./storage.js";

export const BASE_API_URL = "https://v2.api.noroff.dev";
export const POSTS_URL = `${BASE_API_URL}/social/posts`;
export const NOROFF_API_KEY = "98235bd0-6bd9-4268-8607-233ca60225b3";
export const headId = document.title;
export const userName = getFromLocalStorage("profileName");
//authServices.js
export const AUTH_REGISTER_URL = `${BASE_API_URL}/auth/register`;

export const registerForm = document.querySelector(`#register-form`);

//postsServices.js

export const createForm = document.querySelector("#create-form");
//login.js
export const AUTH_LOGIN_URL = `${BASE_API_URL}/auth/login`;
export const loginForm = document.querySelector("#login-form");
export const logoutButton = document.getElementById("logout-button");

//Main.js//
export const displayContainer = document.getElementById("display-container");
export const loginButton = document.getElementById("login-button");
export const registerButton = document.getElementById("register-button");

//singlePost.js//
export const singlePostContainer = document.getElementById(
  "single-post-container"
);
export const queryString = window.location.search;
export const urlParams = new URLSearchParams(queryString);
export const PARAMETER_ID = urlParams.get("id");
export const SINGLE_URL = `${POSTS_URL}/${PARAMETER_ID}?_author=true`;
export const profileName = getFromLocalStorage("profileName");

//editPost.js
export const EDIT_URL = `${POSTS_URL}/${PARAMETER_ID}`;
export const editSubmitButton = document.getElementById("edit");
export const editForm = document.querySelector("#edit-form");
export const editFormTitle = document.getElementById("title");
export const editFormBody = document.getElementById("body");
export const editFormUrl = document.getElementById("url");
export const editFormAlt = document.getElementById("alt");
export const deleteButton = document.getElementById("delete-button");
