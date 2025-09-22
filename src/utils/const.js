export const BASE_API_URL = "https://v2.api.noroff.dev";
export const POSTS_URL = `${BASE_API_URL}/social/posts`;
export const NOROFF_API_KEY = "98235bd0-6bd9-4268-8607-233ca60225b3";
//authServices.js
export const AUTH_REGISTER_URL = `${BASE_API_URL}/auth/register`;

export const registerForm = document.querySelector(`#register-form`);
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
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const PARAMETER_ID = urlParams.get("id");
export const SINGLE_URL = `${POSTS_URL}/${PARAMETER_ID}`;
