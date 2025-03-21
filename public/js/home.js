document.addEventListener("DOMContentLoaded", () => {
  // typing animation
  const typingText = document.getElementById("typing-text");
  function initTypeAnimation() {
    const text = typingText.getAttribute("data-text");
    typingText.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    typeWriter();
  }
  initTypeAnimation(); //typing animation at reload

  // --------------------Logout functionality------------
  const logoutBtn = document.querySelector(".logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "/logout";
    });
  }

  //Settings popup---------------------------------------

  const profile = document.querySelector(".profile");
  const settings = document.querySelector(".settings");

  profile.addEventListener("click", (event) => {
    // Toggle settings menu visibility
    settings.classList.toggle("active");

    // Prevent the click from propagating to the document (to avoid immediate closing)
    event.stopPropagation();
  });

  // Hide settings when clicking anywhere outside
  document.addEventListener("click", (event) => {
    if (!settings.contains(event.target) && !profile.contains(event.target)) {
      settings.classList.remove("active");
    }
  });

  //file-uplaod-----------------------------------------

  const fileInput = document.querySelector("#file-input");
  const textInput = document.querySelector("#text-input");
  const sendButton = document.querySelector(".send");

  sendButton.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!fileInput.files.length && !textInput.value.trim()) {
      alert("Please enter text or select a file.");
      return;
    }

    const formData = new FormData();
    if (fileInput.files.length) {
      formData.append("file-input", fileInput.files[0]);
    }
    if (textInput.value.trim()) {
      formData.append("text-input", textInput.value.trim());
    }

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Upload Successful!");
        fileInput.value = "";
        textInput.value = "";
      } else {
        alert("Uplaod failed");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Something went wrong. Please try again.");
    }
  });

  //Message send animation-------------------------------------
  async function sendMessage() {
    let userInput = document.querySelector("#user-input").value;
    let chatBox = document.querySelector("#chat-box");
    if (userInput === "") {
      alert("Write some thing");
      typingText.style.display = "none";
    } else {
      let userMessage = document.createElement("div");
      userMessage.classList.add("message", "user");
      userMessage.innerHTML = `<p>${userInput}</p>`;
      chatBox.appendChild(userMessage);
      document.querySelector("#user-input").value = "";
      chatBox.scrollTop = chatBox.scrollHeight;

      typingText.style.display = "none";

      let response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      let data = await response.json();
      let botMessage = document.createElement("div");
      botMessage.classList.add("message", "bot");
      botMessage.innerHTML = `<p>${data.replay}</p>`;
      chatBox.appendChild(botMessage);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  function uploadFile() {
    let fileInput = document.getElementById("file-input");
    let file = fileInput.files[0];
    if (file) {
      alert("File uploaded: " + file.name);
    }
  }
});

// --- -- - - -- -- - - - - - - - - -- - -
function displayFile() {
  const input = document.getElementById('file-input');
  const fileName = document.getElementById('file-name');
  const previewContainer = document.getElementById('preview-container');
  const previewImage = document.getElementById('file-preview');
  const fileIcon = document.getElementById('file-icon');
  const removeButton = document.getElementById('remove-btn');

  if (input.files.length > 0) {
      const file = input.files[0];
      fileName.textContent = file.name;
      previewContainer.style.display = 'flex';
      removeButton.style.display = 'flex'; // Show remove button

      // Check file type
      if (file.type.startsWith('image/')) {
          // Show image preview
          const reader = new FileReader();
          reader.onload = function (e) {
              previewImage.src = e.target.result;
              previewImage.style.display = "block";
              fileIcon.style.display = "none"; // Hide file icon
          };
          reader.readAsDataURL(file);
      } else {
          // Show file type icon
          previewImage.style.display = "none";
          fileIcon.style.display = "block";
          fileIcon.src = getFileIcon(file.type);
      }
  } else {
      removeFile(); // Reset everything if no file is chosen
  }
}

function removeFile() {
  const input = document.getElementById('file-input');
  const fileName = document.getElementById('file-name');
  const previewContainer = document.getElementById('preview-container');
  const previewImage = document.getElementById('file-preview');
  const fileIcon = document.getElementById('file-icon');
  const removeButton = document.getElementById('remove-btn');

  input.value = ""; // Reset input
  fileName.textContent = "No file chosen";
  previewContainer.style.display = 'none'; // Hide preview container
  previewImage.style.display = "none"; // Hide image preview
  fileIcon.style.display = "none"; // Hide file icon
  removeButton.style.display = "none"; // Hide remove button
}

function getFileIcon(fileType) {
  // Assign icons based on file type
  if (fileType.includes("pdf")) return "https://cdn-icons-png.flaticon.com/512/337/337946.png"; // PDF icon
  if (fileType.includes("audio")) return "https://cdn-icons-png.flaticon.com/512/2305/2305955.png"; // Audio icon
  if (fileType.includes("video")) return "https://cdn-icons-png.flaticon.com/512/2991/2991100.png"; // Video icon
  if (fileType.includes("word")) return "https://cdn-icons-png.flaticon.com/512/732/732220.png"; // Word doc icon
  if (fileType.includes("excel")) return "https://cdn-icons-png.flaticon.com/512/732/732228.png"; // Excel icon
  if (fileType.includes("text")) return "https://cdn-icons-png.flaticon.com/512/159/159603.png"; // Text file icon
  return "https://cdn-icons-png.flaticon.com/512/833/833524.png"; // Generic file icon
}
