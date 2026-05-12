// Adds a subtle Admin button on the menu page that links to admin.html
document.addEventListener('DOMContentLoaded', function(){
  if(document.getElementById('adminBtn')) return;
  var btn = document.createElement('a');
  btn.id   = 'adminBtn';
  btn.href = 'admin.html';
  btn.textContent = 'Admin';
  btn.style.cssText = [
    'position:fixed','bottom:1.5rem','left:1.5rem',
    'background:#374151','color:#fff','font-weight:700',
    'border-radius:8px','padding:.65rem 1.2rem','z-index:500',
    'box-shadow:0 4px 16px rgba(0,0,0,.15)','cursor:pointer',
    'text-decoration:none','font-size:.85rem','display:inline-block',
    'font-family:-apple-system,BlinkMacSystemFont,sans-serif'
  ].join(';');
  document.body.appendChild(btn);
});
