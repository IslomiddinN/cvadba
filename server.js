const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};

function json(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data))}

async function receive(req){
  let body='';
  for await(const chunk of req){body+=chunk;if(body.length>10000)throw new Error('too_large')}
  const contentType=req.headers['content-type']||'';
  if(contentType.includes('application/json'))return JSON.parse(body||'{}');
  if(contentType.includes('application/x-www-form-urlencoded'))return Object.fromEntries(new URLSearchParams(body));
  throw new Error('unsupported_content_type');
}

async function sendRsvp(req,res){
  const isHtmlForm=(req.headers['content-type']||'').includes('application/x-www-form-urlencoded');
  if(!BOT_TOKEN||!CHAT_ID)return json(res,500,{error:'telegram_not_configured'});
  try{
    const data=await receive(req);
    const name=String(data.name||'').trim().slice(0,120);
    if(!name)return json(res,400,{error:'name_required'});
    const attending=data.attendance==='yes';
    const drink=String(data.drink||'Не указано').slice(0,120);
    const message=[
      '💌 Новый ответ на свадьбу',
      '',
      `👤 Гость: ${name}`,
      `${attending?'✅':'❌'} ${attending?'Придёт на свадьбу':'Не сможет прийти'}`,
      `🥂 Напитки: ${drink}`
    ].join('\n');
    const telegram=await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({chat_id:CHAT_ID,text:message})
    });
    if(!telegram.ok){
      const details=await telegram.json().catch(()=>({description:'Unknown Telegram error'}));
      console.error(`Telegram error ${telegram.status}: ${details.description}`);
      return json(res,502,{error:'telegram_rejected',details:details.description});
    }
    if(isHtmlForm){res.writeHead(303,{Location:'/?sent=1#rsvp'});return res.end()}
    json(res,200,{ok:true});
  }catch(error){
    console.error(`RSVP error: ${error.message}`);
    json(res,500,{error:'send_failed'});
  }
}

const server=http.createServer(async(req,res)=>{
  if(req.method==='POST'&&req.url==='/api/rsvp')return sendRsvp(req,res);
  if(req.method!=='GET')return json(res,405,{error:'method_not_allowed'});
  const pathname=decodeURIComponent(req.url.split('?')[0]);
  const clean=pathname==='/'?'index.html':pathname.replace(/^\/+/, '');
  const file=path.resolve(root,clean);
  if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);return res.end('Not found')}
  res.writeHead(200,{
    'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream',
    'Cache-Control':'no-store'
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT,()=>console.log(`Wedding site: http://localhost:${PORT}`));
