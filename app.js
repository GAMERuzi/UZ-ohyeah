let selectedAI = null;

function selectAI(name) {
  selectedAI = name;
  document.getElementById("welcome").style.display = "none";
  document.getElementById("chat").style.display = "flex";
  document.getElementById("aiName").textContent = `Merhaba, ben ${name}`;

  const audio = new Audio(`voices/${name.toLowerCase()}.mp3`);
  audio.play();
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = "";

  const reply = `(${selectedAI}): ${message} (Bu cevap AI’dan gelecekti...)`;
  addMessage(reply, 'ai');

  const utterance = new SpeechSynthesisUtterance(reply);
  utterance.lang = 'tr-TR';
  speechSynthesis.speak(utterance);
}

function addMessage(text, sender) {
  const messages = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = `bubble ${sender === 'user' ? 'user-bubble' : 'ai-bubble'}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function requestCamera() {
  const video = document.getElementById("video");
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.style.display = "block";
    })
    .catch(() => alert("Kamera erişimi reddedildi."));
}

function generateImage() {
  const prompt = prompt("Nasıl bir görsel istiyorsun?");
  if (!prompt) return;
  addMessage(`Görsel: ${prompt}`, 'user');
  const img = document.createElement("img");
  img.src = `https://placehold.co/600x400?text=${encodeURIComponent(prompt)}`;
  img.style.marginTop = "10px";
  img.style.borderRadius = "8px";
  document.getElementById("messages").appendChild(img);
}
