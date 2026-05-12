// Admin login and price update logic for menu.html

(function(){
  // --- CONFIG ---
  const ADMIN_PASSWORD = "hartles2026"; // Change this password as needed

  // --- UTILS ---
  function getSavedPrices() {
    try {
      return JSON.parse(localStorage.getItem("hartles_prices")||"{}") || {};
    } catch(e) { return {}; }
  }
  function savePrices(prices) {
    localStorage.setItem("hartles_prices", JSON.stringify(prices));
  }

  // --- LOGIN UI ---
  function showAdminLogin() {
    if(document.getElementById("adminLoginModal")) return;
    const modal = document.createElement("div");
    modal.id = "adminLoginModal";
    modal.innerHTML = `
      <div style="position:fixed;z-index:9999;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;">
        <form id="adminLoginForm" style="background:#fff;padding:2rem 2.5rem;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.18);display:flex;flex-direction:column;gap:1.2rem;min-width:280px;">
          <h2 style="margin:0 0 1rem 0;font-size:1.3rem;">Admin Login</h2>
          <input type="password" id="adminPass" placeholder="Password" style="padding:.7rem 1rem;font-size:1rem;border-radius:6px;border:1px solid #ccc;" required />
          <button type="submit" style="background:#E4002B;color:#fff;font-weight:700;padding:.7rem 1rem;border-radius:6px;border:none;font-size:1rem;">Login</button>
          <button type="button" id="adminLoginCancel" style="background:#eee;color:#333;padding:.5rem 1rem;border-radius:6px;border:none;">Cancel</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("adminLoginCancel").onclick = function(){modal.remove();};
    document.getElementById("adminLoginForm").onsubmit = function(e){
      e.preventDefault();
      const pass = document.getElementById("adminPass").value;
      if(pass === ADMIN_PASSWORD) {
        modal.remove();
        showPriceEditor();
      } else {
        alert("Incorrect password.");
      }
    };
  }

  // --- PRICE EDITOR UI ---
  function showPriceEditor() {
    if(document.getElementById("priceEditorModal")) return;
    const prices = getSavedPrices();
    const items = Array.from(document.querySelectorAll(".mic")).map(function(mic, idx){
      const name = mic.querySelector(".mic-name").innerText.trim();
      const priceEl = mic.querySelector(".mic-price");
      const price = priceEl.innerText.replace(/[^0-9.]/g,"");
      return { idx, name, price, priceEl };
    });
    const modal = document.createElement("div");
    modal.id = "priceEditorModal";
    modal.innerHTML = `
      <div style="position:fixed;z-index:9999;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;">
        <form id="priceEditorForm" style="background:#fff;padding:2rem 2.5rem;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.18);display:flex;flex-direction:column;gap:1.2rem;max-height:80vh;overflow:auto;min-width:320px;">
          <h2 style="margin:0 0 1rem 0;font-size:1.3rem;">Update Menu Prices</h2>
          <div style="display:flex;flex-direction:column;gap:.7rem;max-height:50vh;overflow:auto;">
            ${items.map((item,i)=>`
              <label style="display:flex;align-items:center;justify-content:space-between;gap:.7rem;font-size:.98rem;">
                <span style="flex:1;">${item.name}</span>
                <input type="number" min="0" step="0.01" name="price_${i}" value="${prices[item.name]||item.price}" style="width:90px;padding:.3rem .5rem;border-radius:5px;border:1px solid #ccc;" />
              </label>
            `).join("")}
          </div>
          <div style="display:flex;gap:.7rem;justify-content:flex-end;">
            <button type="submit" style="background:#E4002B;color:#fff;font-weight:700;padding:.7rem 1.2rem;border-radius:6px;border:none;font-size:1rem;">Save</button>
            <button type="button" id="priceEditorCancel" style="background:#eee;color:#333;padding:.5rem 1.2rem;border-radius:6px;border:none;">Cancel</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("priceEditorCancel").onclick = function(){modal.remove();};
    document.getElementById("priceEditorForm").onsubmit = function(e){
      e.preventDefault();
      const form = e.target;
      const newPrices = getSavedPrices();
      items.forEach((item,i)=>{
        const val = form[`price_${i}`].value;
        newPrices[item.name] = val;
        item.priceEl.innerText = "$"+parseFloat(val).toFixed(2);
      });
      savePrices(newPrices);
      alert("Prices updated!");
      modal.remove();
    };
  }

  // --- APPLY PRICES ON LOAD ---
  function applySavedPrices() {
    const prices = getSavedPrices();
    document.querySelectorAll(".mic").forEach(function(mic){
      const name = mic.querySelector(".mic-name").innerText.trim();
      const priceEl = mic.querySelector(".mic-price");
      if(prices[name]) priceEl.innerText = "$"+parseFloat(prices[name]).toFixed(2);
    });
  }

  // --- ADMIN BUTTON ---
  function addAdminButton() {
    if(document.getElementById("adminBtn")) return;
    const btn = document.createElement("button");
    btn.id = "adminBtn";
    btn.innerText = "Admin";
    btn.style.position = "fixed";
    btn.style.bottom = "1.5rem";
    btn.style.left = "1.5rem";
    btn.style.background = "#374151";
    btn.style.color = "#fff";
    btn.style.fontWeight = "700";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.style.padding = ".7rem 1.3rem";
    btn.style.zIndex = "500";
    btn.style.boxShadow = "0 4px 16px rgba(0,0,0,0.13)";
    btn.style.cursor = "pointer";
    btn.onclick = showAdminLogin;
    document.body.appendChild(btn);
  }

  // --- INIT ---
  document.addEventListener("DOMContentLoaded", function(){
    applySavedPrices();
    addAdminButton();
  });
})();
