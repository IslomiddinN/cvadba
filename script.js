const header=document.querySelector('.header');
const menuBtn=document.querySelector('.menu-btn');
const langSwitch=document.getElementById('langSwitch');

const russianContent={
  '.nav a:nth-child(1)':'История',
  '.nav a:nth-child(2)':'Программа',
  '.nav a:nth-child(3)':'Место',
  '.nav a:nth-child(4)':'Детали',
  '.header-rsvp':'Подтвердить участие',
  '.hero .eyebrow':'Добро пожаловать на свадьбу',
  '.scroll-down span':'Листайте вниз',
  '.intro .eyebrow':'Добро пожаловать на свадьбу Исломиддина',
  '.intro .display':'Один день.<br><i>Одна история.</i> Навсегда.',
  '.intro-copy':'Дорогие родные и друзья! С большим уважением приглашаем вас на свадебное торжество Исломиддина. Ваше присутствие сделает этот незабываемый день ещё прекраснее. Давайте разделим эту радость вместе!',
  '.date-card span:first-child':'Воскресенье',
  '.date-card span:last-child':'Август · 2026',
  '.story-art span':'наша история',
  '.story-text .eyebrow':'С чего всё началось',
  '.story-text h2':'Случайная встреча,<br>которая стала <i>судьбой</i>',
  '.story-text p:nth-of-type(2)':'Одна чашка кофе, долгий разговор и прогулка под первым осенним дождём. Тогда мы ещё не знали, что нашли друг в друге дом.',
  '.story-text p:nth-of-type(3)':'После множества путешествий, маленьких традиций и больших мечтаний настало время сказать самое важное «да».',
  '.signature':'С уважением, Исломиддин',
  '.countdown .eyebrow':'До нашего дня осталось',
  '#days + span':'дней','#hours + span':'часов','#minutes + span':'минут','#seconds + span':'секунд',
  '.schedule .section-head .eyebrow':'Сохраните этот день',
  '.schedule .section-head .display':'Программа<br><i>праздника</i>',
  '.event:nth-child(1) span':'Встреча гостей','.event:nth-child(1) h3':'Сбор гостей','.event:nth-child(1) p':'Лёгкие закуски, напитки и тёплые встречи.',
  '.event:nth-child(2) span':'Церемония','.event:nth-child(2) h3':'Самое важное «да»','.event:nth-child(2) p':'Просим не опаздывать — этот момент бесценен.',
  '.event:nth-child(3) span':'Ужин','.event:nth-child(3) h3':'Праздничный банкет','.event:nth-child(3) p':'Любимые блюда, добрые слова и много улыбок.',
  '.event:nth-child(4) span':'Вечеринка','.event:nth-child(4) h3':'Танцы до ночи','.event:nth-child(4) p':'Не забудьте удобную обувь.',
  '.place-info .eyebrow':'Место встречи','.place-info h2':'г. Гиссар<br><i>Дом акаи Илхома</i>','.place-info p:nth-of-type(2)':'г. Гиссар, дом акаи Илхома','.place-info .button':'Открыть на карте <span>↗</span>',
  '.details .section-head .eyebrow':'Несколько важных деталей','.details .section-head .display':'Будем <i>на одной волне</i>',
  '.detail-card:nth-child(1) h3':'Дресс-код','.detail-card:nth-child(1) p':'Будем рады, если вы выберете природные цвета нашего праздника.',
  '.detail-card:nth-child(2) h3':'Цветы','.detail-card:nth-child(2) p':'Вместо букета подарите любимый напиток с запиской — соберём семейную коллекцию.',
  '.detail-card:nth-child(3) h3':'Трансфер','.detail-card:nth-child(3) p':'Для удобства гостей будет организован общий транспорт.',
  '.rsvp-copy .eyebrow':'До скорой встречи','.rsvp-copy h2':'Вы будете<br><i>с нами?</i>','.rsvp-copy p:last-child':'Пожалуйста, ответьте заранее. Это поможет нам всё подготовить.',
  '.rsvp-form > label:first-child':'Ваше имя и фамилия<input type="text" name="name" placeholder="Как к вам обращаться?" required>',
  '.rsvp-form legend':'Сможете присутствовать?','.radio:nth-of-type(1) span':'С радостью буду','.radio:nth-of-type(2) span':'К сожалению, не смогу',
  '.rsvp-form > label:nth-of-type(2)':'Предпочтения по напиткам<select name="drink"><option>Вино</option><option>Крепкие напитки</option><option>Безалкогольные</option></select>',
  '.rsvp-form .button':'Отправить ответ <span>→</span>','footer span':'Добро пожаловать на наш праздник'
};
const originalContent=new Map();
Object.keys(russianContent).forEach(selector=>{const el=document.querySelector(selector);if(el)originalContent.set(selector,el.innerHTML)});
function setLanguage(lang){
  Object.keys(russianContent).forEach(selector=>{const el=document.querySelector(selector);if(el)el.innerHTML=lang==='ru'?russianContent[selector]:originalContent.get(selector)});
  document.documentElement.lang=lang==='ru'?'ru':'tg';
  langSwitch.textContent=lang==='ru'?'TG':'RU';
  localStorage.setItem('wedding-language',lang);
}
langSwitch.addEventListener('click',()=>setLanguage(document.documentElement.lang==='ru'?'tg':'ru'));
setLanguage(localStorage.getItem('wedding-language')==='ru'?'ru':'tg');
if(new URLSearchParams(location.search).get('sent')==='1'){
  history.replaceState({},'',location.pathname+'#rsvp');
  addEventListener('DOMContentLoaded',()=>{
    const note=document.getElementById('formNote');
    if(note)note.textContent=document.documentElement.lang==='ru'?'Спасибо! Ваш ответ отправлен.':'Ташаккур! Ҷавоби шумо фиристода шуд.';
  });
}
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>60),{passive:true});
menuBtn.addEventListener('click',()=>{const open=header.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*.08}s`;observer.observe(el)});

const target=new Date('2026-08-02T15:00:00+05:00').getTime();
function tick(){let d=Math.max(0,target-Date.now());const values={days:Math.floor(d/86400000),hours:Math.floor(d/3600000)%24,minutes:Math.floor(d/60000)%60,seconds:Math.floor(d/1000)%60};Object.entries(values).forEach(([id,v])=>document.getElementById(id).textContent=String(v).padStart(2,'0'))}
tick();setInterval(tick,1000);

if(matchMedia('(pointer:fine)').matches){window.addEventListener('scroll',()=>{document.querySelector('.hero-bg').style.transform=`scale(1.03) translateY(${scrollY*.12}px)`},{passive:true})}

document.getElementById('rsvpForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const button=e.target.querySelector('button');
  const note=document.getElementById('formNote');
  const data=Object.fromEntries(new FormData(e.target));
  button.disabled=true;
  button.textContent=document.documentElement.lang==='ru'?'Отправляется…':'Фиристода истодааст…';
  note.textContent='';
  try{
    const response=await fetch('/api/rsvp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    if(!response.ok)throw new Error('send_failed');
    button.textContent=document.documentElement.lang==='ru'?'Ответ принят ✓':'Ҷавоб қабул шуд ✓';
    note.textContent=document.documentElement.lang==='ru'?'Спасибо! Ваш ответ отправлен. Ждём встречи!':'Ташаккур! Ҷавоби шумо фиристода шуд. Мо бесаброна интизори дидор ҳастем.';
    e.target.reset();
  }catch(error){
    button.disabled=false;
    button.textContent=document.documentElement.lang==='ru'?'Отправить ответ →':'Фиристодани ҷавоб →';
    note.textContent=document.documentElement.lang==='ru'?'Ответ не отправлен. Попробуйте ещё раз.':'Ҷавоб фиристода нашуд. Лутфан дубора кӯшиш кунед.';
  }
});
