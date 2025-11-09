import { pageHeader, userName, LOGGEDIN_PROFILE_URL } from "../utils/const.js";
import { logOut } from "../utils/storage.js";

//Header section taken from Noroff css-frameworks module 1
export function createHeader() {
  const headerNavigation = document.createElement("nav");
  headerNavigation.id = "header-nav";
  headerNavigation.classList =
    "navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between";
  const pageHeaderNav = document.getElementById("header-nav");

  if (!userName) {
    pageHeaderNav.innerHTML = `<div class="container-fluid">
          <a
            class="navbar-brand tsukimi-rounded-regular --bs-body-bg"
            href="./index.html"
            >Still</a
          >
         <a class="btn btn-outline-dark" href= "./login.html">Log in</a>
          </div>`;
  } else {
    pageHeaderNav.innerHTML = `
   <div class="container-fluid">
          <a
            class="navbar-brand tsukimi-rounded-regular --bs-body-bg"
            href="./index.html"
            >Still</a
          >
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse align-items-center" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" href="./index.html">Home</a>
              </li>
             
              <li class="nav-item">
                <a class="nav-link" href="./create.html">Create</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./profile.html?name=${userName}">Profile</a>
              </li>
              <li class="nav-item"> <button class="mt-2 m-0 pt-0 pb-0 btn btn-danger btn-sm" id="log-out-btn">Log out</button>
            </ul>
          </div>
        </div>`;
    document.getElementById("log-out-btn").addEventListener("click", logOut);
  }
}
