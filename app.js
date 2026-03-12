/** * CORE LOGIC - TURBINE LOGSHEET PRO
 * Departemen Operasi Pabrik III B - PT Petrokimia Gresik
 */

// 1. DAFTAR PARAMETER UNIT (Database Area & Instrumen)
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

// 2. STATE & KONFIGURASI SISTEM
const DEFAULT_URL = "https://script.google.com/macros/s/AKfycbx3hM7m8_yBkbOTz3IN0lCTCFrDyGcNnTwM7RG5P4Wbmna5i2ldlbrhlijj4xl_Yhi_/exec";
let GAS_URL = localStorage.getItem('gas_url_custom') || DEFAULT_URL;
let lastData = {}; 
let currentInput = JSON.parse(localStorage.getItem('draft_turbine')) || {}; 
let activeArea = ""; 
let activeIdx = 0;

// 3. INISIALISASI SAAT HALAMAN DIMUAT
window.onload = () => { 
    registerSW();
    renderMenu(); 
};

// Registrasi Service Worker untuk Mode Offline
function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log("Service Worker Active"))
            .catch(err => console.error("SW Register Failed:", err));
    }
}

// 4. SISTEM NAVIGASI LAYAR
function navigateTo(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Jika masuk ke daftar area, tarik data terakhir dari Google Sheet
    if(id === 'areaListScreen') fetchLastData();
}

// 5. NOTIFIKASI CUSTOM (Alert)
function showCustomAlert(msg) { 
    document.getElementById('alertMessage').innerText = msg; 
    document.getElementById('customAlert').classList.remove('hidden'); 
}

function closeAlert() { 
    document.getElementById('customAlert').classList.add('hidden'); 
}

// 6. SYNC DATA (Ambil Data Terakhir via JSONP untuk bypass CORS)
function fetchLastData() {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';

    const timeout = setTimeout(() => { 
        loader.style.display = 'none'; 
        renderMenu(); 
    }, 8000); 

    const cb = 'jsonp_' + Date.now();
    const s = document.createElement('script');
    
    window[cb] = (d) => { 
        clearTimeout(timeout); 
        lastData = d; 
        const status = document.getElementById('statusPill');
        status.innerText = "Online"; 
        status.style.background = "#dcfce7"; 
        status.style.color = "#166534"; 
        delete window[cb]; 
        s.remove(); 
        loader.style.display = 'none';
        renderMenu(); 
    };

    s.src = `${GAS_URL}?callback=${cb}`;
    s.onerror = () => { 
        clearTimeout(timeout); 
        loader.style.display = 'none';
        renderMenu(); 
    };
    document.body.appendChild(s);
}

// 7. RENDERING MENU UTAMA
function renderMenu() {
    const list = document.getElementById('areaList');
    list.innerHTML = `<h3 style="margin-bottom:20px; color: var(--text-main);">⚙️ Pilih Area TURBINE</h3>`;
    
    Object.keys(AREAS).forEach(a => {
        const count = currentInput[a] ? Object.keys(currentInput[a]).length : 0;
        const total = AREAS[a].length;
        const isDone = count === total;

        list.innerHTML += `
            <div class="area-item" onclick="openArea('${a}')">
                <div>
                    <b>${a}</b><br>
                    <small>${count}/${total} Parameter diisi</small>
                </div>
                <div class="badge" style="background: ${isDone ? '#22c55e' : '#f1f5f9'}; color: ${isDone ? 'white' : '#64748b'}">
                    ${count}/${total}
                </div>
            </div>`;
    });

    // Tampilkan tombol kirim jika sudah ada data yang diinput
    const hasData = Object.keys(currentInput).length > 0;
    document.getElementById('submitBtn').style.display = hasData ? 'block' : 'none';
}

// 8. LOGIKA INPUT STEP-BY-STEP
function openArea(a) { 
    activeArea = a; 
    activeIdx = 0; 
    navigateTo('paramScreen'); 
    document.getElementById('currentAreaName').innerText = a; 
    showStep(); 
}

function getUnit(label) { 
    const match = label.match(/\(([^)]+)\)/); 
    return match ? match[1] : ""; 
}

function showStep() {
    const fullLabel = AREAS[activeArea][activeIdx];
    const unit = getUnit(fullLabel);
    
    document.getElementById('stepInfo').innerText = `STEP ${activeIdx + 1} / ${AREAS[activeArea].length}`;
    document.getElementById('labelInput').innerText = fullLabel.split(' (')[0];
    document.getElementById('unitDisplay').innerText = unit || "--";
    document.getElementById('lastTimeLabel').innerText = lastData._lastTime || "--:--";
    document.getElementById('prevValDisplay').innerText = lastData[fullLabel] || "--";
    
    // Load data dari draft jika ada
    document.getElementById('valInput').value = (currentInput[activeArea] && currentInput[activeArea][fullLabel]) || "";
    
    // Auto-focus ke input
    setTimeout(() => document.getElementById('valInput').focus(), 300);
}

function saveStep() {
    const val = document.getElementById('valInput').value.trim();
    const fullLabel = AREAS[activeArea][activeIdx];

    if(val) {
        if(!currentInput[activeArea]) currentInput[activeArea] = {};
        currentInput[activeArea][fullLabel] = val;
        // Simpan ke LocalStorage agar data tidak hilang jika browser tertutup
        localStorage.setItem('draft_turbine', JSON.stringify(currentInput));
    }

    if(activeIdx < AREAS[activeArea].length - 1) { 
        activeIdx++; 
        showStep(); 
    } else { 
        navigateTo('areaListScreen'); 
    }
}

function goBack() {
    if(activeIdx > 0) { 
        activeIdx--; 
        showStep(); 
    } else { 
        navigateTo('areaListScreen'); 
    }
}

// 9. PENGIRIMAN DATA KE GOOGLE SHEETS
async function sendToSheet() {
    document.getElementById('loader').style.display = 'flex';
    
    // Gabungkan semua data dari berbagai area menjadi satu objek flat
    const finalData = {}; 
    Object.values(currentInput).forEach(obj => {
        Object.assign(finalData, obj);
    });

    try {
        const response = await fetch(GAS_URL, { 
            method: 'POST', 
            mode: 'no-cors', 
            body: JSON.stringify(finalData) 
        });

        showCustomAlert("✓ Sukses! Data Turbine berhasil dikirim ke Cloud.");
        
        // Bersihkan draft setelah sukses
        currentInput = {}; 
        localStorage.removeItem('draft_turbine'); 
        navigateTo('homeScreen');
        renderMenu();

    } catch (e) { 
        showCustomAlert("Gagal mengirim! Pastikan HP terhubung internet atau VPN Petrokimia."); 
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

// 10. PENGATURAN URL GAS
function openSettings() { 
    navigateTo('settingsScreen'); 
    document.getElementById('gasUrlInput').value = GAS_URL; 
}

function saveSettings() {
    const url = document.getElementById('gasUrlInput').value.trim();
    if(url) { 
        localStorage.setItem('gas_url_custom', url); 
        GAS_URL = url; 
        showCustomAlert("Konfigurasi URL Berhasil disimpan!"); 
        navigateTo('homeScreen'); 
    }
}
