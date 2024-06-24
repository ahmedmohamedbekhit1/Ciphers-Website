// Function to perform Caesar cipher encryption
function CaesarEncrypt(plaintext, key) {
    let cipher_txt = "";
    let details = `*** Encrypting by Caesar ***\n`;
    details += `Plaintext: ${plaintext}\n`;
    let plaintextIndices = plaintext.split('').map(char => charToAlphabeticIndex(char));
    details += `Plaintext indices: ${plaintextIndices.join(' ')}\n`;
    details += `Key: +${key}\n`;

    let cipherIndices = [];
    for (let i = 0; i < plaintext.length; i++) {
        let char = plaintext.charAt(i);
        if (char === ' ') {
            cipher_txt += ' ';
            cipherIndices.push(' ');
            continue;
        }
        let encryptedChar = '';
        let index = charToAlphabeticIndex(char);
        if (char.match(/[A-Z]/)) {
            encryptedChar = String.fromCharCode((index + key) % 26 + 'A'.charCodeAt(0));
        } else if (char.match(/[a-z]/)) {
            encryptedChar = String.fromCharCode((index + key) % 26 + 'a'.charCodeAt(0));
        } else {
            encryptedChar = char;
        }
        cipher_txt += encryptedChar;
        cipherIndices.push((index + key) % 26);
    }
    details += `Ciphertext indices: ${cipherIndices.join(' ')}\n`;
    details += `Ciphertext: ${cipher_txt}\n`;

    return {
        ciphertext: cipher_txt,
        details: details
    };
}

// Function to perform Caesar cipher decryption
function CaesarDecrypt(ciphertext, key) {
    let plain_txt = "";
    let details = `*** Decrypting by Caesar ***\n`;
    details += `Ciphertext: ${ciphertext}\n`;
    let cipherIndices = ciphertext.split('').map(char => charToAlphabeticIndex(char));
    details += `Ciphertext indices: ${cipherIndices.join(' ')}\n`;
    details += `Key: -${key}\n`;

    let plaintextIndices = [];
    for (let i = 0; i < ciphertext.length; i++) {
        let char = ciphertext.charAt(i);
        if (char === ' ') {
            plain_txt += ' ';
            plaintextIndices.push(' ');
            continue;
        }
        let decryptedChar = '';
        let index = charToAlphabeticIndex(char);
        if (char.match(/[A-Z]/)) {
            decryptedChar = String.fromCharCode((index - key + 26) % 26 + 'A'.charCodeAt(0));
        } else if (char.match(/[a-z]/)) {
            decryptedChar = String.fromCharCode((index - key + 26) % 26 + 'a'.charCodeAt(0));
        } else {
            decryptedChar = char;
        }
        plain_txt += decryptedChar;
        plaintextIndices.push((index - key + 26) % 26);
    }
    details += `Plaintext indices: ${plaintextIndices.join(' ')}\n`;
    details += `Plaintext: ${plain_txt}\n`;

    return {
        plaintext: plain_txt,
        details: details
    };
}

// Function to convert character to alphabetic index (0-25)
function charToAlphabeticIndex(char) {
    if (char.match(/[A-Z]/)) {
        return char.charCodeAt(0) - 'A'.charCodeAt(0);
    } else if (char.match(/[a-z]/)) {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    } else {
        return -1; // Non-alphabetic characters
    }
}

// Function to validate inputs before processing
function validateInputs() {
    let plaintext = document.getElementById("plaintext").value.trim();
    let ciphertext = document.getElementById("ciphertext").value.trim();
    let key = document.getElementById("key").value.trim();
    let action = document.getElementById("action").value;

    if ((action === "encrypt" && !plaintext) || (action === "decrypt" && !ciphertext) || !key) {
        alert("Please enter all available inputs in Caesar");
        return false;
    }
    return true;
}

// Function to process encryption or decryption based on action
function processAction() {
    if (!validateInputs()) {
        return;
    }

    let plaintext = document.getElementById("plaintext").value.trim();
    let ciphertext = document.getElementById("ciphertext").value.trim();
    let key = parseInt(document.getElementById("key").value.trim());
    let action = document.getElementById("action").value;

    let result = {};
    if (action === "encrypt") {
        result = CaesarEncrypt(plaintext, key);
        document.getElementById("ciphertext").value = result.ciphertext;
    } else if (action === "decrypt") {
        result = CaesarDecrypt(ciphertext, key);
        document.getElementById("plaintext").value = result.plaintext;
    }

    document.getElementById("details").innerText = result.details;
}

// Attach event listener to process button
document.getElementById("process-btn").addEventListener("click", processAction);

