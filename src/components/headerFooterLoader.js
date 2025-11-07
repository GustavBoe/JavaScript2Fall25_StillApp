import { pageHeader, userName, LOGGEDIN_PROFILE_URL } from "../utils/const.js";
import { logOut } from "../utils/storage.js";

export function createHeader() {
  const headerNavigation = document.createElement("nav");
  headerNavigation.id = "header-nav";
  headerNavigation.classList = "navbar navbar-expand-lg navbar-light bg-light ";
  const pageHeaderNav = document.getElementById("header-nav");

  if (!userName) {
    pageHeaderNav.innerHTML = `
    <h1>Still</h1>`;
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
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" href="./index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./index.html">Global</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./create.html">Create</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./profile.html/${userName}">Profile</a>
              </li>
              <li class="nav-item"> <button class=btn id="log-out-btn">Log out</button>
            </ul>
          </div>
        </div>`;
  }
}
