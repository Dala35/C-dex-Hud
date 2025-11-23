async function sendPrompt(){
  const input = document.getElementById('prompt');
  const prompt = input.value;
  if(!prompt) return;

  const res = await fetch('/chat',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({prompt})
  });

  const data = await res.json();

  displayMessage(prompt,true);
  displayMessage(data.response,false);
  speakMessage(data.response);

  // Atualizar HUD com ajustes
  for(const key in data.adjustments){
    const newVal = modulesState[key] + data.adjustments[key];
    modulesState[key] = Math.min(100, Math.max(0, newVal));
    document.getElementById('freq-'+key).style.width = modulesState[key]+'%';
  }

  input.value='';
}

// Canvas de energia vibracional
function drawCanvas(key){
  const canvas = document.getElementById('energy-'+key);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const height = modulesState[key] / 100 * canvas.height;
  ctx.fillStyle = '#66fcf1';
  ctx.fillRect(0,canvas.height-height,canvas.width,height);
}

// Atualização contínua
function renderCanvas(){
  for(const key in modulesState){
    drawCanvas(key);
  }
  requestAnimationFrame(renderCanvas);
}
renderCanvas();
