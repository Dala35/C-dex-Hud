async function sendPrompt(){
  const prompt = document.getElementById('prompt').value;
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

  // Atualiza módulos
  for(const key in data.adjustments){
    modulesState[key] = Math.min(100, Math.max(0, modulesState[key]+data.adjustments[key]));
    document.getElementById('freq-'+key).style.width = modulesState[key]+'%';
  }

  input.value='';
}

// Canvas de fluxo cognitivo com portais automáticos
function drawFlow(){
  const canvas = document.getElementById('logCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const keys = Object.keys(modulesState);
  for(let i=0;i<keys.length;i++){
    for(let j=i+1;j<keys.length;j++){
      const x1 = (i+0.5)*(canvas.width/keys.length);
      const y1 = canvas.height - modulesState[keys[i]]/100*canvas.height;
      const x2 = (j+0.5)*(canvas.width/keys.length);
      const y2 = canvas.height - modulesState[keys[j]]/100*canvas.height;

      ctx.strokeStyle = `rgba(102,252,241,${Math.abs(modulesState[keys[i]]-modulesState[keys[j]])/100})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.stroke();
    }
  }
  requestAnimationFrame(drawFlow);
}

drawFlow();

