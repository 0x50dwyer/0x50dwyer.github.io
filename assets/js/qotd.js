// Wait until the browser finishes parsing the HTML DOM tree
document.addEventListener('DOMContentLoaded', function() {

    const QUOTE_FILE_PATH = 'assets/js/quotes.txt';

    fetch(QUOTE_FILE_PATH)

        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response failed with status: ' + response.status);
            }
            
            return response.text();
        })

        
        .then(function(textContent) {
            
            const rawLines = textContent.split('\n');

            const quotesArray = [];

            for (let i = 0; i < rawLines.length; i++) {

                const cleanLine = rawLines[i].trim();

                if (cleanLine === '') {
                    continue;
                }

                const quoteEndArray = cleanLine.split('―');

                if (quoteEndArray != []) {

                    const extractedQuote = quoteEndArray[0].trim();

                    const extractedAuthor = quoteEndArray[1].trim();

                    const quoteObject = { text: extractedQuote, author: extractedAuthor };

                    quotesArray.push(quoteObject);
                }
            }

            if (quotesArray.length === 0) {
                console.warn('No valid quotes found. Expected format per line: "Quote" - Author');
                return;
            }

            const today = new Date();

            const startOfYear = new Date(today.getFullYear(), 0, 1);
            const msElapsed = today - startOfYear;

            const daysElapsed = Math.floor(msElapsed / (1000 * 60 * 60 * 24));

            const dailyArray = daysElapsed % quotesArray.length;

            const selectedQuote = quotesArray[dailyArray];

            document.getElementById('quote-text').textContent = selectedQuote.text;

            document.getElementById('quote-author').textContent = '— ' + selectedQuote.author;

        })

        .catch(function(error) {
            console.error('Failed to load quote of the day:', error);
            document.getElementById('quote-text').textContent = 'Quote temporarily unavailable.';
            document.getElementById('quote-author').textContent = '';
        });
});
