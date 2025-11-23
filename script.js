let modulesState = {
  dala: 80, nzuri: 70, luminarius: 60,
  emilia: 75, zalaya: 90, sayu: 65, axekode: 85
};

const hud = document.querySelector('.hud');

function renderModules(){
  hud.innerHTML = '';
  for(const key in modulesState){
    hud.innerHTML += `
      <div class="module" id="mod-${key}" onclick="togglePortal('${key}')">
        <h3>${key.toUpperCase()}</h3>
        <div class="status">Status: Ativo</div>
        <div class="freq-bar"><div class="freq-fill" id="freq-${key}" style="width:${modulesState[key]}%"></div></div>
        <canvas id="energy-${key}" width="100" height="50"></canvas>
        <div class="description">Descrição do módulo ${key}</div>
      </div>
    `;
  }
}
renderModules();

function togglePortal(key){
  const desc = document.getElementById('mod-'+key).querySelector('.description');
  desc.style.display = desc.style.display==='block'?'none':'block';
}

async function updateModules(){
  const res = await fetch('/modules');
  const data = await res.json();
  modulesState = data;
  for(const key in data){
    document.getElementById('freq-'+key).style.width = data[key]+'%';
  }
}
setInterval(updateModules,1000);

// Chat
async function sendPrompt(){
  const input = document.getElementById('prompt');
  const prompt = input.value;
  if(!prompt) return;
  const res = await fetch('/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})});
  const data = await res.json();
  displayMessage(prompt,true);
  displayMessage(data.response,false);
  speakMessage(data.response);
  input.value='';
}

function displayMessage(text,isUser){
  const container = document.getElementById('responses');
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.style.background = isUser ? '#45a29e':'#1f2833';
  msg.textContent = text;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function speakMessage(text){
  if('speechSynthesis' in window){
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang='pt-BR';
    window.speechSynthesis.speak(utter);
  }
}
