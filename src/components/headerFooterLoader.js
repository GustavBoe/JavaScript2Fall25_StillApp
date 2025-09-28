import { pageHeader, profileName } from "../utils/const.js";
import { logOut } from "../utils/storage.js";

export function createHeader() {
  const headerNavigation = document.createElement("nav");
  headerNavigation.classList = "header-navigation ";

  const headerLogo = document.createElement("h1");
  headerLogo.textContent = "Still";
  headerLogo.classList = "header-logo tsukimi-rounded-regular";
  headerLogo.addEventListener("click", () => {
    location.href = "./index.html";
  });

  const globalLink = document.createElement("a");
  globalLink.setAttribute("href", "./index.html");
  globalLink.textContent = "Global";
  globalLink.classList = "header-global";

  const createLink = document.createElement("a");
  createLink.setAttribute("href", "./create.html");
  createLink.textContent = "Create";
  createLink.classList = "header-create";

  const profileLink = document.createElement("a");
  profileLink.setAttribute("href", `./profile.html?name=${profileName}`);
  profileLink.textContent = "Profile";
  profileLink.classList = "header-profile";

  const loginLink = document.createElement("a");
  loginLink.setAttribute("href", "./login.html");
  loginLink.textContent = "Login";

  const logOutButton = document.createElement("button");
  logOutButton.textContent = "Log out";
  logOutButton.addEventListener("click", logOut);
  logOutButton.classList = "header-button";

  headerNavigation.append(headerLogo);

  if (!profileName) {
    headerNavigation.append(loginLink);
  } else {
    headerNavigation.append(globalLink, createLink, profileLink, logOutButton);
  }
  pageHeader.append(headerNavigation);
}
