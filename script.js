// DOM Elements
const runBtn = document.getElementById('run-btn');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const codeInput = document.getElementById('code-input');
const previewFrame = document.getElementById('preview-frame');
const statusMessage = document.getElementById('status-message');

// Event Listeners
runBtn.addEventListener('click', runCode);
saveBtn.addEventListener('click', saveCode);
clearBtn.addEventListener('click', clearCode);

// Fungsi untuk menjalankan kod dan masuk ke mod skrin penuh
function runCode() {
    try {
        statusMessage.textContent = 'Running...';
        const code = codeInput.value;
        previewFrame.srcdoc = code;

        // Masuk ke mod skrin penuh
        if (previewFrame.requestFullscreen) {
            previewFrame.requestFullscreen();
        } else if (previewFrame.webkitRequestFullscreen) { /* Safari */
            previewFrame.webkitRequestFullscreen();
        } else if (previewFrame.mozRequestFullScreen) { /* Firefox */
            previewFrame.mozRequestFullScreen();
        }

        setTimeout(() => {
            statusMessage.textContent = 'Fullscreen (Press Esc to exit)';
        }, 500);
    } catch (error) {
        statusMessage.textContent = 'Error';
        setTimeout(() => {
            statusMessage.textContent = 'Ready';
        }, 2000);
    }
}

// Fungsi untuk menyimpan kod
function saveCode() {
    const code = codeInput.value;
    if (!code.trim()) {
        statusMessage.textContent = 'No code to save!';
        setTimeout(() => {
            statusMessage.textContent = 'Ready';
        }, 2000);
        return;
    }
    
    // Cipta nama fail dengan timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `my-code-${timestamp}.html`;
    
    // Cipta pautan muat turun
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    
    // Mencetuskan muat turun
    document.body.appendChild(a);
    a.click();
    
    // Pembersihan
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    statusMessage.textContent = 'Saved!';
    setTimeout(() => {
        statusMessage.textContent = 'Ready';
    }, 2000);
}

// Fungsi untuk mengosongkan kod
function clearCode() {
    if (confirm('Adakah anda pasti mahu mengosongkan kod?')) {
        codeInput.value = '';
        previewFrame.srcdoc = '';
        autoResizeTextarea();
        statusMessage.textContent = 'Code cleared!';
        setTimeout(() => {
            statusMessage.textContent = 'Ready';
        }, 2000);
    }
}

// Auto-run kod semasa halaman dimuatkan
window.addEventListener('load', () => {
    // Masukkan contoh kod
    codeInput.value = `<div style="text-align: center; margin-top: 20px; color: blue; font-size: 18px;">
                        Hello World!
                      </div>
                      <script>
                        console.log('Code editor siap digunakan!');
                      </script>`;
    runCode();

    // Auto-resize textarea berdasarkan kandungan
    codeInput.addEventListener('input', autoResizeTextarea);
    autoResizeTextarea();
});

// Fungsi untuk auto-resize textarea
function autoResizeTextarea() {
    codeInput.style.height = 'auto';
    codeInput.style.height = `${Math.min(codeInput.scrollHeight, window.innerHeight * 0.6)}px`;
}