function vigenereEncrypt(plaintext, key, mode) {
    plaintext = plaintext.toUpperCase().replace(/ /g, "");
    key = key.toUpperCase();
    let ciphertext = "";
    let plaintextIndices = [];
    let keyIndices = [];
    let ciphertextIndices = [];
    let details = `*** Encrypting by Vigenere Cipher ***\n`;
    details += `Plaintext: ${plaintext}\n`;
    details += `Key: ${key}\n`;
    details += `Mode: ${mode}\n`;

    let keyIndex = 0;
    let repp=0;
    for (let i = 0; i < plaintext.length; i++) {
        let plainchar = plaintext[i];
        let plainIndex = plainchar.charCodeAt(0) - 65;

        if (mode === "repeatKey") {
            keyIndex = key[i % key.length].charCodeAt(0) - 65;
        } else if (mode === "repeatPlaintext") {
            let keyChar = key[i % key.length].charCodeAt(0) - 65;
            if (i < key.length) {
                keyIndex = keyChar;
            } else {
                
                keyIndex = plaintext[repp].charCodeAt(0) - 65;
                repp=repp+1;
            }
        } else { // no repeat (default)
            if (i < key.length) {
                keyIndex = key[i].charCodeAt(0) - 65;
            } else {
                keyIndex = 0;
            }
        }

        if (plainchar.match(/[A-Z]/)) {
            let cipherIndex = (plainIndex + keyIndex) % 26;
            let cipherchar = String.fromCharCode(cipherIndex + 65);
            ciphertext += cipherchar;
            plaintextIndices.push(plainIndex);
            keyIndices.push(keyIndex);
            ciphertextIndices.push(cipherIndex);
        }
    }
    
    details += `plaintext indices: ${plaintextIndices.join(' ')}\n`;
    details += `+\nkey indices: ${keyIndices.join(' ')}\n`;
    details += `ciphertext indices: ${ciphertextIndices.join(' ')}\n`;
    details += `Ciphertext: ${ciphertext}\n`;
    
    return {
        ciphertext: ciphertext,
        details: details
    };
}

// Function to perform Vigenere cipher decryption with key handling modes
function vigenereDecrypt(ciphertext, key, mode) {
    ciphertext = ciphertext.toUpperCase().replace(/ /g, "");
    key = key.toUpperCase();
    let plaintext = "";
    let ciphertextIndices = [];
    let keyIndices = [];
    let plaintextIndices = [];
    let details = `*** Decrypting by Vigenere Cipher ***\n`;
    details += `Ciphertext: ${ciphertext}\n`;
    details += `Key: ${key}\n`;
    details += `Mode: ${mode}\n`;

    for (let i = 0; i < ciphertext.length; i++) {
        let cipherchar = ciphertext[i];
        let cipherIndex = cipherchar.charCodeAt(0) - 65;
        let keyIndex;

        if (mode === "repeatKey") {
            keyIndex = key[i % key.length].charCodeAt(0) - 65;
        } else if (mode === "repeatPlaintext") {
            keyIndex = ciphertext[i % key.length].charCodeAt(0) - 65;
        } else { // no repeat (default)
            if (i < key.length) {
                keyIndex = key[i].charCodeAt(0) - 65;
            } else {
                keyIndex = 0;
            }
        }

        if (cipherchar.match(/[A-Z]/)) {
            let plainIndex = (cipherIndex - keyIndex + 26) % 26;
            let plainchar = String.fromCharCode(plainIndex + 65);
            plaintext += plainchar;
            ciphertextIndices.push(cipherIndex);
            keyIndices.push(keyIndex);
            plaintextIndices.push(plainIndex);
        }
    }
    
    details += `ciphertext indices: ${ciphertextIndices.join(' ')}\n`;
    details += `-\nkey indices: ${keyIndices.join(' ')}\n`;
    details += `plaintext indices: ${plaintextIndices.join(' ')}\n`;
    details += `Plaintext: ${plaintext}\n`;
    
    return {
        plaintext: plaintext,
        details: details
    };
}



// Function to validate inputs before processing
function validateInputs3() {
    let plaintext = document.getElementById("plaintext3").value.trim();
    let ciphertext = document.getElementById("ciphertext3").value.trim();
    let vigkey = document.getElementById("key3").value.trim();
    let action = document.getElementById("action3").value;

    if ((action === "encrypt3" && !plaintext) || (action === "decrypt3" && !ciphertext) || !vigkey) {
        alert("Please enter all available inputs in Vigenere");
        return false;
    }
    return true;
}

// Function to process encryption or decryption based on action
function processAction3() {
    if (!validateInputs3()) {
        return;
    }

    let action = document.getElementById("action3").value;
    let plaintext = document.getElementById("plaintext3").value.trim();
    let ciphertext = document.getElementById("ciphertext3").value.trim();
    let vigkey = document.getElementById("key3").value.trim();
    let mode = document.querySelector('input[name="radio0"]:checked').value; // Get selected mode

    let result;
    if (action === "encrypt3") {
        result = vigenereEncrypt(plaintext, vigkey, mode);
        document.getElementById("ciphertext3").value = result.ciphertext;
    } else if (action === "decrypt3") {
        result = vigenereDecrypt(ciphertext, vigkey, mode);
        document.getElementById("plaintext3").value = result.plaintext;
    }

    document.getElementById("details3").value = result.details;
}

// Initialize input fields based on initial action selection
document.addEventListener("DOMContentLoaded", function() {
    let action = document.getElementById("action3").value;
    if (action === "encrypt3") {
        document.getElementById("ciphertext3").value = '';
        document.getElementById("ciphertext3").disabled = true;
    } else if (action === "decrypt3") {
        document.getElementById("plaintext3").value = '';
        document.getElementById("plaintext3").disabled = true;
    }
});

// Update input fields when action selection changes
document.getElementById("action3").addEventListener("change", function() {
    let action = document.getElementById("action3").value;
    if (action === "encrypt3") {
        document.getElementById("ciphertext3").value = '';
        document.getElementById("ciphertext3").disabled = true;
        document.getElementById("plaintext3").disabled = false;
    } else if (action === "decrypt3") {
        document.getElementById("plaintext3").value = '';
        document.getElementById("plaintext3").disabled = true;
        document.getElementById("ciphertext3").disabled = false;
    }
});

// Event listener for process button
document.getElementById("process-btn3").addEventListener("click", processAction3);
