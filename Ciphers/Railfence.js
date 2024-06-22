// Function to perform Rail Fence cipher encryption
function RailFenceEncrypt(plaintext, depth) {
    let fence = Array.from({ length: depth }, () => []);

    let level = 0;
    let direction = 1;

    for (let char of plaintext) {
        fence[level].push(char);
        level += direction;

        if (level === depth - 1 || level === 0) {
            direction *= -1;
        }
    }

    let ciphertext = '';
    for (let level of fence) {
        ciphertext += level.join('');
    }

    let zigzag = '';
    for (let i = 0; i < depth; i++) {
        let spaces = ' '.repeat(i);
        let level = fence[i].join(' ');
        zigzag += spaces + level + '\n';
    }

    let details = `*** Encrypting by Railfence ***\n`;
    details += `Plaintext: ${plaintext}\n`;
    details += `Depth: ${depth}\n`;
    details += `Zigzag Pattern:\n${zigzag}`;
    details += `Ciphertext: ${ciphertext}\n`;

    return {
        ciphertext: ciphertext,
        details: details
    };
}

// Function to perform Rail Fence cipher decryption
function RailFenceDecrypt(ciphertext, depth) {
    let fence = Array.from({ length: depth }, () => []);
    let rail = Array.from({ length: depth }, () => []);
    let level = 0;
    let direction = 1;

    // First, mark the positions in the fence
    for (let i = 0; i < ciphertext.length; i++) {
        fence[level].push('*');
        level += direction;

        if (level === depth - 1 || level === 0) {
            direction *= -1;
        }
    }

    // Fill the fence with the ciphertext characters
    let index = 0;
    for (let i = 0; i < depth; i++) {
        for (let j = 0; j < fence[i].length; j++) {
            if (fence[i][j] === '*') {
                fence[i][j] = ciphertext[index];
                index++;
            }
        }
    }

    // Read the characters in the zigzag order to get the plaintext
    let plaintext = '';
    level = 0;
    direction = 1;
    for (let i = 0; i < ciphertext.length; i++) {
        plaintext += fence[level].shift();
        rail[level].push(plaintext[plaintext.length - 1]);
        level += direction;
        if (level === depth - 1 || level === 0) {
            direction *= -1;
        }
    }

    // Create the zigzag pattern for display
    let zigzag = '';
    for (let i = 0; i < depth; i++) {
        let level = rail[i].join(' ');
        zigzag += ' '.repeat(i) + level + '\n';
    }

    let details = `*** Decrypting by Railfence ***\n`;
    details += `Ciphertext: ${ciphertext}\n`;
    details += `Depth: ${depth}\n`;
    details += `Zigzag Pattern:\n${zigzag}`;
    details += `Plaintext: ${plaintext}\n`;

    return {
        plaintext: plaintext,
        details: details
    };
}






// Function to validate inputs before processing
function validateInputs1() {
    let plaintext = document.getElementById("plaintext1").value.trim();
    let ciphertext = document.getElementById("ciphertext1").value.trim();
    let key = document.getElementById("key1").value.trim();
    let action = document.getElementById("action1").value;

    if ((action === "encrypt1" && !plaintext) || (action === "decrypt1" && !ciphertext) || !key) {
        alert("Please enter all available inputs in Railfence");
        return false;
    }
    return true;
}

// Function to process encryption or decryption based on action
function processAction1() {
    if (!validateInputs1()) {
        return;
    }

    let action = document.getElementById("action1").value;
    let plaintext = document.getElementById("plaintext1").value.trim();
    let ciphertext = document.getElementById("ciphertext1").value.trim();
    let depth = parseInt(document.getElementById("key1").value);

    let result;
    if (action === "encrypt1") {
        result = RailFenceEncrypt(plaintext, depth);
        document.getElementById("ciphertext1").value = result.ciphertext;
    } else if (action === "decrypt1") {
        result = RailFenceDecrypt(ciphertext, depth);
        document.getElementById("plaintext1").value = result.plaintext;
    }

    document.getElementById("details1").value = result.details;
}

// Initialize input fields based on initial action selection
document.addEventListener("DOMContentLoaded", function() {
    let action = document.getElementById("action1").value;
    if (action === "encrypt1") {
        document.getElementById("ciphertext1").value = '';
        document.getElementById("ciphertext1").disabled = true;
    } else if (action === "decrypt1") {
        document.getElementById("plaintext1").value = '';
        document.getElementById("plaintext1").disabled = true;
    }
});

// Update input fields when action selection changes
document.getElementById("action1").addEventListener("change", function() {
    let action = document.getElementById("action1").value;
    if (action === "encrypt1") {
        document.getElementById("ciphertext1").value = '';
        document.getElementById("ciphertext1").disabled = true;
        document.getElementById("plaintext1").disabled = false;
    } else if (action === "decrypt1") {
        document.getElementById("plaintext1").value = '';
        document.getElementById("plaintext1").disabled = true;
        document.getElementById("ciphertext1").disabled = false;
    }
});

// Event listener for process button
document.getElementById("process-btn1").addEventListener("click", processAction1);
