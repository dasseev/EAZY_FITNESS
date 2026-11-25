'use strict';
const config = window.EAZY_CONFIG;
const $ = id => document.getElementById(id);
let events = [];
function renderEvents() { $('events').textContent = events.length ? JSON.stringify(events, null, 2) : 'Локальных событий пока нет.'; }
function track(name, params) {
  events.push({event:name, ...params, time:new Date().toISOString()});
  events = events.slice(-30);
  renderEvents();
  if (config.metricaCounterId && typeof window.ym === 'function') window.ym(config.metricaCounterId, 'reachGoal', name, params);
}
$('tools-toggle').addEventListener('click', () => { $('tools').hidden = !$('tools').hidden; $('tools-toggle').setAttribute('aria-expanded', String(!$('tools').hidden)); });
$('width').addEventListener('change', e => { $('page').style.width = e.target.value; $('page').style.maxWidth = '100%'; });
$('palette').addEventListener('change', e => document.body.classList.toggle('green', e.target.value === 'green'));
for (const id of ['booking-link','fallback-link']) { $(id).href = config.bookingUrl; $(id).addEventListener('click', () => track('booking_link_click', {placement:id, demo:true})); }
function setMode(widget) { $('link-panel').hidden=widget; $('widget-panel').hidden=!widget; $('link-mode').setAttribute('aria-pressed',String(!widget)); $('widget-mode').setAttribute('aria-pressed',String(widget)); }
$('link-mode').addEventListener('click',()=>setMode(false));
$('widget-mode').addEventListener('click',()=>setMode(true));
if(config.widgetEnabled) { $('widget-placeholder').hidden=true; $('widget-mount').hidden=false; setMode(true); }
$('copy-code').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('copy-code').dataset.code); $('copy-status').textContent='Пример кода скопирован. Он не даёт скидку.'; track('partner_code_copy',{partner_id:'demo-specialist',demo:true}); }
  catch { $('copy-status').textContent='Не удалось скопировать. Пример кода: DEMO-CODE'; }
});
$('clear-events').addEventListener('click',()=>{events=[];renderEvents();});
$('analytics-status').textContent='События ниже хранятся только в памяти этой вкладки. Внешний счётчик не подключён. После обновления список очистится.';
renderEvents();
