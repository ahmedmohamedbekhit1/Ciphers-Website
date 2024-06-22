// Function to perform ADFGVX encryption
function adfgvxEncrypt(plaintext, pkey4, ckey4) {
    try {
        pkey4 = (pkey4 || '').toUpperCase().replace(/\s/g, '');
        ckey4 = (ckey4 || '').toUpperCase().replace(/\s/g, '');
        let matrix = [];

        // Use default Polybius square if pkey4 is empty
        if (pkey4 === '') {
            for (let char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
                matrix.push(char);
            }
        } else {
            // Add pkey4 characters to the matrix
            for (let char of pkey4) {
                if (!matrix.includes(char)) {
                    matrix.push(char);
                }
            }

            // Add remaining alphabetic characters and numbers to the matrix
            for (let char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
                if (!matrix.includes(char)) {
                    matrix.push(char);
                }
            }
        }

        // Change dimensions
        matrix = chunkArray(matrix, 6);

        let details = `*** Encrypting by ADFGVX ***\n`;
        details += `Plaintext: ${plaintext}\n`;
        details += `Polybius Key: ${pkey4}\n`;
        details += `Polybius Square Matrix:\n${matrix.map(row => row.join(' ')).join('\n')}\n`;

        let ciphertext = '';
        plaintext = plaintext.toUpperCase().replace(/\s/g, '');

        // Polybius square
        const adfgvx = [
            ['AA', 'AD', 'AF', 'AG', 'AV', 'AX'],
            ['DA', 'DD', 'DF', 'DG', 'DV', 'DX'],
            ['FA', 'FD', 'FF', 'FG', 'FV', 'FX'],
            ['GA', 'GD', 'GF', 'GG', 'GV', 'GX'],
            ['VA', 'VD', 'VF', 'VG', 'VV', 'VX'],
            ['XA', 'XD', 'XF', 'XG', 'XV', 'XX']
        ];

        for (let char of plaintext) {
            let indices = findIndices(matrix, char);
            if (indices) {
                let [row, col] = indices;
                ciphertext += adfgvx[row][col];
            }
        }

        details += `Intermediate Cipher: ${ciphertext}\n`;

        return { ciphertext, details };
    } catch (error) {
        console.error('Error during ADFGVX encryption:', error);
        return { ciphertext: '', details: '' };
    }
}

// Function to perform column transposition encryption
function columnEncrypt(intermediate, ckey4) {
    try {
        ckey4 = ckey4.toUpperCase().replace(/\s/g, '');
        let keyNumbers = [];
        for (let char of ckey4) {
            keyNumbers.push(char.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
        }

        let details = `*** Column Transposition Technique ***\n`;
        details += `Column key: ${ckey4}\n`;
        details += `Column Transposition indices: ${keyNumbers.join(', ')}\n`;

        let rows = Math.ceil(intermediate.length / keyNumbers.length);
        let matrix = Array.from({ length: rows }, () => Array(keyNumbers.length).fill(' '));

        let intermediateIndex = 0;
        for (let row of matrix) {
            for (let i = 0; i < row.length; i++) {
                if (intermediateIndex < intermediate.length) {
                    row[i] = intermediate[intermediateIndex++];
                }
            }
        }

        details += `Column Transposition Matrix:\n${matrix.map(row => row.join(' ')).join('\n')}\n`;

        let sortedColumns = [...keyNumbers]
            .map((num, idx) => [num, idx])
            .sort((a, b) => a[0] - b[0])
            .map(([, idx]) => matrix.map(row => row[idx]));

        let ciphertext = sortedColumns.flat().join('').replace(/\s/g, '');

        details += `Ciphertext: ${ciphertext}\n`;

        return { ciphertext, details };
    } catch (error) {
        console.error('Error during column transposition encryption:', error);
        return { ciphertext: '', details: '' };
    }
}

// Function to perform column transposition decryption
function columnDecrypt(ciphertext, ckey4) {
    try {
        ckey4 = ckey4.toUpperCase().replace(/\s/g, '');
        let keyNumbers = [];
        for (let char of ckey4) {
            keyNumbers.push(char.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
        }

        let details = `*** Column Transposition Technique ***\n`;
        details += `Ciphertext: ${ciphertext}\n`;
        details += `Column key: ${ckey4}\n`;
        details += `Column key indices: ${keyNumbers.join(', ')}\n`;

        let columns = keyNumbers.length;
        let rows = Math.ceil(ciphertext.length / columns);
        let remainder = ciphertext.length % columns;
        let matrix = Array.from({ length: rows }, () => Array(columns).fill(' '));

        let sortedKeyIndices = keyNumbers
            .map((num, idx) => [num, idx])
            .sort((a, b) => a[0] - b[0])
            .map(([, idx]) => idx);

        let ciphertextIndex = 0;
        for (let i = 0; i < sortedKeyIndices.length; i++) {
            const columnIndex = sortedKeyIndices[i];
            for (let j = 0; j < rows; j++) {
                if (j === rows - 1 && columnIndex >= remainder) {
                    continue;
                }
                if (ciphertextIndex < ciphertext.length) {
                    matrix[j][columnIndex] = ciphertext[ciphertextIndex++];
                }
            }
        }

        details += `Column Transposition Matrix:\n${matrix.map(row => row.join(' ')).join('\n')}\n`;

        let intermediate = '';
        for (let row of matrix) {
            intermediate += row.join('');
        }

        return { intermediate, details };
    } catch (error) {
        console.error('Error during column transposition decryption:', error);
        return { intermediate: '', details: '' };
    }
}

// Function to perform ADFGVX decryption
function adfgvxDecrypt(intermediate, pkey4) {
    try {
        pkey4 = (pkey4 || '').toUpperCase().replace(/\s/g, '');
        let matrix = [];

        // Use default Polybius square if pkey4 is empty
        if (pkey4 === '') {
            for (let char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
                matrix.push(char);
            }
        } else {
            for (let char of pkey4) {
                if (!matrix.includes(char)) {
                    matrix.push(char);
                }
            }

            for (let char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
                if (!matrix.includes(char)) {
                    matrix.push(char);
                }
            }
        }

        matrix = chunkArray(matrix, 6);

        let details = `Intermediate Cipher: ${intermediate}\n`;
        details += `*** Decrypting by ADFGVX ***\n`;
        
        details += `Polybius Square Matrix:\n${matrix.map(row => row.join(' ')).join('\n')}\n`;

        intermediate = intermediate.toUpperCase().replace(/\s/g, '');

        let plaintext = '';
        for (let i = 0; i < intermediate.length; i += 2) {
            let pair = intermediate[i] + intermediate[i + 1];
            let [rowChar, colChar] = pair.split('');
            let row = 'ADFGVX'.indexOf(rowChar);
            let col = 'ADFGVX'.indexOf(colChar);

            plaintext += matrix[row][col];
        }

        details += `Plaintext: ${plaintext}\n`;

        return { plaintext, details };
    } catch (error) {
        console.error('Error during ADFGVX decryption:', error);
        return { plaintext: '', details: '' };
    }
}

// Helper function to find indices in matrix
function findIndices(matrix, char) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === char) {
                return [i, j];
            }
        }
    }
    return null;
}

// Helper function to chunk array
function chunkArray(arr, size) {
    let result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

// Function to validate inputs before processing
function validateInputs4() {
    let plaintext = document.getElementById("plaintext4").value.trim();
    let ciphertext = document.getElementById("ciphertext4").value.trim();
    let pkey4 = document.getElementById("pkey4").value.trim();
    let ckey4 = document.getElementById("ckey4").value.trim();
    let action = document.getElementById("action4").value;

    if ((action === "encrypt4" && !plaintext) || (action === "decrypt4" && !ciphertext)) {
        alert("Please enter all available inputs for ADFGVX");
        return false;
    }
    return true;
}

// Function to process encryption or decryption based on action
function processAction4() {
    if (!validateInputs4()) {
        return;
    }

    let action = document.getElementById("action4").value;
    let plaintext = document.getElementById("plaintext4").value.trim();
    let ciphertext = document.getElementById("ciphertext4").value.trim();
    let pkey4 = document.getElementById("pkey4").value.trim();
    let ckey4 = document.getElementById("ckey4").value.trim();

    let result;
    if (action === "encrypt4") {
        let { ciphertext, details } = adfgvxEncrypt(plaintext, pkey4, ckey4);
        result = columnEncrypt(ciphertext, ckey4);
        document.getElementById("ciphertext4").value = result.ciphertext;
        document.getElementById("details4").value = details + result.details;
    } else if (action === "decrypt4") {
        let { intermediate, details: colDetails } = columnDecrypt(ciphertext, ckey4);
        let { plaintext, details: adfgvxDetails } = adfgvxDecrypt(intermediate, pkey4);
        document.getElementById("plaintext4").value = plaintext;
        document.getElementById("details4").value = colDetails + adfgvxDetails;
    }
}

// Event listener for process button
document.getElementById("process-btn4").addEventListener("click", processAction4);