// Function to perform ADFGVX encryption
function adfgvxEncrypt(plaintext, pkey4 = '', ckey4 = '') {
    try {
        pkey4 = pkey4.toUpperCase().replace(/\s/g, '');
        ckey4 = ckey4.toUpperCase().replace(/\s/g, '');
        let matrix = [];

        // Use default Polybius square if pkey4 is empty
        const defaultPolybiusChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        if (pkey4 === '') {
            matrix = [...defaultPolybiusChars];
        } else {
            // Add pkey4 characters to the matrix
            for (let char of pkey4) {
                if (!matrix.includes(char)) {
                    matrix.push(char);
                }
            }

            // Add remaining alphabetic characters and numbers to the matrix
            for (let char of defaultPolybiusChars) {
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
function columnDecrypt(ciphertext, key) {
    key = key.toUpperCase().replace(/\s/g, '');
    let keyNumbers = [];
    for (let char of key) {
        keyNumbers.push(char.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
    }

    let details = "*** Column Transposition Technique ***\n";
    details += `Ciphertext: ${ciphertext}\n`;
    details += `Column key: ${key}\n`;

    // Determine the number of rows in the matrix
    let rows = Math.ceil(ciphertext.length / keyNumbers.length);
    let remainder = ciphertext.length % keyNumbers.length;
    let deletedCells = 0;
    if (remainder !== 0) {
        deletedCells = keyNumbers.length - remainder;
    }

    // Create an empty matrix to store the ciphertext characters
    let matrix = Array.from({ length: rows }, () => Array(keyNumbers.length).fill(''));

    // Fill the matrix with the ciphertext characters
    let ciphertextIndex = 0;
    let sortedKeyNumbers = [...keyNumbers].sort((a, b) => a - b);
    for (let keyIndex of sortedKeyNumbers) {
        let columnIndex = keyNumbers.indexOf(keyIndex);
        for (let j = 0; j < rows; j++) {
            if (ciphertextIndex < ciphertext.length) {
                if (j === rows - 1 && columnIndex >= keyNumbers.length - deletedCells) {
                    matrix[j][columnIndex] = '0';
                } else {
                    matrix[j][columnIndex] = ciphertext[ciphertextIndex++];
                }
            } else {
                matrix[j][columnIndex] = ' ';
            }
        }
    }

    details += `${keyNumbers.join(', ')}, (Deleted Cells: ${deletedCells})\n\n`;
    details += matrix.map(row => row.join(', ')).join('\n') + '\n';

    let intermediate = '';
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < keyNumbers.length; i++) {
            if (matrix[j][i] !== '0') {
                intermediate += matrix[j][i];
            }
        }
    }
    return { intermediate, details };
}


function adfgvxDecrypt(intermediate, key) {
    key = key.toUpperCase().replace(/\s/g, '');
    let matrix = [];

    // Add key characters to the matrix
    for (let char of key) {
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

    matrix = Array.from(matrix.join('')).reduce((acc, curr, i) => {
        const rowIndex = Math.floor(i / 6);
        if (!acc[rowIndex]) {
            acc.push([]);
        }
        acc[rowIndex].push(curr);
        return acc;
    }, []);

    intermediate = intermediate.toUpperCase().replace(/\s/g, '');
    let details = `Intermediate Cipher: ${intermediate}\n`;
    details += `*** Decrypting by ADFGVX ***\n`;
    details += `Polybius Square Matrix:\n${matrix.map(row => row.join(' ')).join('\n')}\n`;

    details+=`Polybius Square :\n`;
    details+= `A, D, F, G, V, X\n\n`;
    details += matrix.map(row => row.join(', ')).join('\n') + '\n';
    

    let plaintext = "";
    let i = 0;
    while (i < intermediate.length) {
        const pair = intermediate[i] + intermediate[i + 1];
        i += 2;

        let indexRow, indexCol;
        switch (pair[0]) {
            case 'A':
                indexRow = 0;
                break;
            case 'D':
                indexRow = 1;
                break;
            case 'F':
                indexRow = 2;
                break;
            case 'G':
                indexRow = 3;
                break;
            case 'V':
                indexRow = 4;
                break;
            case 'X':
                indexRow = 5;
                break;
        }

        switch (pair[1]) {
            case 'A':
                indexCol = 0;
                break;
            case 'D':
                indexCol = 1;
                break;
            case 'F':
                indexCol = 2;
                break;
            case 'G':
                indexCol = 3;
                break;
            case 'V':
                indexCol = 4;
                break;
            case 'X':
                indexCol = 5;
                break;
        }

        plaintext += matrix[indexRow][indexCol];
    }
    details += `Plaintext: ${[plaintext]}\n`;

    return { plaintext, details};
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