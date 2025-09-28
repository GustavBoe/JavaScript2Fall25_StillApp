export function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

export function logOut() {
  localStorage.clear();
  alert("Logged out! Sending you home");
  window.location.href = "./index.html";
}
