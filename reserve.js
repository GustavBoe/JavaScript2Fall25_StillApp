const postMedia = document.createElement("img");
postMedia.src = posts[i].media.url;
postMedia.alt = posts[i].media.alt;

console.log("single post");
let i = 0;
const postContainer = document.createElement("div");
const postTitle = document.createElement("h1");
postTitle.textContent = posts[i].title;

const postBody = document.createElement("p");
postBody.textContent = posts[i].body;

postContainer.append(postTitle, postBody);

singlePostContainer.append(postContainer);

const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
loginButton.addEventListener("click", onClickLogInButton);
registerButton.addEventListener("click", onCLickRegisterButton);
