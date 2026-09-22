import './style.css';

const icons = {
  atom: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/></svg>`,
  play: `<svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7z"/></svg>`,
  pause: `<svg viewBox="0 0 24 24"><path d="M9 5v14M15 5v14"/></svg>`,
  reset: `<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.6M4 4v4.6h4.6"/></svg>`,
  sliders: `<svg viewBox="0 0 24 24"><path d="M4 6h6M14 6h6M10 3v6M4 18h10M18 18h2M14 15v6M4 12h2M10 12h10M6 9v6"/></svg>`,
  chart: `<svg viewBox="0 0 24 24"><path d="M4 19V9m6 10V5m6 14v-7m5 7H2"/></svg>`,
  search: `<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>`,
  download: `<svg viewBox="0 0 24 24"><path d="M12 3v12m-5-5 5 5 5-5M4 20h16"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>`
};

const app = document.querySelector('#app');
app.innerHTML = `
  <header class="topbar">
    <a class="brand" href="#">${icons.atom}<span>STARPOINTS</span><b>LAB</b></a>
    <nav><button class="nav-item active" data-view="simulation">SIMULATION</button><button class="nav-item" data-view="search">AUTO SEARCH</button><button class="nav-item" data-view="results">RESULTS <em>12</em></button></nav>
    <div class="header-actions"><span class="status"><i></i> ENGINE READY</span><button class="icon-btn" id="export" title="設定を書き出す">${icons.download}</button><button class="avatar">YK</button></div>
  </header>
  <main>
    <section class="view active" id="simulation-view">
      <div class="workspace">
        <aside class="controls panel">
          <div class="side-title"><div><span class="eyebrow">EXPERIMENT 01</span><h1>Particle model</h1></div><button class="dots">•••</button></div>
          <div class="control-section open">
            <button class="section-head"><span>System</span>${icons.chevron}</button>
            <div class="section-body">
              <div class="field-row"><label>Particles <small>N</small></label><div class="number"><input id="particle-count" type="number" value="256" min="50" max="800"><span>—</span></div></div>
              <div class="field-row"><label>Density <small>ρ</small></label><div class="number"><input id="density" type="number" value="0.65" step="0.05"><span>σ⁻²</span></div></div>
              <div class="field-row"><label>Container radius <small>R</small></label><div class="number"><input value="11.20"><span>σ</span></div></div>
            </div>
          </div>
          <div class="control-section open">
            <button class="section-head"><span>Patch geometry</span><span class="section-tag">SPECIES A</span>${icons.chevron}</button>
            <div class="section-body">
              <div class="field-row"><label>Rotational symmetry <small>m</small></label><div class="stepper"><button>−</button><input id="symmetry" value="5"><button>+</button></div></div>
              <div class="range-field"><div><label>Patch width</label><output id="patch-output">0.18 rad</output></div><input id="patch-width" type="range" min="0.08" max="0.5" value="0.18" step="0.01"></div>
              <div class="range-field"><div><label>Angular strength</label><output id="strength-output">1.40 ε</output></div><input id="strength" type="range" min="0" max="3" value="1.4" step="0.05"></div>
            </div>
          </div>
          <div class="control-section open">
            <button class="section-head"><span>Radial potential</span><span class="section-tag">2 WELLS</span>${icons.chevron}</button>
            <div class="section-body wells">
              <div class="well-head"><b>01</b><span>r₁</span><span>D₁</span><span>w₁</span></div><div class="well-row"><i class="well-dot one"></i><input value="1.00"><input value="1.00"><input value="0.12"></div>
              <div class="well-head"><b>02</b><span>r₂</span><span>D₂</span><span>w₂</span></div><div class="well-row"><i class="well-dot two"></i><input value="1.73"><input value="0.72"><input value="0.18"></div>
              <button class="text-btn">＋ ADD DISTANCE WELL</button>
            </div>
          </div>
          <div class="control-section open">
            <button class="section-head"><span>Dynamics</span>${icons.chevron}</button>
            <div class="section-body">
              <div class="field-row"><label>Temperature <small>T</small></label><div class="number"><input id="temperature" value="0.086"><span>ε/kB</span></div></div>
              <div class="field-row"><label>Timestep <small>dt</small></label><div class="number"><input value="0.002"><span>τ</span></div></div>
            </div>
          </div>
        </aside>
        <section class="stage panel">
          <div class="stage-toolbar">
            <div><span class="live-dot"></span><b>LIVE SIMULATION</b><span class="mono" id="step-label">STEP 048,320</span></div>
            <div class="toolbar-tools"><label><input id="patch-toggle" type="checkbox" checked><span></span> PATCHES</label><label><input id="bond-toggle" type="checkbox"><span></span> BONDS</label><button id="reset" class="tool">${icons.reset}</button></div>
          </div>
          <div class="canvas-wrap"><canvas id="particle-canvas"></canvas><div class="axis"><span>Y</span><i></i><b></b><em>X</em></div><div class="scale">2σ <i></i></div><div class="temperature-badge"><span>T</span><b id="temp-badge">0.086</b><small>ε/kB</small></div></div>
          <div class="transport"><button id="pause">${icons.pause}</button><div><b id="run-status">RUNNING</b><span>BAOAB · SEED 240921</span></div><div class="timeline"><i></i><span></span></div><div class="time"><b id="sim-time">96.64</b><span> / 200.00 τ</span></div><select><option>1×</option><option>2×</option><option>4×</option></select></div>
        </section>
        <aside class="analysis panel">
          <div class="analysis-head"><span class="eyebrow">STRUCTURE ANALYSIS</span><div class="score"><span>QC SCORE</span><b id="score">0.742</b><small>↑ 0.018</small></div></div>
          <article class="analysis-card reciprocal"><header><div><h3>Reciprocal space</h3><span>S(k) · BULK r &lt; 0.8R</span></div><button>↗</button></header><canvas id="diffraction-canvas"></canvas><div class="ring-label">k* = 6.24 σ⁻¹</div></article>
          <article class="analysis-card order"><header><div><h3>Rotational order</h3><span>MAIN RING · LIVE</span></div></header><div class="order-row"><label>Q₁₂ <i>target</i></label><div><span style="width:78%"></span></div><b class="cyan">0.782</b></div><div class="order-row"><label>Q₁₀</label><div><span style="width:21%"></span></div><b>0.214</b></div><div class="order-row"><label>Q₈</label><div><span style="width:13%"></span></div><b>0.128</b></div><div class="order-row"><label>Q₆ <i class="warn">rival</i></label><div><span class="orange" style="width:31%"></span></div><b class="orange-text">0.306</b></div><div class="order-row"><label>Q₄</label><div><span style="width:9%"></span></div><b>0.087</b></div></article>
          <article class="analysis-card mini-chart"><header><div><h3>Order history</h3><span>LAST 20τ</span></div><div class="legend"><i></i>Q₁₂ <i></i>Q₆</div></header><canvas id="history-canvas"></canvas></article>
          <div class="stats"><div><span>BRAGG SHARPNESS</span><b>0.681</b></div><div><span>EDGE BIAS</span><b>0.043</b></div><div><span>WALL VIOLATIONS</span><b class="good">0</b></div><div><span>ENERGY / N</span><b>−2.817 ε</b></div></div>
        </aside>
      </div>
    </section>
    <section class="view placeholder" id="search-view"><div>${icons.search}<span class="eyebrow">PARAMETER DISCOVERY</span><h2>Auto Search</h2><p>Sobol sampling、Successive Halving、CMA-ES で<br>準周期構造の有望な領域を探索します。</p><button class="primary view-sim">CONFIGURE SEARCH</button></div></section>
    <section class="view placeholder" id="results-view"><div>${icons.chart}<span class="eyebrow">12 SAVED CANDIDATES</span><h2>Candidate results</h2><p>複数 seed の平均スコアと回折パターンを比較し、<br>最良候補を大規模系で再検証します。</p><button class="primary view-sim">VIEW BEST CANDIDATE</button></div></section>
  </main>`;

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
$$('.section-head').forEach(b => b.addEventListener('click', () => b.parentElement.classList.toggle('open')));
$$('.nav-item').forEach(b => b.addEventListener('click', () => switchView(b.dataset.view)));
$$('.view-sim').forEach(b => b.addEventListener('click', () => switchView('simulation')));
function switchView(name) { $$('.nav-item').forEach(x => x.classList.toggle('active', x.dataset.view === name)); $$('.view').forEach(x => x.classList.toggle('active', x.id === `${name}-view`)); }

let running = true, step = 48320, time = 96.64;
$('#pause').addEventListener('click', () => { running = !running; $('#pause').innerHTML = running ? icons.pause : icons.play; $('#run-status').textContent = running ? 'RUNNING' : 'PAUSED'; });
$('#reset').addEventListener('click', resetParticles);
['patch-width','strength'].forEach(id => $(`#${id}`).addEventListener('input', e => $(`#${id === 'strength' ? 'strength' : 'patch'}-output`).textContent = `${Number(e.target.value).toFixed(2)} ${id === 'strength' ? 'ε' : 'rad'}`));
$('#temperature').addEventListener('input', e => $('#temp-badge').textContent = e.target.value);
$('.stepper button:first-child').onclick = () => $('#symmetry').value = Math.max(3, +$('#symmetry').value - 1);
$('.stepper button:last-child').onclick = () => $('#symmetry').value = Math.min(12, +$('#symmetry').value + 1);
$('#export').onclick = () => { const blob = new Blob([JSON.stringify({version:'1.0', seed:240921, particles:{N:+$('#particle-count').value,density:+$('#density').value},species:[{name:'A',symmetry:+$('#symmetry').value,patchWidth:+$('#patch-width').value}],temperature:{current:+$('#temperature').value}}, null, 2)], {type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='starpoints-experiment.json'; a.click(); URL.revokeObjectURL(a.href); };

const pc = $('#particle-canvas'), pctx = pc.getContext('2d');
const dc = $('#diffraction-canvas'), dctx = dc.getContext('2d');
const hc = $('#history-canvas'), hctx = hc.getContext('2d');
let particles=[];
function rand(i){ const x=Math.sin(i*938.23+240921)*43758.545; return x-Math.floor(x); }
function resetParticles(){ particles=[]; const n=Math.min(320,+$('#particle-count').value||256); for(let i=0;i<n;i++){const a=rand(i)*Math.PI*2, rad=Math.sqrt(rand(i+600))*0.91; particles.push({x:Math.cos(a)*rad,y:Math.sin(a)*rad,vx:(rand(i+900)-.5)*.0007,vy:(rand(i+1200)-.5)*.0007,a:rand(i+1500)*Math.PI*2});} step=0;time=0; }
resetParticles();
function fit(canvas){const r=canvas.getBoundingClientRect(), d=devicePixelRatio||1;if(canvas.width!==Math.round(r.width*d)||canvas.height!==Math.round(r.height*d)){canvas.width=r.width*d;canvas.height=r.height*d;}return [r.width,r.height,d];}
function drawParticles(){const [w,h,d]=fit(pc);pctx.setTransform(d,0,0,d,0,0);pctx.clearRect(0,0,w,h);const cx=w/2,cy=h/2,R=Math.min(w,h)*.435;
  const glow=pctx.createRadialGradient(cx,cy,0,cx,cy,R);glow.addColorStop(0,'rgba(35,175,151,.035)');glow.addColorStop(1,'rgba(35,175,151,0)');pctx.fillStyle=glow;pctx.beginPath();pctx.arc(cx,cy,R,0,7);pctx.fill();pctx.strokeStyle='#53615e';pctx.lineWidth=1;pctx.setLineDash([3,5]);pctx.stroke();pctx.setLineDash([]);
  for(let i=0;i<particles.length;i++){const p=particles[i];if(running){p.x+=p.vx;p.y+=p.vy;p.a+=.0015;if(Math.hypot(p.x,p.y)>.92){const q=Math.hypot(p.x,p.y),nx=p.x/q,ny=p.y/q,dot=p.vx*nx+p.vy*ny;p.vx-=1.85*dot*nx;p.vy-=1.85*dot*ny;p.x=nx*.918;p.y=ny*.918;} p.vx+=(Math.sin(i*13+step*.01))*1e-7;p.vy+=(Math.cos(i*7+step*.013))*1e-7;}
    const x=cx+p.x*R,y=cy+p.y*R,rr=Math.max(2.3,R*.012);pctx.fillStyle=i%17===0?'#d9a35f':'#4cc9ba';pctx.globalAlpha=.74;pctx.beginPath();pctx.arc(x,y,rr,0,7);pctx.fill();pctx.globalAlpha=1;pctx.strokeStyle=i%17===0?'#f4bf76':'#9ae9df';pctx.lineWidth=.6;pctx.stroke();
    if($('#patch-toggle').checked && i<180){pctx.strokeStyle=i%17===0?'rgba(244,191,118,.65)':'rgba(145,232,220,.55)';pctx.lineWidth=.55;const m=+$('#symmetry').value||5;for(let k=0;k<m;k++){const a=p.a+k*Math.PI*2/m;pctx.beginPath();pctx.moveTo(x+Math.cos(a)*rr*.5,y+Math.sin(a)*rr*.5);pctx.lineTo(x+Math.cos(a)*rr*1.9,y+Math.sin(a)*rr*1.9);pctx.stroke();}}
  }
}
function drawDiffraction(){const [w,h,d]=fit(dc);dctx.setTransform(d,0,0,d,0,0);dctx.fillStyle='#080d0c';dctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2;const grad=dctx.createRadialGradient(cx,cy,0,cx,cy,w*.47);grad.addColorStop(0,'rgba(92,231,209,.16)');grad.addColorStop(.28,'rgba(28,123,113,.06)');grad.addColorStop(1,'transparent');dctx.fillStyle=grad;dctx.fillRect(0,0,w,h);dctx.strokeStyle='rgba(117,150,144,.13)';dctx.setLineDash([2,5]);[.18,.32,.44].forEach(r=>{dctx.beginPath();dctx.arc(cx,cy,w*r,0,7);dctx.stroke()});dctx.setLineDash([]);
  for(let ring=0;ring<3;ring++){const rad=w*(.18+ring*.105);for(let k=0;k<12;k++){const a=k*Math.PI/6+(ring%2)*Math.PI/12,x=cx+Math.cos(a)*rad,y=cy+Math.sin(a)*rad,s=ring===1?3.2:2;const g=dctx.createRadialGradient(x,y,0,x,y,s*3);g.addColorStop(0,'rgba(181,255,240,.95)');g.addColorStop(.2,'rgba(80,230,204,.8)');g.addColorStop(1,'transparent');dctx.fillStyle=g;dctx.beginPath();dctx.arc(x,y,s*3,0,7);dctx.fill();}}
  dctx.fillStyle='#d9fff8';dctx.beginPath();dctx.arc(cx,cy,3,0,7);dctx.fill();
}
function drawHistory(){const [w,h,d]=fit(hc);hctx.setTransform(d,0,0,d,0,0);hctx.clearRect(0,0,w,h);hctx.strokeStyle='rgba(122,150,145,.13)';hctx.lineWidth=1;for(let i=1;i<4;i++){hctx.beginPath();hctx.moveTo(0,i*h/4);hctx.lineTo(w,i*h/4);hctx.stroke()} function line(color,base,amp,phase){hctx.beginPath();for(let x=0;x<w;x++){const y=h*(base+Math.sin(x*.055+phase)*amp+Math.sin(x*.013)*amp*.4);x?hctx.lineTo(x,y):hctx.moveTo(x,y)}hctx.strokeStyle=color;hctx.lineWidth=1.5;hctx.stroke()}line('#58d8c6',.27,.035,0);line('#d99b59',.7,.04,2);}
function loop(){if(running){step+=4;time+=.008;$('#step-label').textContent=`STEP ${String(step).padStart(7,'0').replace(/(\d)(?=(\d{3})+$)/g,'$1,')}`;$('#sim-time').textContent=time.toFixed(2);}drawParticles();requestAnimationFrame(loop)}
drawDiffraction();drawHistory();loop();window.addEventListener('resize',()=>{drawDiffraction();drawHistory()});
