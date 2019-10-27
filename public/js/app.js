const form = document.querySelector("form");
const input = document.querySelector(".searchInput");

form.addEventListener("submit", e => {
  e.preventDefault();
  getData();
});

document.querySelector(".button").addEventListener("click", getData);

function getData() {
  fetch(`weather?address=${input.value}`).then(response =>
    response.json().then(data => {
      document.querySelector(".message-1").textContent = data.forecast;
      document.querySelector(".message-2").textContent = data.location;
      input.value = "";
    })
  );
}
