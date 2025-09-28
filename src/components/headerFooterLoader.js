import { pageHeader, profileName } from "../utils/const.js";
import { logOut } from "../utils/storage.js";

export function createHeader() {
  const headerNavigation = document.createElement("nav");

  const headerLogo = document.createElement("h1");
  headerLogo.textContent = "Still";

  const globalLink = document.createElement("a");
  globalLink.setAttribute("href", "./index.html");
  globalLink.textContent = "Global";

  const followLink = document.createElement("a");
  followLink.setAttribute("href", "./followfeed.html");
  followLink.textContent = "Follows";

  const createLink = document.createElement("a");
  createLink.setAttribute("href", "./create.html");
  createLink.textContent = "Create";

  const profileLink = document.createElement("a");
  profileLink.setAttribute("href", `./profile.html?name=${profileName}`);
  profileLink.textContent = "Profile";

  const loginLink = document.createElement("a");
  loginLink.setAttribute("href", "./login.html");
  loginLink.textContent = "Login";

  const logOutButton = document.createElement("button");
  logOutButton.textContent = "Log out";
  logOutButton.addEventListener("click", logOut);

  headerNavigation.append(headerLogo);

  if (!profileName) {
    headerNavigation.append(loginLink);
  } else {
    headerNavigation.append(
      globalLink,
      followLink,
      createLink,
      profileLink,
      logOutButton
    );
  }
  pageHeader.append(headerNavigation);
}
