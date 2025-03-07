document.getElementById("signin-btn").addEventListener("click", () => {
  window.location.href = "/html/login.html";
});

const text = "Welcome to your Personal Assistant !";
let index = 0;

function typeLetter() {
  if (index < text.length) {
    document.getElementById("typing-text").innerHTML += text.charAt(index);
    index++;
  } else {
    clearInterval(typingInterval);
  }
}

const typingInterval = setInterval(typeLetter, 80);

document.getElementById("search").addEventListener("click", () => {
  window.location.href = "/html/login.html";
});
