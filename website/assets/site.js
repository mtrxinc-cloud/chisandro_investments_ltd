const EMAIL='info@yourdomain.co.zm'; // placeholder – replace with the real address
document.querySelectorAll('.yr').forEach(n=>n.textContent=new Date().getFullYear());

// mosaic: one photo cut across 24 tiles, 5 swapped for colour tiles
(function(){
 const el=document.getElementById('mos'); if(!el) return;
 const sp={0:['<b>Supply, simply.</b>',''],8:['Machines to stationery.','r'],13:['Delivery across Zambia.','i'],16:['One quote for the whole list.','r'],21:['<a href="#request">Request a quote →</a>','']};
 for(let i=0;i<24;i++){
  const d=document.createElement('div'),c=i%6,r=Math.floor(i/6);
  if(sp[i]){d.className='c '+sp[i][1];d.innerHTML=sp[i][0]}
  else d.style.backgroundPosition=(c/5*100)+'% '+(r/3*100)+'%';
  el.appendChild(d);
 }
})();

// accordion
document.querySelectorAll('.pn').forEach(p=>p.addEventListener('click',()=>{
 document.querySelectorAll('.pn').forEach(x=>{x.classList.remove('on');x.setAttribute('aria-expanded','false')});
 p.classList.add('on');p.setAttribute('aria-expanded','true');
}));

// live request builder -> opens an email with the list filled in
const chips=document.getElementById('chips');
if(chips)chips.addEventListener('click',e=>{const b=e.target.closest('.chip');if(b)b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')==='true'?'false':'true')});
const rf=document.getElementById('reqform');
if(rf)rf.addEventListener('submit',e=>{
 e.preventDefault();
 const cats=[...chips.querySelectorAll('[aria-pressed=true]')].map(b=>b.textContent).join(', ')||'General';
 const item=document.getElementById('item').value||'(not specified)';
 const who=document.getElementById('who').value||'(not specified)';
 const body=`Hello Chisandro,\n\nI would like a quote.\n\nCategories: ${cats}\nItems: ${item}\nContact: ${who}\n\nThank you.`;
 location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('Quote request')}&body=${encodeURIComponent(body)}`;
});

// give every tile an entrance
document.querySelectorAll("main .t:not([data-r]), main .pics, .phead .pt").forEach((n,i)=>{n.setAttribute("data-r","");n.style.setProperty("--i",i%3)});
// entrances
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll('[data-r]').forEach(n=>io.observe(n));

// mobile menu
const mb=document.getElementById('menubtn');
if(mb)mb.addEventListener('click',()=>{const b=document.getElementById('bar');const o=b.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
