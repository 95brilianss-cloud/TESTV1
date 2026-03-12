/** * CORE LOGIC - TURBINE LOGSHEET PRO
 * Departemen Operasi Pabrik III B - PT Petrokimia Gresik
 */

// 1. DATA & KONFIGURASI
const AREAS = {
    "Steam Inlet Turbine": ["Low Pressure Steam": ["LPS from U-6101 PI-6104 (kg/cm2)", "LPS from U-6101 TI-6102 (°C)", "LPS Header PI-6106 (Kg/cm2)", "LPS Header TI-6107 (°C)"]
};

const DEFAULT_URL = "https://script.google.com/macros/s/AKfycbzfWhyDf8vVlEkHhLu8qxUWcyP-0iNIjAMr_EuoBAkz_BMafJSF8fST3xdlfX9eiXs/exec";
let GAS_URL = localStorage.getItem('gas_url_custom') || DEFAULT_URL;
let lastData = {}, currentInput = JSON.parse(localStorage.getItem('draft_turbine')) || {}, activeArea = "", activeIdx = 0;

// 2. FUNGSI UTAMA (RENDER & NAVIGASI)
function renderMenu() {
    const list = document.getElementById('areaList');
    if (!list) return;
    list.innerHTML = `<h3 style="margin-bottom:20px; color: var(--text-main);">⚙️ Pilih Area TURBINE</h3>`;
    Object.keys(AREAS).forEach(a => {
        const count = currentInput[a] ? Object.keys(currentInput[a]).length : 0;
        list.innerHTML += `<div class="area-item" onclick="openArea('${a}')"><div><b>${a}</b><br><small>${count}/${AREAS[a].length} diisi</small></div><div class="badge">${count}/${AREAS[a].length}</div></div>`;
    });
    document.getElementById('submitBtn').style.display = Object.keys(currentInput).length > 0 ? 'block' : 'none';
}

function navigateTo(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'areaListScreen') fetchLastData();
}

// 3. SINKRONISASI DATA (Perbaikan: Pakai .json() murni, hindari JSONP)
async function fetchLastData() {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(GAS_URL + "?t=" + new Date().getTime(), {
            signal: controller.signal,
            cache: 'no-store'
        });
        
        const data = await response.json(); // Pastikan GAS kirim JSON murni
        lastData = data;
        document.getElementById('statusPill').innerText = "Online - " + (data._lastTime || "--:--");
    } catch (e) {
        console.error("Sinkronisasi gagal:", e);
        document.getElementById('statusPill').innerText = "Offline Mode";
        lastData = {}; 
    } finally {
        clearTimeout(timeoutId);
        loader.style.display = 'none';
        renderMenu();
    }
}

// 4. LOGIKA INPUT & KIRIM
function saveStep() {
    const val = document.getElementById('valInput').value.trim();
    if(!val) { alert("Data tidak boleh kosong!"); return; }
    
    if(!currentInput[activeArea]) currentInput[activeArea] = {};
    currentInput[activeArea][AREAS[activeArea][activeIdx]] = val;
    localStorage.setItem('draft_turbine', JSON.stringify(currentInput));
    
    if(activeIdx < AREAS[activeArea].length - 1) { activeIdx++; showStep(); } 
    else { navigateTo('areaListScreen'); }
}

async function sendToSheet() {
    document.getElementById('loader').style.display = 'flex';
    const finalData = {}; 
    Object.values(currentInput).forEach(obj => Object.assign(finalData, obj));
    try {
        await fetch(GAS_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(finalData) });
        alert("✓ Sukses! Data berhasil dikirim.");
        currentInput = {}; localStorage.removeItem('draft_turbine'); navigateTo('homeScreen');
    } catch (e) { alert("Gagal mengirim!"); }
    document.getElementById('loader').style.display = 'none';
}

// 5. INISIALISASI (Dijalankan paling akhir)
window.onload = () => { 
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
    renderMenu(); 
};
