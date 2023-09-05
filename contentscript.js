window.addEventListener('load', function () {
    const websitecookiepolicyElement = document.querySelectorAll('div.content-area .gucci-wysiwyg-content');

    if (websitecookiepolicyElement) {
        const cookiepolicyText = websitecookiepolicyElement[13].innerText;
        console.log("original text - ", cookiepolicyText)
        const preprocessedText = preprocessText(cookiepolicyText);
        console.log("preprocessed text - ", preprocessedText)


        chrome.runtime.sendMessage({ action: 'extractedText', text: preprocessedText });
    } else {
        chrome.runtime.sendMessage({ action: 'extractedText', text: null });
    }
});

function preprocessText(text) {
    const t = text.toLowerCase().split(/\s+/);
    const s = t.map(token => token.replace(/[^\w\s]/g, ' '));
    const stopWords = new Set([
        'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'or', 'it', 'also', 'or',
        'the', 'these', 'of', 'their', 'such', 'as', 'you', 'in', 'it', 'will', 'be', 'by',
        'other', 'etc', 'to', 'div'
    ]);

    const ft = s.filter(t => !stopWords.has(t));

    return ft.join(' ');
}