document.getElementById('year').textContent=new Date().getFullYear();
const intro=document.getElementById('intro');
const stage=document.getElementById('introStage');
const assets={m:'assets/letterm.png',u:'assets/letteru.png',r:'assets/letterr.png',i:'assets/letteri.png'};
const sequence='murimuri'.split('');
let assembling=false;
const spots=[['11%','16%'],['79%','14%'],['22%','72%'],['82%','66%'],['49%','13%'],['9%','45%'],['65%','46%'],['43%','76%']];
const letters=[];
sequence.forEach((ch,i)=>{const img=document.createElement('img');img.src=assets[ch];img.className='intro-letter';img.style.left=spots[i][0];img.style.top=spots[i][1];img.style.animationDelay=`${i*.35}s`;img.onclick=assembleLogo;stage.appendChild(img);letters.push(img)});
function layoutRow(row,top,h,gap){const widths=row.map(img=>(img.naturalWidth/img.naturalHeight)*h);const total=widths.reduce((a,b)=>a+b,0)+gap*(row.length-1);let x=(stage.clientWidth-total)/2;row.forEach((img,j)=>{img.style.height=h+'px';img.style.left=(x+widths[j]/2)+'px';img.style.top=top+'px';img.style.transform='rotate(0)';x+=widths[j]+gap})}
function assembleLogo(){if(assembling)return;assembling=true;intro.classList.add('assembling');const h=Math.max(58,Math.min(88,stage.clientWidth*.18));const gap=Math.max(10,Math.min(18,stage.clientWidth*.03));const center=stage.clientHeight*.49;const rowOffset=Math.max(h*.86,stage.clientHeight*.115);layoutRow(letters.slice(0,4),center-rowOffset,h,gap);layoutRow(letters.slice(4,8),center+rowOffset,h,gap);setTimeout(finishIntro,1750)}
const workshopPopup=document.getElementById('workshopPopup');
const workshopPopupClose=document.getElementById('workshopPopupClose');
function showWorkshopPopup(){if(!workshopPopup||sessionStorage.getItem('muriWorkshopPopupSeen'))return;setTimeout(()=>{workshopPopup.classList.add('open');workshopPopup.setAttribute('aria-hidden','false');sessionStorage.setItem('muriWorkshopPopupSeen','1')},500)}
function closeWorkshopPopup(){if(!workshopPopup)return;workshopPopup.classList.remove('open');workshopPopup.setAttribute('aria-hidden','true')}
function finishIntro(){intro.classList.add('done');sessionStorage.setItem('muriIntroSeen','1');showWorkshopPopup()}
document.getElementById('skipIntro').onclick=finishIntro;
if(sessionStorage.getItem('muriIntroSeen')){intro.classList.add('done');showWorkshopPopup()}
if(workshopPopupClose)workshopPopupClose.onclick=e=>{e.preventDefault();e.stopPropagation();closeWorkshopPopup()};
if(workshopPopup)workshopPopup.addEventListener('click',e=>{if(e.target===workshopPopup)closeWorkshopPopup()});
const menuFiles=['assets/menu_1.pdf','assets/menu_2.pdf','assets/menu_3.pdf','assets/cafes_lista_typewriter_pages2 copy.pdf'];
let menuIndex=0;
const modal=document.getElementById('menuModal');
const frame=document.getElementById('menuFrame');
function showMenu(i=0){menuIndex=(i+menuFiles.length)%menuFiles.length;frame.src=encodeURI(menuFiles[menuIndex])+'#zoom=page-fit&view=Fit&toolbar=0';modal.classList.add('open')}
document.querySelectorAll('[data-open-menu]').forEach(b=>b.onclick=()=>showMenu(0));
document.getElementById('menuClose').onclick=()=>modal.classList.remove('open');
document.getElementById('menuPrev').onclick=()=>showMenu(menuIndex-1);
document.getElementById('menuNext').onclick=()=>showMenu(menuIndex+1);
modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open')};
const wipe=document.getElementById('pageWipe');
window.addEventListener('pageshow',()=>wipe.classList.remove('go'));
window.addEventListener('pagehide',()=>wipe.classList.remove('go'));
document.querySelectorAll('a.internal').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();wipe.classList.remove('go');void wipe.offsetWidth;wipe.classList.add('go');setTimeout(()=>location.href=a.href,470)}));
const revealTargets=document.querySelectorAll('.reveal,.coffee-card,#hecho-aqui .section-head,#hecho-aqui .button,.visit-grid');
revealTargets.forEach(el=>el.classList.add('highlight-reveal'));
const titleTargets=document.querySelectorAll('h1,h2,h3,.address,.wordmark');
titleTargets.forEach(el=>el.classList.add('title-reveal'));
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});obs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -4% 0px'});
[...revealTargets,...titleTargets].forEach(el=>obs.observe(el));
const header=document.querySelector('header');let lastY=window.scrollY;let ticking=false;
window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const y=window.scrollY;header.classList.toggle('nav-scrolled',y>8);if(y>lastY&&y>120){header.classList.add('nav-hidden')}else if(y<lastY-3||y<40){header.classList.remove('nav-hidden')}lastY=y;ticking=false})},{passive:true});

const gameModal=document.getElementById('gameModal');
const gameClose=document.getElementById('gameClose');
const secretGameTrigger=document.getElementById('secretGameTrigger');
let gameInited=false;
let logoTapCount=0;
let logoTapTimer;
function openGame(){if(!gameModal)return;closeWorkshopPopup();gameModal.classList.add('open');gameModal.setAttribute('aria-hidden','false');if(!gameInited){initRunner();gameInited=true}}
function closeGame(){if(!gameModal)return;gameModal.classList.remove('open');gameModal.setAttribute('aria-hidden','true')}
if(secretGameTrigger)secretGameTrigger.addEventListener('click',e=>{logoTapCount++;clearTimeout(logoTapTimer);logoTapTimer=setTimeout(()=>logoTapCount=0,1800);if(logoTapCount>=5){e.preventDefault();logoTapCount=0;openGame()}});
if(gameClose)gameClose.onclick=closeGame;
if(gameModal)gameModal.addEventListener('click',e=>{if(e.target===gameModal)closeGame()});

function initRunner(){
  const cvs=document.getElementById('runner');
  if(!cvs)return;
  const ctx=cvs.getContext('2d');
  const scoreEl=document.getElementById('gameScore');
  const bestEl=document.getElementById('gameBest');
  const HS_KEY='murimuri_runner_highscore';
  let running=true;
  const G=.62,JUMP_INITIAL=-10.5,JUMP_HOLD_FORCE=-.55,JUMP_HOLD_MAX_FRAMES=14;
  const ground=cvs.height-28;
  const player={x:60,y:ground,vy:0,w:100,h:150,hbW:36,hbH:60};
  let obstacles=[],score=0,best=Number(localStorage.getItem(HS_KEY)||0),baseSpeed=5,speed=baseSpeed,framesSinceStart=0,jumpHeld=false,jumpHoldFrames=0,isJumping=false,spawnGap=0;
  const sprite=new Image();sprite.src='assets/recurso.png';
  const bean=new Image();bean.src='assets/bean.png';
  if(bestEl)bestEl.textContent=Math.floor(best);
  function reset(){player.y=ground;player.vy=0;obstacles=[];running=true;score=0;speed=baseSpeed;framesSinceStart=0;isJumping=false;jumpHoldFrames=0;spawnGap=0;if(scoreEl)scoreEl.textContent='0'}
  function spawn(){const size=30+Math.random()*14;obstacles.push({x:cvs.width+20,y:ground,size,hb:size*.85})}
  function playerHitbox(){const hbLeft=player.x+(player.w-player.hbW)/2-14;const hbTop=(player.y-player.h)+(player.h-player.hbH)/2;return{left:hbLeft,right:hbLeft+player.hbW,top:hbTop,bottom:hbTop+player.hbH}}
  function draw(){ctx.clearRect(0,0,cvs.width,cvs.height);ctx.strokeStyle='rgba(52,122,150,.2)';ctx.beginPath();ctx.moveTo(0,ground+2);ctx.lineTo(cvs.width,ground+2);ctx.stroke();if(sprite.complete&&sprite.naturalWidth)ctx.drawImage(sprite,player.x-14,player.y-player.h,player.w,player.h);obstacles.forEach(o=>{if(bean.complete&&bean.naturalWidth)ctx.drawImage(bean,o.x-o.size/2,o.y-o.size,o.size,o.size)});if(!running){ctx.fillStyle='rgba(52,122,150,.5)';ctx.fillRect(0,0,cvs.width,cvs.height);ctx.fillStyle='#fff8f2';ctx.textAlign='center';ctx.font='bold 28px sans-serif';ctx.fillText('¡Se te quemó el café!',cvs.width/2,cvs.height/2-18);ctx.font='16px sans-serif';ctx.fillText(`Puntos: ${Math.floor(score)} · Mejor: ${Math.floor(best)}`,cvs.width/2,cvs.height/2+12);ctx.font='14px sans-serif';ctx.fillText('Toca o presiona Enter para reintentar',cvs.width/2,cvs.height/2+38);ctx.textAlign='left'}}
  function update(){if(!running)return;framesSinceStart++;if(isJumping&&jumpHeld&&jumpHoldFrames<JUMP_HOLD_MAX_FRAMES&&player.vy<0){player.vy+=JUMP_HOLD_FORCE;jumpHoldFrames++}player.vy+=G;player.y+=player.vy;if(player.y>ground){player.y=ground;player.vy=0;isJumping=false;jumpHoldFrames=0}speed=baseSpeed+Math.min(4.5,framesSinceStart/240);obstacles.forEach(o=>o.x-=speed);obstacles=obstacles.filter(o=>o.x+o.size>0);spawnGap-=speed;if(spawnGap<=0){spawn();spawnGap=Math.max(170,340-framesSinceStart/12)+Math.random()*220}score+=speed*.08;if(scoreEl)scoreEl.textContent=Math.floor(score);const hb=playerHitbox();for(const o of obstacles){const overlap=hb.left<o.x+o.hb&&hb.right>o.x-o.hb&&hb.top<o.y&&hb.bottom>o.y-o.hb*1.8;if(overlap){running=false;if(score>best){best=score;localStorage.setItem(HS_KEY,String(Math.floor(best)));if(bestEl)bestEl.textContent=Math.floor(best)}}}}
  (function loop(){update();draw();requestAnimationFrame(loop)})();
  function startJump(){if(player.y===ground&&running){player.vy=JUMP_INITIAL;isJumping=true;jumpHeld=true;jumpHoldFrames=0}else if(!running)reset()}
  function endJump(){jumpHeld=false}
  cvs.addEventListener('pointerdown',startJump);cvs.addEventListener('pointerup',endJump);cvs.addEventListener('pointerleave',endJump);
  document.addEventListener('keydown',e=>{if(!gameModal.classList.contains('open'))return;if(e.code==='Space'){e.preventDefault();if(!jumpHeld)startJump()}if(e.code==='Enter'&&!running)reset();if(e.code==='Escape')closeGame()});
  document.addEventListener('keyup',e=>{if(e.code==='Space')endJump()});
}
