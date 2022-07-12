let state = "";

document.querySelector("button").addEventListener("click", () => {
  state = "state change";
  console.log(state);
});

document.querySelector("h1").textContent = state;

document.querySelector("p").textContent = state;
