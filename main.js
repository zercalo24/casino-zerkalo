(()=>{
const D=window.CASINOS,$=s=>document.querySelector(s),root=document.documentElement;
const T={ru:{h1:"Честные обзоры онлайн-казино 2025",top:"Топ",cmp:"Сравнение",how:"Как мы оцениваем",cta1:"Смотреть топ",cta2:"Как мы оцениваем",topH:"Топ казино 2025",disc:"18+. Играйте ответственно. Материалы носят информационный характер. Данные на сайте — демонстрационные."},
en:{h1:"Honest online casino reviews 2025",top:"Top",cmp:"Compare",how:"How we rate",cta1:"See the top",cta2:"How we rate",topH:"Top casinos 2025",disc:"18+. Play responsibly. Information only. Data on this site is demo content."}};
let lang=localStorage.lang||"ru",favs=JSON.parse(localStorage.favs||"[]"),F={lic:null,fast:false,crypto:false},S={k:"rating",d:-1};
const setTheme=t=>{root.dataset.theme=t;localStorage.theme=t};setTheme(localStorage.theme||"dark");
$("#theme").onclick=()=>{const n=root.dataset.theme=="dark"?"light":"dark";document.startViewTransition?document.startViewTransition(()=>setTheme(n)):setTheme(n)};
const i18n=()=>{document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=T[lang][e.dataset.i18n]||e.textContent);root.lang=lang;$("#lang").textContent=lang=="ru"?"EN":"RU";split();type()};
$("#lang").onclick=()=>{lang=lang=="ru"?"en":"ru";localStorage.lang=lang;i18n()};
function split(){const h=$("#h1");h.innerHTML=h.textContent.split(" ").map((w,i)=>`<span style="animation-delay:${i*.09}s">${w}</span> `).join("")}
let tt;function type(){clearInterval(tt);const s=lang=="ru"?"Лицензии, бонусы и выплаты — проверено вручную.":"Licences, bonuses and payouts — checked by hand.";let i=0;tt=setInterval(()=>{$("#type").textContent=s.slice(0,++i);if(i>=s.length)clearInterval(tt)},35)}
const stars=r=>`<span class="stars" style="--w:${r*10}%">★★★★★</span>`;
const card=(c,cls)=>`<article class="card reveal ${cls}"><button class="heart ${favs.includes(c.id)?"on":""}" data-id="${c.id}" aria-label="В избранное">♥</button>
${c.tag?`<span class="badge">${c.tag}</span>`:""}<span class="badge l">${c.license}</span><h3>${c.name}</h3>${stars(c.rating)} <b>${c.rating}</b>
<p class="bonus">${c.bonus}</p><small>Мин. депозит $${c.minDep} · вывод ~${c.payout} ч</small><div class="bar"><i data-w="${c.rating*10}"></i></div>
<a class="btn" href="#">Обзор</a> <a class="btn p" href="#">Играть</a></article>`;
function bento(){$("#bento").innerHTML=D.slice(0,4).map((c,i)=>card(c,i==0?"big":i<3?"wide":"")).join("")+D.slice(4,8).map(c=>card(c,"")).join("")+`<div class="card cta wide"><h3>Бонусы на почту</h3><p>Лучшие предложения раз в неделю.</p><p id="sub"><input placeholder="email" style="padding:8px;border-radius:9px;border:0;margin:8px 0"> <button class="btn" id="subb">Подписаться</button></p></div>`;
 $("#subb").onclick=()=>$("#sub").textContent="Спасибо! Вы подписаны (демо).";
 document.querySelectorAll(".heart").forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.id;favs=favs.includes(id)?favs.filter(x=>x!=id):[...favs,id];localStorage.favs=JSON.stringify(favs);b.classList.toggle("on")})}
function filters(){$("#filters").innerHTML=["MGA","UKGC","Curacao"].map(l=>`<button class="chip" data-l="${l}">${l}</button>`).join("")+`<button class="chip" data-f="fast">Вывод ≤ 4 ч</button><button class="chip" data-f="crypto">Крипто</button><button class="chip" id="rs">Сбросить</button><span id="cnt"></span>`;
 $("#filters").onclick=e=>{const b=e.target.closest("button");if(!b)return;if(b.id=="rs")F={lic:null,fast:false,crypto:false};else if(b.dataset.l)F.lic=F.lic==b.dataset.l?null:b.dataset.l;else F[b.dataset.f]=!F[b.dataset.f];
 document.querySelectorAll(".chip[data-l],.chip[data-f]").forEach(c=>c.classList.toggle("on",c.dataset.l?F.lic==c.dataset.l:F[c.dataset.f]));table()}}
document.querySelectorAll("th").forEach(th=>th.onclick=()=>{S={k:th.dataset.k,d:S.k==th.dataset.k?-S.d:-1};table()});
function table(){const a=D.filter(c=>(!F.lic||c.license==F.lic)&&(!F.fast||c.payout<=4)&&(!F.crypto||c.pay.some(p=>/BTC|ETH|USDT|LTC/.test(p))));
 a.sort((x,y)=>(x[S.k]>y[S.k]?1:-1)*S.d);const n=[F.lic,F.fast,F.crypto].filter(Boolean).length;$("#cnt").textContent=`Найдено: ${a.length}${n?` · фильтров: ${n}`:""}`;
 $("#tb").innerHTML=a.map(c=>`<tr class="row"><td><b>${c.name}</b></td><td>${c.rating}</td><td>${c.license}</td><td>$${c.minDep}</td><td>${c.payout}</td></tr><tr class="det"><td colspan="5">✅ ${c.pros.join(", ")}<br>⚠️ ${c.cons.join(", ")}<br>Платежи: ${c.pay.join(", ")}</td></tr>`).join("");
 document.querySelectorAll("tr.row").forEach(r=>r.onclick=()=>r.nextElementSibling.classList.toggle("open"))}
$("#crit").innerHTML=[["Лицензия и безопасность",95],["Скорость выплат",90],["Бонусные условия",85],["Игры и провайдеры",88],["Поддержка",80]].map(([t,v])=>`<div class="card reveal"><h3>${t}</h3><div class="bar"><i data-w="${v}"></i></div></div>`).join("");
const cmd=$("#cmd"),q=$("#q"),open=()=>{cmd.classList.add("open");q.focus()};
$("#kbtn").onclick=open;addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key=="k"){e.preventDefault();open()}if(e.key=="Escape")cmd.classList.remove("open")});
cmd.onclick=e=>{if(e.target==cmd)cmd.classList.remove("open")};
q.oninput=()=>$("#res").innerHTML=D.filter(c=>c.name.toLowerCase().includes(q.value.toLowerCase())).map(c=>`<a href="#top">${c.name} — ${c.rating} · ${c.bonus}</a>`).join("");
document.addEventListener("click",e=>{const b=e.target.closest(".btn");if(!b)return;const r=b.getBoundingClientRect(),s=document.createElement("i");s.className="rip";s.style.cssText=`width:40px;height:40px;left:${e.clientX-r.left-20}px;top:${e.clientY-r.top-20}px`;b.append(s);setTimeout(()=>s.remove(),600)});
document.addEventListener("mousemove",e=>{const c=e.target.closest&&e.target.closest(".card");if(c){const r=c.getBoundingClientRect();c.style.setProperty("--mx",e.clientX-r.left+"px");c.style.setProperty("--my",e.clientY-r.top+"px")}});
bento();filters();table();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");e.target.querySelectorAll(".bar i").forEach(b=>b.style.width=b.dataset.w+"%");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".reveal").forEach((e,i)=>{e.style.transitionDelay=(i%4)*.08+"s";io.observe(e)});
document.querySelectorAll("[data-n]").forEach(el=>{const n=+el.dataset.n;let v=0;const t=setInterval(()=>{v+=Math.ceil(n/40);if(v>=n){v=n;clearInterval(t)}el.textContent=v+(n==500?"+":"")},30)});
i18n();
})();
