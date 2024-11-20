const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

// Function to load the menu PDF
function loadMenu(pdfUrl) {
    console.log(`Loading PDF from: ${pdfUrl}`);
    document.getElementById('menu-buttons').style.display = 'none';
    document.getElementById('back-button').classList.remove('disabled');
    document.getElementById('pdf-container').style.display = 'flex';
    document.getElementById('pdf-container').innerHTML = ''; // Clear previous content
    document.getElementById('access-message').style.display = 'none';

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(pdf => {
        console.log('PDF loaded');

        // Loop through each page
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            pdf.getPage(pageNumber).then(page => {
                console.log(`Page ${pageNumber} loaded`);
                let dpr = window.devicePixelRatio
                console.log(`this is device dpr: ${dpr}` );
                if (dpr < 3) {
                    dpr = 3;
                }
                const scale = dpr || 1; // Adjust scale based on device pixel ratio
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