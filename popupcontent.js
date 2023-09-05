document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.sendMessage({ action: 'getProcessedEntities' }, function (response) {
        const processedEntities = response.processedEntities;
        console.log("processed text - ", processedEntities)

        const container = document.getElementById('cookie-agreement-entities');

        if (processedEntities && processedEntities.length) {
            let uniqueKeywords;

            if (typeof processedEntities === 'string') {
                uniqueKeywords = [...new Set(processedEntities.split(', ').map(word => word.trim()))];
            } else if (Array.isArray(processedEntities)) {
                uniqueKeywords = [...new Set(processedEntities.map(word => word.trim()))];
            } else {
                container.textContent = "text format not supported";
                return;
            }

            displayRelevantSections(uniqueKeywords);
        } else {
            container.textContent = "Couldn't find the cookie policy text.";
        }
    });
});


function displayRelevantSections(keywords) {
    keywords.forEach(keyword => {
        switch (keyword) {
            case 'location':
                document.getElementById('location1').style.display = 'block';
                break;
            case 'ip':
                document.getElementById('ipaddress1').style.display = 'block';
                break;
            case 'information':
                document.getElementById('personalinfo1').style.display = 'block';
                break;
            case 'email':
                document.getElementById('email1').style.display = 'block';
                break;
            case 'signature':
                document.getElementById('Signature1').style.display = 'block';
                break;
            case 'device':
                document.getElementById('device1').style.display = 'block';
                break;
            case 'card':
                document.getElementById('card1').style.display = 'block';
                break;
            case 'activity':
                document.getElementById('interest1').style.display = 'block';
                break;
        }
    });
}




