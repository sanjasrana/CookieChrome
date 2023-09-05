let processedEntities = null;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'extractedText') {
        const textToProcess = request.text;
        // its is for making an http post request to the main Flask server.
        fetch('http://localhost:5000/process-text', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: textToProcess })
        })
            .then(response => response.json())
            .then(data => {
                processedEntities = data.terms;
                sendResponse({ message: 'Processed entities received.' });
            })
            .catch(error => {
                console.error('Error:', error);
                sendResponse({ message: 'Error processing entities.' });
            });

        return true; 
    } else if (request.action === 'getProcessedEntities') {
        sendResponse({ processedEntities: processedEntities });
        console.log(processedEntities);
    } else if (request.action === 'error') {
        console.error(request.message);
        sendResponse({ message: 'Error in content script.' });
    }
});
