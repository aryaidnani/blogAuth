const authText = document.querySelector(".authText");
const authBtn = document.querySelector(".vbutton");
const authModal = document.querySelector(".authModal");

(async function render() {
  const response = await fetch("http://localhost:443/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify({ password: "1234" }),
  });

  const messageEl = await response.json();

  if (messageEl.message === "verified") {
    authModal.classList.toggle("hidden");
  }
})();

authBtn.addEventListener("click", async () => {
  const attemptPass = authText.value;

  const response = await fetch("http://localhost:443/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify({ password: attemptPass }),
  });

  const data = await response.json();
  localStorage.setItem("token", data.token);
  if (data.message === "Success") {
    authModal.classList.toggle("hidden");
  }
});
