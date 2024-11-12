const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

function loadMenu(pdfUrl) {
    console.log(`Loading PDF from: ${pdfUrl}`);
    document.getElementById('menu-buttons').style.display = 'none';
    document.getElementById('back-button').classList.remove('disabled');
    document.getElementById('pdf-container').style.display = 'flex';
    document.getElementById('pdf-container').innerHTML = ''; // Clear previous content

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(pdf => {
        console.log('PDF loaded');

        // Loop through each page
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            pdf.getPage(pageNumber).then(page => {
                console.log(`Page ${pageNumber} loaded`);

                const scale = 1.5;
                const viewport = page.getViewport({ scale });

                // Prepare canvas using PDF page dimensions
                const canvas = document.createElement('canvas');
                canvas.className = 'pdf-page';
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                const renderTask = page.render(renderContext);
                renderTask.promise.then(() => {
                    console.log(`Page ${pageNumber} rendered`);
                });

                // Append canvas to the container
                document.getElementById('pdf-container').appendChild(canvas);
            });
        }
    }, reason => {
        console.error('Error loading PDF:', reason);
    });
}

function showMenuButtons() {
    if (document.getElementById('back-button').classList.contains('disabled')) {
        return;
    }
    document.getElementById('menu-buttons').style.display = 'flex';
    document.getElementById('back-button').classList.add('disabled');
    document.getElementById('pdf-container').style.display = 'none';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleButton = document.getElementById('dark-mode-toggle');
    const toggleLabel = document.getElementById('dark-mode-label');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = '☀️';
        toggleLabel.textContent = 'Light Mode';
    } else {
        toggleButton.textContent = '🌙';
        toggleLabel.textContent = 'Dark Mode';
    }
}