// Function to perform Playfair cipher encryption
function PlayFairEncrypt(plaintext, key, rowShift, columnShift, elsewhereOrder) {
    key = key.replace(/ /g, "").replace(/J/g, "I").toUpperCase();
    let matrix = [];
    let alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    for (let char of key) {
        if (!matrix.includes(char)) {
            matrix.push(char);
        }
    }
    for (let char of alphabet) {
        if (!matrix.includes(char)) {
            matrix.push(char);
        }
    }

    matrix = Array.from({ length: 5 }, (v, i) => matrix.slice(i * 5, i * 5 + 5));

    let details = `*** Encrypting by Playfair Cipher ***\n`;
    details += `Plaintext: ${plaintext}\n`;
    details += `Key: ${key}\n`;
    details += `Matrix:\n`;
    for (let row of matrix) {
        details += row.join(' ') + '\n';
    }

    let ciphertext = "";
    let i = 0;
    plaintext = plaintext.toUpperCase().replace(/J/g, "I");

    while (i < plaintext.length) {
        let pair;
        if (i === plaintext.length - 1 || plaintext[i] === plaintext[i + 1]) {
            pair = plaintext[i] + 'X';
            i += 1;
        } else {
            pair = plaintext[i] + plaintext[i + 1];
            i += 2;
        }

        let [row1, col1] = findPosition(pair[0], matrix);
        let [row2, col2] = findPosition(pair[1], matrix);

        let encryptedPair;
        if (row1 === row2) {
            encryptedPair = rowShift === 'right' ? matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5]
                : rowShift === 'left' ? matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5]
                : rowShift === 'above' ? matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2]
                : matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
        } else if (col1 === col2) {
            encryptedPair = columnShift === 'below' ? matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2]
                : columnShift === 'above' ? matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2]
                : columnShift === 'right' ? matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5]
                : matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5];
        } else {
            encryptedPair = elsewhereOrder === 'row' ? matrix[row1][col2] + matrix[row2][col1]
                : matrix[row2][col1] + matrix[row1][col2];
        }

        details += `${pair} -> ${encryptedPair}\n`;
        ciphertext += encryptedPair;
    }

    details += `Ciphertext: ${ciphertext}\n`;

    return {
        ciphertext: ciphertext,
        details: details
    };
}

// Function to perform Playfair cipher decryption
function PlayFairDecrypt(ciphertext, key, rowShift, columnShift, elsewhereOrder) {
    key = key.replace(/ /g, "").replace(/J/g, "I").toUpperCase();
    let matrix = [];
    let alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    for (let char of key) {
        if (!matrix.includes(char)) {
            matrix.push(char);
        }
    }
    for (let char of alphabet) {
        if (!matrix.includes(char)) {
            matrix.push(char);
        }
    }

    matrix = Array.from({ length: 5 }, (v, i) => matrix.slice(i * 5, i * 5 + 5));

    let details = `*** Decrypting by Playfair Cipher ***\n`;
    details += `Ciphertext: ${ciphertext}\n`;
    details += `Key: ${key}\n`;
    details += `Matrix:\n`;
    for (let row of matrix) {
        details += row.join(' ') + '\n';
    }

    let plaintext = "";
    let i = 0;
    ciphertext = ciphertext.toUpperCase();

    while (i < ciphertext.length) {
        let pair;
        if (i === ciphertext.length - 1 || ciphertext[i] === ciphertext[i + 1]) {
            pair = ciphertext[i] + 'X';
            i += 1;
        } else {
            pair = ciphertext[i] + ciphertext[i + 1];
            i += 2;
        }

        let [row1, col1] = findPosition(pair[0], matrix);
        let [row2, col2] = findPosition(pair[1], matrix);

        let decryptedPair;
        if (row1 === row2) {
            decryptedPair = rowShift === 'left' ? matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5]
                : rowShift === 'right' ? matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5]
                : rowShift === 'above' ? matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2]
                : matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
        } else if (col1 === col2) {
            decryptedPair = columnShift === 'above' ? matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2]
                : columnShift === 'below' ? matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2]
                : columnShift === 'right' ? matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5]
                : matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5];
        } else {
            decryptedPair = elsewhereOrder === 'row' ? matrix[row1][col2] + matrix[row2][col1]
                : matrix[row2][col1] + matrix[row1][col2];
        }

        details += `${pair} -> ${decryptedPair}\n`;
        plaintext += decryptedPair;
    }

    plaintext = plaintext.replace(/X/g, "");
    details += `Plaintext: ${plaintext}\n`;

    return {
        plaintext: plaintext,
        details: details
    };
}

// Helper function to find the position of a character in the matrix
function findPosition(char, matrix) {
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (matrix[row][col] === char) {
                return [row, col];
            }
        }
    }
    return [null, null];
}

// Function to validate inputs before processing
function validateInputs2() {
    let plaintext = document.getElementById("plaintext2").value.trim();
    let ciphertext = document.getElementById("ciphertext2").value.trim();
    let key = document.getElementById("key2").value.trim();
    let action = document.getElementById("action2").value;

    if ((action === "encrypt2" && !plaintext) || (action === "decrypt2" && !ciphertext) || !key) {
        alert("Please enter all available inputs in Playfair");
        return false;
    }
    return true;
}

// Function to process encryption or decryption based on action
function processAction2() {
    if (!validateInputs2()) {
        return;
    }

    let action = document.getElementById("action2").value;
    let plaintext = document.getElementById("plaintext2").value.trim();
    let ciphertext = document.getElementById("ciphertext2").value.trim();
    let key = document.getElementById("key2").value.trim();

    let rowShift, columnShift, elsewhereOrder;
    if (action === "encrypt2") {
        rowShift = document.getElementById("encryptRowShift").value;
        columnShift = document.getElementById("encryptColumnShift").value;
        elsewhereOrder = document.getElementById("encryptElsewhere").value;
        result = PlayFairEncrypt(plaintext, key, rowShift, columnShift, elsewhereOrder);
        document.getElementById("ciphertext2").value = result.ciphertext;
    } else if (action === "decrypt2") {
        rowShift = document.getElementById("decryptRowShift").value;
        columnShift = document.getElementById("decryptColumnShift").value;
        elsewhereOrder = document.getElementById("decryptElsewhere").value;
        result = PlayFairDecrypt(ciphertext, key, rowShift, columnShift, elsewhereOrder);
        document.getElementById("plaintext2").value = result.plaintext;
    }

    document.getElementById("details2").value = result.details;
}

// Initialize input fields based on initial action selection
document.addEventListener("DOMContentLoaded", function() {
    let action = document.getElementById("action2").value;
    if (action === "encrypt2") {
        document.getElementById("ciphertext2").value = '';
        document.getElementById("ciphertext2").disabled = true;
    } else if (action === "decrypt2") {
        document.getElementById("plaintext2").value = '';
        document.getElementById("plaintext2").disabled = true;
    }
});

// Update input fields when action selection changes
document.getElementById("action2").addEventListener("change", function() {
    let action = document.getElementById("action2").value;
    if (action === "encrypt2") {
        document.getElementById("ciphertext2").value = '';
        document.getElementById("ciphertext2").disabled = true;
        document.getElementById("plaintext2").disabled = false;
    } else if (action === "decrypt2") {
        document.getElementById("plaintext2").value = '';
        document.getElementById("plaintext2").disabled = true;
        document.getElementById("ciphertext2").disabled = false;
    }
});

// Event listener for process button
document.getElementById("process-btn2").addEventListener("click", processAction2);
