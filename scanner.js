document.addEventListener('DOMContentLoaded', function() {
    const codeReader = new ZXing.BrowserMultiFormatReader();
    const videoElement = document.getElementById('video');
    const resultElement = document.getElementById('result');
    const startButton = document.getElementById('startButton');
    
    let scanning = false;

    startButton.addEventListener('click', function() {
        if (scanning) {
            codeReader.reset();
            videoElement.style.display = 'none';
            startButton.textContent = 'Start Scanning';
            scanning = false;
        } else {
            codeReader.decodeFromVideoDevice(null, videoElement, (result, err) => {
                if (result) {
                    resultElement.innerHTML = `
                        <p>Result: ${result.text}</p>
                        <p>Format: ${result.format}</p>
                    `;
                    // Optional: stop after first successful scan
                    // codeReader.reset();
                    // videoElement.style.display = 'none';
                    // startButton.textContent = 'Start Scanning';
                    // scanning = false;
                }
                if (err && !(err instanceof ZXing.NotFoundException)) {
                    console.error(err);
                    resultElement.textContent = err;
                }
            });
            
            videoElement.style.display = 'block';
            startButton.textContent = 'Stop Scanning';
            scanning = true;
        }
    });

    // Clean up when page is unloaded
    window.addEventListener('beforeunload', function() {
        if (scanning) {
            codeReader.reset();
        }
    });
});