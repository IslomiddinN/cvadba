const header=document.querySelector('.header');
const menuBtn=document.querySelector('.menu-btn');
if(new URLSearchParams(location.search).get('sent')==='1'){
  history.replaceState({},'',location.pathname+'#rsvp');
  addEventListener('DOMContentLoaded',()=>{
    const note=document.getElementById('formNote');
    if(note)note.textContent='Ташаккур! Ҷавоби шумо фиристода шуд.';
  });
}
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>60),{passive:true});
menuBtn.addEventListener('click',()=>{const open=header.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*.08}s`;observer.observe(el)});

const target=new Date('2026-09-20T15:00:00+03:00').getTime();
function tick(){let d=Math.max(0,target-Date.now());const values={days:Math.floor(d/86400000),hours:Math.floor(d/3600000)%24,minutes:Math.floor(d/60000)%60,seconds:Math.floor(d/1000)%60};Object.entries(values).forEach(([id,v])=>document.getElementById(id).textContent=String(v).padStart(2,'0'))}
tick();setInterval(tick,1000);

if(matchMedia('(pointer:fine)').matches){window.addEventListener('scroll',()=>{document.querySelector('.hero-bg').style.transform=`scale(1.03) translateY(${scrollY*.12}px)`},{passive:true})}

document.getElementById('rsvpForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const button=e.target.querySelector('button');
  const note=document.getElementById('formNote');
  const data=Object.fromEntries(new FormData(e.target));
  button.disabled=true;
  button.textContent='Фиристода истодааст…';
  note.textContent='';
  try{
    const response=await fetch('/api/rsvp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    if(!response.ok)throw new Error('send_failed');
    button.textContent='Ҷавоб қабул шуд ✓';
    note.textContent='Ташаккур! Ҷавоби шумо фиристода шуд. Мо бесаброна интизори дидор ҳастем.';
    e.target.reset();
  }catch(error){
    button.disabled=false;
    button.textContent='Фиристодани ҷавоб →';
    note.textContent='Ҷавоб фиристода нашуд. Лутфан дубора кӯшиш кунед.';
  }
});
