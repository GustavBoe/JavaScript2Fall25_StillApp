//This file will render a specific post//
import { POSTS_URL } from "../main.js";
const displayContainer = document.getElementById("display-container");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const PARAMETER_ID = urlParams.get("id");
const SINGEL_URL = `${POSTS_URL}/${PARAMETER_ID}`;
displayContainer.style.display = "none";
