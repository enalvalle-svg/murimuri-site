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
function assembleLogo(){if(assembling)return;assembling=true;intro.classList.add('assembling');const h=Math.max(58,Math.min(88,stage.clientWidth*.18));const gap=Math.max(10,Math.min(18,stage.clientWidth*.03));layoutRow(letters.slice(0,4),stage.clientHeight*.40,h,gap);layoutRow(letters.slice(4,8),stage.clientHeight*.56,h,gap);setTimeout(finishIntro,1750)}
function finishIntro(){intro.classList.add('done');sessionStorage.setItem('muriIntroSeen','1')}
document.getElementById('skipIntro').onclick=finishIntro;
if(sessionStorage.getItem('muriIntroSeen'))intro.classList.add('done');
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
const revealTargets=document.querySelectorAll('.reveal,.workshop-grid,.coffee-card,#hecho-aqui .section-head,#hecho-aqui .button,.visit-grid');
revealTargets.forEach(el=>el.classList.add('highlight-reveal'));
const titleTargets=document.querySelectorAll('h1,h2,h3,.address,.wordmark');
titleTargets.forEach(el=>el.classList.add('title-reveal'));
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});obs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -4% 0px'});
[...revealTargets,...titleTargets].forEach(el=>obs.observe(el));
const header=document.querySelector('header');let lastY=window.scrollY;let ticking=false;
window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const y=window.scrollY;header.classList.toggle('nav-scrolled',y>8);if(y>lastY&&y>120){header.classList.add('nav-hidden')}else if(y<lastY-3||y<40){header.classList.remove('nav-hidden')}lastY=y;ticking=false})},{passive:true});