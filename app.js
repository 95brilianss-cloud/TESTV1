/** * CORE LOGIC - TURBINE LOGSHEET PRO
 * Departemen Operasi Pabrik III B - PT Petrokimia Gresik
 */

// 1. DAFTAR PARAMETER UNIT
const AREAS = {
    "Steam Inlet Turbine": ["MPS Inlet 30-TP-6101 PI-6114 (kg/cm2)", "MPS Inlet 30-TP-6101 TI-6153 (°C)", "MPS Inlet 30-TP-6101 PI-6116 (kg/cm2)", "LPS Extrac 30-TP-6101 PI-6123 (kg/cm2)", "Gland Steam TI-6156 (°C)", "MPS Inlet 30-TP-6101 PI-6108 (Kg/cm2)", "Exhaust Steam PI-6111 (kg/cm2)", "Gland Steam PI-6118 (Kg/cm2)"],
    "Low Pressure Steam": ["LPS from U-6101 PI-6104 (kg/cm2)", "LPS from U-6101 TI-6102 (°C)", "LPS Header PI-6106 (Kg/cm2)", "LPS Header TI-6107 (°C)"],
    "Lube Oil": ["Lube Oil 30-TK-6102 LI-6104 (%)", "Lube Oil 30-TK-6102 TI-6125 (°C)", "Lube Oil 30-C-6101 (On/Off)", "Lube Oil 30-EH-6102 (On/Off)", "Lube Oil Cartridge FI-6143 (%)", "Lube Oil Cartridge PI-6148 (mmH2O)", "Lube Oil Cartridge PI-6149 (mmH2O)", "Lube Oil PI-6145 (kg/cm2)", "Lube Oil E-6104 (A/B)", "Lube Oil TI-6127 (°C)", "Lube Oil FIL-6101 (A/B)", "Lube Oil PDI-6146 (Kg/cm2)", "Lube Oil PI-6143 (Kg/cm2)", "Lube Oil TI-6144 (°C)", "Lube Oil TI-6146 (°C)", "Lube Oil TI-6145 (°C)", "Lube Oil FG-6144 (%)", "Lube Oil FG-6146 (%)", "Lube Oil TI-6121 (°C)", "Lube Oil TI-6116 (°C)", "Lube Oil FG-6121 (%)", "Lube Oil FG-6116 (%)"],
    "Control Oil": ["Control Oil 30-TK-6103 LI-6106 (%)", "Control Oil 30-TK-6103 TI-6128 (°C)", "Control Oil P-6106 (A/B)", "Control Oil FIL-6103 (A/B)", "Control Oil PI-6152 (Bar)"],
    "Shaft Line": ["Jacking Oil 30-P-6105 PI-6158 (Bar)", "Jacking Oil 30-P-6105 PI-6161 (Bar)", "Electrical Turning Gear U-6103 (Remote/Running/Stop)", "EH-6101 (ON/OFF)"],
    "Condenser 30-E-6102": ["LG-6102 (%)", "30-P-6101 (A/B)", "30-P-6101 Suction (kg/cm2)", "30-P-6101 Discharge (kg/cm2)", "30-P-6101 Load (Ampere)"],
    "Ejector": ["J-6101 PI-6126 A (Kg/cm2)", "J-6101 PI-6127 B (Kg/cm2)", "J-6102 PI-6128 A (Kg/cm2)", "J-6102 PI-6129 B (Kg/cm2)", "J-6104 PI-6131 (Kg/cm2)", "J-6104 PI-6138 (Kg/cm2)", "PI-6172 (kg/cm2)", "LPS Extrac 30-TP-6101 TI-6155 (°C)", "from U-6102 TI-6104 (°C)"],
    "Generator Cooling Water": ["Air Cooler PI-6124 A (Kg/cm2)", "Air Cooler PI-6124 B (Kg/cm2)", "Air Cooler TI-6113 A (°C)", "Air Cooler TI-6113 B (°C)", "Air Cooler PI-6125 A (Kg/cm2)", "Air Cooler PI-6125 B (Kg/cm2)", "Air Cooler TI-6114 A (°C)", "Air Cooler TI-6114 B (°C)"],
    "Condenser Cooling Water": ["Condenser PI-6135 A (Kg/cm2)", "Condenser PI-6135 B (Kg/cm2)", "Condenser TI-6118 A (°C)", "Condenser TI-6118 B (°C)", "Condenser PI-6136 A (Kg/cm2)", "Condenser PI-6136 B (Kg/cm2)", "Condenser TI-6119 A (°C)", "Condenser TI-6119 B (°C)"],
    "BFW System": ["Condensate Tank TK-6201 (%)", "Condensate Tank TI-6216 (°C)", "P-6202 (A/B)", "P-6202 Suction (kg/cm2)", "P-6202 Discharge (kg/cm2)", "P-6202 Load (Ampere)", "Deaerator LI-6202 (%)", "Deaerator TI-6201 (°C)", "30-P-6201 (A/B)", "30-P-6201 Suction (kg/cm2)", "30-P-6201 Discharge (kg/cm2)", "30-P-6201 Load (Ampere)", "30-C-6202 A (ON/OFF)", "30-C-6202 A (Ampere)", "30-C-6202 B (ON/OFF)", "30-C-6202 B (Ampere)", "30-C-6202 PCV-6216 (%)", "30-C-6202 PI-6107 (kg/cm2)", "Condensate Drum 30-D-6201 LI-6209 (%)", "Condensate Drum 30-D-6201 PI-6218 (kg/cm2)", "Condensate Drum 30-D-6201 TI-6215 (°C)"],
    "Chemical Dosing": ["30-TK-6205 LI-6204 (%)", "30-TK-6205 30-P-6205 (A/B)", "30-TK-6205 Disch (kg/cm2)", "30-TK-6205 Stroke (%)", "30-TK-6206 LI-6206 (%)", "30-TK-6206 30-P-6206 (A/B)", "30-TK-6206 Disch (kg/cm2)", "30-TK-6206 Stroke (%)", "30-TK-6207 LI-6208 (%)", "30-TK-6207 30-P-6207 (A/B)", "30-TK-6207 Disch (kg/cm2)", "30-TK-6207 Stroke (%)"]
};

// State & Konfigurasi
const DEFAULT_URL = "https://script.google.com/macros/s/AKfycbwDXJDWp20C4QFuK0Lz20P9X9zmLgccFQke-lBsacBbpnJA950qOCt4CG_gqrdeW_ie/exec";
let GAS_URL = localStorage.getItem('gas_url_custom') || DEFAULT_URL;
let lastData = {}, currentInput = JSON.parse(localStorage.getItem('draft_turbine')) || {}, activeArea = "", activeIdx = 0;

// Logika Install PWA
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', (e) => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        deferredPrompt = null;
    });
});

window.addEventListener('appinstalled', (evt) => {
    installBtn.style.display = 'none';
});

// Inisialisasi
window.onload = () => { 
    registerSW();
    renderMenu(); 
};

function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(() => console.log("SW Active"));
    }
}

// Navigasi & UI
function navigateTo(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'areaListScreen') fetchLastData();
}

function showCustomAlert(msg) { 
    document.getElementById('alertMessage').innerText = msg; 
    document.getElementById('customAlert').classList.remove('hidden'); 
}

function closeAlert() { document.getElementById('customAlert').classList.add('hidden'); }

// Data Sync (JSONP)
function fetchLastData() {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';
    
    // Timeout jika server mati
    const timeout = setTimeout(() => {
        if(loader.style.display === 'flex') {
            loader.style.display = 'none';
            console.warn("Sinkronisasi timeout, menggunakan mode offline");
        }
    }, 5000); 

    const cb = 'jsonp_' + Date.now();
    const s = document.createElement('script');
    window[cb] = (d) => { 
        clearTimeout(timeout); // Batalkan timeout jika sukses
        lastData = d; 
        document.getElementById('statusPill').innerText = "Online"; 
        loader.style.display = 'none'; 
        renderMenu(); 
        delete window[cb]; s.remove(); 
    };
    s.src = `${GAS_URL}?callback=${cb}`;
    s.onerror = () => { 
        clearTimeout(timeout); 
        loader.style.display = 'none'; 
        renderMenu(); 
    };
    document.body.appendChild(s);
}
// Render Menu
function renderMenu() {
    const list = document.getElementById('areaList');
    list.innerHTML = `<h3 style="margin-bottom:20px; color: var(--text-main);">⚙️ Pilih Area TURBINE</h3>`;
    Object.keys(AREAS).forEach(a => {
        const count = currentInput[a] ? Object.keys(currentInput[a]).length : 0;
        list.innerHTML += `<div class="area-item" onclick="openArea('${a}')"><div><b>${a}</b><br><small>${count}/${AREAS[a].length} diisi</small></div><div class="badge">${count}/${AREAS[a].length}</div></div>`;
    });
    document.getElementById('submitBtn').style.display = Object.keys(currentInput).length > 0 ? 'block' : 'none';
}

function openArea(a) { activeArea = a; activeIdx = 0; navigateTo('paramScreen'); document.getElementById('currentAreaName').innerText = a; showStep(); }

function showStep() {
    const fullLabel = AREAS[activeArea][activeIdx];
    document.getElementById('stepInfo').innerText = `STEP ${activeIdx + 1} / ${AREAS[activeArea].length}`;
    document.getElementById('labelInput').innerText = fullLabel.split(' (')[0];
    document.getElementById('unitDisplay').innerText = (fullLabel.match(/\(([^)]+)\)/) || ["","--"])[1];
    document.getElementById('prevValDisplay').innerText = lastData[fullLabel] || "--";
    document.getElementById('valInput').value = (currentInput[activeArea] && currentInput[activeArea][fullLabel]) || "";
    setTimeout(() => document.getElementById('valInput').focus(), 300);
}

function saveStep() {
    const val = document.getElementById('valInput').value.trim();
    if(val) {
        if(!currentInput[activeArea]) currentInput[activeArea] = {};
        currentInput[activeArea][AREAS[activeArea][activeIdx]] = val;
        localStorage.setItem('draft_turbine', JSON.stringify(currentInput));
    }
    if(activeIdx < AREAS[activeArea].length - 1) { activeIdx++; showStep(); } 
    else { navigateTo('areaListScreen'); }
}

async function sendToSheet() {
    document.getElementById('loader').style.display = 'flex';
    const finalData = {}; 
    Object.values(currentInput).forEach(obj => Object.assign(finalData, obj));
    try {
        await fetch(GAS_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(finalData) });
        showCustomAlert("✓ Sukses! Data berhasil dikirim.");
        currentInput = {}; localStorage.removeItem('draft_turbine'); navigateTo('homeScreen');
    } catch (e) { showCustomAlert("Gagal mengirim!"); }
    document.getElementById('loader').style.display = 'none';
}
