import { pageHeader, profileName } from "../utils/const.js";
import { logOut } from "../utils/storage.js";

export function createHeader() {
  const headerNavigation = document.createElement("nav");
  headerNavigation.classList =
    "flex items-center justify-between mx-auto px-6 py-4 border-b";

  const headerLogo = document.createElement("h1");
  headerLogo.textContent = "Still";
  headerLogo.className =
    "font-tsukimi text-3xl font-medium cursor-pointer hover:opacity-70";
  headerLogo.addEventListener("click", () => {
    location.href = "./index.html";
  });
  const linksContainer = document.createElement("div");
  linksContainer.className = "flex items-center gap-6";

  const globalLink = document.createElement("a");
  globalLink.setAttribute("href", "./index.html");
  globalLink.textContent = "Global";
  globalLink.classList = "hover:opacity-70 cursor-pointer hover:underline";

  const createLink = document.createElement("a");
  createLink.setAttribute("href", "./create.html");
  createLink.textContent = "Create";
  createLink.classList = "hover:opacity-70 cursor-pointer hover:underline";

  const profileLink = document.createElement("a");
  profileLink.setAttribute("href", `./profile.html?name=${profileName}`);
  profileLink.textContent = "Profile";
  profileLink.classList = "hover:opacity-70 cursor-pointer hover:underline";

  const loginLink = document.createElement("a");
  loginLink.setAttribute("href", "./login.html");
  loginLink.textContent = "Login";
  loginLink.className = " hover:opacity-70 cursor-pointer hover:underline";

  const logOutButton = document.createElement("button");
  logOutButton.textContent = "Log out";
  logOutButton.addEventListener("click", logOut);
  logOutButton.classList = "hover:opacity-70 cursor-pointer hover:underline";

  if (!profileName) {
    linksContainer.append(loginLink);
  } else {
    linksContainer.append(globalLink, createLink, profileLink, logOutButton);
  }
  headerNavigation.append(headerLogo);
  headerNavigation.append(linksContainer);
  pageHeader.append(headerNavigation);
  pageHeader.classList.add("mb-15");
}
