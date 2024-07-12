const cryptography = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

const decryption = {
    'ai': 'a',
    'enter': 'e',
    'imes': 'i',
    'ober': 'o',
    'ufat': 'u'
};

//Elements
let userText = document.getElementById('text');
let imgMulher =  document.getElementById('imgWomen');
let noMsg =  document.getElementById('noMsg');
let warningDecryption = document.getElementById('warningDecryption');
let translatedText = document.getElementById('translatedText');
let copyButton = document.getElementById('copyButton');

function encrypt(){
    let text = userText.value;
    
    if(!text){
        return '';
    }else{
        let encryptedText = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            if (cryptography[char]) {
                encryptedText += cryptography[char];
            } else {
                encryptedText += char;
            }
        }

        //Disable elements
        imgWomen.style.display = 'none';
        noMsg.style.display = 'none';
        warningDecryption.style.display = 'none';
            
        //Activate elements
        copyButton.style.display = 'block';
        let textarea = translatedText;
        textarea.style.display = 'flex';
        textarea.value = encryptedText;
        return encryptedText;
    }
}

document.getElementById('encryptButton').addEventListener('click', function() {
    encrypt();
    
    if(!userText.value){
        //Disable elements
        translatedText.style.display = 'none';
        copyButton.style.display = 'none';
        //Activate elementos
        imgWomen.style.display = 'flex';
        noMsg.style.display = 'flex';
        warningDecryption.style.display = 'flex';
    }
});

function decrypt(){
    let text = userText.value;

    if(!text){
        return '';
    }else{
        let decryptedText = '';
        let counter = 0;

        while (counter < text.length) {
            let substituted = false;

            for (let word in decryption) {
                //StartsWith(): verify if the text starts with the word, in a certain position
                if (text.startsWith(word, counter)) {
                    decryptedText += decryption[word];
                    counter += word.length;
                    substituted = true;
                    break;
                }
            }

            if (!substituted) {
                decryptedText += text[counter];
                counter++;
            }
        }

        //Disable elements
        imgWomen.style.display = 'none';
        noMsg.style.display = 'none';
        warningDecryption.style.display = 'none';
            
        //Activate elements
        copyButton.style.display = 'block';
        let textarea = translatedText;
        textarea.style.display = 'flex';
        textarea.value = decryptedText;
        return decryptedText;
    }
}

document.getElementById('decryptButton').addEventListener('click', function() {
    decrypt();
    
    if(!userText.value){
        //Disable elements
        translatedText.style.display = 'none';
        copyButton.style.display = 'none';
        //Activate elements
        imgWomen.style.display = 'flex';
        noMsg.style.display = 'flex';
        warningDecryption.style.display = 'flex';
    }
});

function copy(){
    navigator.clipboard.writeText(translatedText.value);
}

function removeAccentsAndLowercase(text) {
    const accents = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
        'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
        'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u',
        'ã': 'a', 'õ': 'o', 'ç': 'c',
        'Á': 'a', 'É': 'e', 'Í': 'i', 'Ó': 'o', 'Ú': 'u',
        'À': 'a', 'È': 'e', 'Ì': 'i', 'Ò': 'o', 'Ù': 'u',
        'Â': 'a', 'Ê': 'e', 'Î': 'i', 'Ô': 'o', 'Û': 'u',
        'Ä': 'a', 'Ë': 'e', 'Ï': 'i', 'Ö': 'o', 'Ü': 'u',
        'Ã': 'a', 'Õ': 'o', 'Ç': 'c'
    };

    //Split(): splits text into an array
    //Map(): create another array
    //Join(): group the array elements into a string
    //toLowerCase(): let the letters in lowercase
    return text.split('').map(char => accents[char] || char).join('').toLowerCase();
}

function validateTextarea(event) {
    userText.value = removeAccentsAndLowercase(userText.value);
}