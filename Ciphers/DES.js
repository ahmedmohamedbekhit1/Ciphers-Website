// Table of Position of 64 bits at initial level: Initial Permutation Table
const initialPerm = [
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6,
    64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9, 1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7
];

// Expansion Table (E/R) 48
const expD = [
    32, 1, 2, 3, 4, 5, 4, 5,
    6, 7, 8, 9, 8, 9, 10, 11,
    12, 13, 12, 13, 14, 15, 16, 17,
    16, 17, 18, 19, 20, 21, 20, 21,
    22, 23, 24, 25, 24, 25, 26, 27,
    28, 29, 28, 29, 30, 31, 32, 1
];

// Straight Permutation Table 48
const per = [
    16, 7, 20, 21,
    29, 12, 28, 17,
    1, 15, 23, 26,
    5, 18, 31, 10,
    2, 8, 24, 14,
    32, 27, 3, 9,
    19, 13, 30, 6,
    22, 11, 4, 25
];

// 8 S-box Table
const sbox = [
    [
        [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
        [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
        [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
        [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
    ],
    [
        [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
        [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
        [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
        [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
    ],
    [
        [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
        [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
        [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
        [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
    ],
    [
        [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
        [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
        [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
        [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
    ],
    [
        [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
        [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
        [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
        [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
    ],
    [
        [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
        [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
        [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
        [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
    ],
    [
        [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
        [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
        [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
        [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
    ],
    [
        [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
        [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
        [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
        [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
    ]
];

// Final Permutation Table 48
const finalPerm = [
    40, 8, 48, 16, 56, 24, 64, 32,
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9, 49, 17, 57, 25
];
//parity bit drop table
const keyp = [57, 49, 41, 33, 25, 17, 9,
        1, 58, 50, 42, 34, 26, 18,
        10, 2, 59, 51, 43, 35, 27,
        19, 11, 3, 60, 52, 44, 36,
        63, 55, 47, 39, 31, 23, 15,
        7, 62, 54, 46, 38, 30, 22,
        14, 6, 61, 53, 45, 37, 29,
        21, 13, 5, 28, 20, 12, 4];

// Number of bit shifts
const shift_table = [1, 1, 2, 2,
               2, 2, 2, 2,
               1, 2, 2, 2,
               2, 2, 2, 1]

// Key- Compression Table : Compression of key from 56 bits to 48 bits
const key_comp = [14, 17, 11, 24, 1, 5,
            3, 28, 15, 6, 21, 10,
            23, 19, 12, 4, 26, 8,
            16, 7, 27, 20, 13, 2,
            41, 52, 31, 37, 47, 55,
            30, 40, 51, 45, 33, 48,
            44, 49, 39, 56, 34, 53,
            46, 42, 50, 36, 29, 32]
            
// Permute function to rearrange the bits
function permute(k, arr, n) {
    let permutation = "";
    for (let i = 0; i < n; i++) {
        permutation += k[arr[i] - 1];
    }
    return permutation;
}

function shift_left(k, nth_shifts) {
    let s = "";
    for (let i = 0; i < nth_shifts; i++) {
        for (let j = 1; j < k.length; j++) {
            s += k[j];
        }
        s += k[0];
        k = s;
        s = "";
    }
    return k;
}


// Calculating XOR of two strings of binary numbers a and b
function xor(a, b) {
    let ans = "";
    for (let i = 0; i < a.length; i++) {
        ans += a[i] === b[i] ? "0" : "1";
    }
    return ans;
}

function encrypt(plaintext, rkb, rk, action, mode, algorithm) {
    let details = '';
    if (algorithm === "3") {
        // Handle 3DES case here if needed
    } else {
        if (action === "encrypt5") {
            details += `*** Encrypting by DES ***\n`;
        } else if (action === "decrypt5") {
            details += `*** Decrypting by DES ***\n`;
        }
    }

    // Convert plaintext to binary
    plaintext = hex2bin(plaintext);
    const blockSize = 64;

    // Padding the plaintext to be a multiple of 64 bits
    while (plaintext.length % blockSize !== 0) {
        plaintext += '0';
    }

    let cipherText = '';
    for (let blockStart = 0; blockStart < plaintext.length; blockStart += blockSize) {
        let ptBlock = plaintext.substring(blockStart, blockStart + blockSize);
        
        // Initial Permutation
        ptBlock = permute(ptBlock, initialPerm, 64);
        if (mode === "text") {
            details += `After initial permutation: ${binaryToText(ptBlock)}\n`;
        } else if (mode === "hexa") {
            details += `After initial permutation: ${bin2hex(ptBlock)}\n`;
        } else if (mode === "binary") {
            details += `After initial permutation: ${ptBlock}\n`;
        }

        // Splitting
        let left = ptBlock.substring(0, 32);
        let right = ptBlock.substring(32, 64);
        for (let i = 0; i < 16; i++) {
            // Expansion D-box: Expanding the 32 bits data into 48 bits
            const right_expanded = permute(right, expD, 48);

            // XOR RoundKey[i] and right_expanded
            const xor_x = xor(right_expanded, rkb[i]);

            // S-boxes: substituting the value from s-box table by calculating row and column
            let sbox_str = "";
            for (let j = 0; j < 8; j++) {
                const row = bin2dec(xor_x[j * 6] + xor_x[j * 6 + 5]);
                const col = bin2dec(
                    xor_x[j * 6 + 1] +
                    xor_x[j * 6 + 2] +
                    xor_x[j * 6 + 3] +
                    xor_x[j * 6 + 4]
                );
                const val = sbox[j][row][col];
                sbox_str += dec2bin(val);
            }

            // Straight D-box: After substituting rearranging the bits
            sbox_str = permute(sbox_str, per, 32);

            // XOR left and sbox_str
            const result = xor(left, sbox_str);
            left = result;

            // Swapper
            if (i !== 15) {
                [left, right] = [right, left];
            }
            if (mode === "text") {
                TempCombine = left + right;
                details += `Round ${i + 1}: ${binaryToText(TempCombine)}\n`;
            } else if (mode === "hexa") {
                details += `Round ${i + 1}: ${bin2hex(left)} ${bin2hex(right)}\n`;
            } else if (mode === "binary") {
                details += `Round ${i + 1}: ${left} ${right} ${rk[i]}\n`;
            }
        }

        // Combination
        const combine = left + right;

        // Final permutation: final rearranging of bits to get cipher text
        const cipher_text = permute(combine, finalPerm, 64);
        if (mode === "text") {
            cipherText += binaryToText(cipher_text);
        } else if (mode === "hexa") {
            cipherText += bin2hex(cipher_text);
        } else if (mode === "binary") {
            cipherText += cipher_text;
        }
    }
    
    if (mode === "text") {
        details += `Ciphertext: ${cipherText}\n`;
    } else if (mode === "hexa") {
        details += `Ciphertext: ${cipherText}\n`;
    } else if (mode === "binary") {
        details += `Ciphertext: ${cipherText}\n`;
    }
    return { Ciphertext: cipherText, details };
}


// Helper functions for conversion and validation
function textToBinary(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}


 function binaryToText(binary) {
     return binary.match(/.{1,8}/g).map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
 }

// Binary to decimal conversion
function bin2dec(binary) {
    return parseInt(binary, 2);
}

// Hexadecimal to binary conversion
function hex2bin(s) {
    const mp = {
        '0': "0000", '1': "0001", '2': "0010", '3': "0011",
        '4': "0100", '5': "0101", '6': "0110", '7': "0111",
        '8': "1000", '9': "1001", 'A': "1010", 'B': "1011",
        'C': "1100", 'D': "1101", 'E': "1110", 'F': "1111"
    };
    let bin = "";
    for (let i = 0; i < s.length; i++) {
        bin += mp[s[i]];
    }
    return bin;
}

// Binary to hexadecimal conversion
function bin2hex(s) {
    const mp = {
        "0000": '0', "0001": '1', "0010": '2', "0011": '3',
        "0100": '4', "0101": '5', "0110": '6', "0111": '7',
        "1000": '8', "1001": '9', "1010": 'A', "1011": 'B',
        "1100": 'C', "1101": 'D', "1110": 'E', "1111": 'F'
    };
    let hex = "";
    for (let i = 0; i < s.length; i += 4) {
        const ch = s.substr(i, 4);
        hex += mp[ch];
    }
    return hex;
}

function dec2bin(num) {
    let res = num.toString(2);
    if (res.length % 4 !== 0) {
      const div = Math.floor(res.length / 4);
      const counter = (4 * (div + 1)) - res.length;
      for (let i = 0; i < counter; i++) {
        res = '0' + res;
      }
    }
    return res;
  }

function validateBinary(binary) {
    return /^[01]+$/.test(binary);
}

function validateHexadecimal(hex) {
    return /^[0-9A-Fa-f]+$/.test(hex);
}


function validateKey(key, length) {
    return key < length;
}


// Function to validate inputs before processing
function validateInputs5() {
    let action = document.getElementById("action5").value;
    let inputType= document.querySelector('input[name="radio2"]:checked').value; // Get algorithm type
    let algorithm = document.querySelector('input[name="radio1"]:checked').value; // Get algorithm type

    if (action === "encrypt5") {
        if(algorithm === "1"){
            if(inputType==="text"){
                let plaintext = document.getElementById("tplaintext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dtciphertext5").value.trim().replace(/\s/g, "");
                if(validateKey(plaintext.length, 8)){
                    alert("Enter 8 characters in plaintext you now entered "+plaintext.length+" characters");
                    return false;
                }
                if(validateKey(key.length, 7)){
                    alert("Enter 7 characters in key you now entered "+key.length+" characters");
                    return false;
                }
            }else if(inputType==="hexa"){
                let plaintext = document.getElementById("hplaintext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dhciphertext5").value.trim().replace(/\s/g, "");
                if(validateKey(plaintext.length, 16)){
                    alert("Enter 16 hexa characters in plaintext you now entered "+plaintext.length+" hexa characters");
                    return false;
                }
                if(validateKey(key.length, 14)){
                    alert("Enter 14 hexa characters in key you now entered "+key.length+" hexa characters");
                    return false;
                }
                if(!validateHexadecimal(plaintext)){
                    alert("Not valid hexa for plaintext");
                    return false;
                }
                if(!validateHexadecimal(key)){
                    alert("Not valid hexa key");
                    return false;
                }
            }else if(inputType==="binary"){
                let plaintext = document.getElementById("bplaintext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dbciphertext5").value.trim().replace(/\s/g, "");
                if(validateKey(plaintext.length, 64)){
                    alert("Enter 64-bit in plaintext you now entered "+plaintext.length+"-bit");
                    return false;
                }
                if(validateKey(key.length, 14)){
                    alert("Enter 56-bit in key you now entered "+key.length+"-bit");
                    return false;
                }
                if(!validateBinary(plaintext)){
                    alert("Not valid binary for plaintext");
                    return false;
                }
                if(!validateBinary(key)){
                    alert("Not valid binary key ");
                    return false;
                }
            }
        }else if(algorithm === "3"){
            if(inputType==="text"){
                let plaintext = document.getElementById("tplaintext5").value.trim().replace(/\s/g, "");
                let key1 = document.getElementById("t1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("t2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("t3key5").value.trim().replace(/\s/g, "");
                 if(validateKey(plaintext.length, 8)){
                    alert("Enter 8 characters in plaintext you now entered "+plaintext.length+" characters");
                    return false;
                }
                if(validateKey(key1.length, 7)){
                    alert("Enter 7 characters in key1 you now entered "+key1.length+" characters");
                    return false;
                }
                if(validateKey(key2.length, 7)){
                    alert("Enter 7 characters in key2 you now entered "+key2.length+" characters");
                    return false;
                }
                if(validateKey(key3.length, 7)){
                    alert("Enter 7 characters in key3 you now entered "+key3.length+" characters");
                    return false;
                }
            }else if(inputType==="hexa"){
                let plaintext = document.getElementById("hplaintext5").value.trim().replace(/\s/g, "");
                let key1 = document.getElementById("h1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("h2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("h3key5").value.trim().replace(/\s/g, "");
                 if(validateKey(plaintext.length, 16)){
                    alert("Enter 16 hexa characters in plaintext you now entered "+plaintext.length+" hexa characters");
                    return false;
                }
                if(validateKey(key1.length, 14)){
                    alert("Enter 14 characters in key1 you now entered "+key1.length+" hexa characters");
                    return false;
                }
                if(validateKey(key2.length, 14)){
                    alert("Enter 14 characters in key2 you now entered "+key2.length+" hexa characters");
                    return false;
                }
                if(validateKey(key3.length, 14)){
                    alert("Enter 14 characters in key3 you now entered "+key3.length+" hexa characters");
                    return false;
                }
                if(!validateHexadecimal(plaintext)){
                    alert("Not valid hexa for plaintext");
                    return false;
                }
                if(!validateHexadecimal(key1)){
                    alert("Not valid hexa key");
                    return false;
                }
                if(!validateHexadecimal(key2)){
                    alert("Not valid hexa key");
                    return false;
                }
                if(!validateHexadecimal(key3)){
                    alert("Not valid hexa key");
                    return false;
                }
            }else if(inputType==="binary"){
                let plaintext = document.getElementById("hplaintext5").value.trim().replace(/\s/g, "");
                let key1 = document.getElementById("b1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("b2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("b3key5").value.trim().replace(/\s/g, "");
                 if(validateKey(plaintext.length, 64)){
                    alert("Enter 64-bit in plaintext you now entered "+plaintext.length+"-bit");
                    return false;
                }
                if(validateKey(key1.length, 56)){
                    alert("Enter 56-bit in key1 you now entered "+key1.length+"-bit");
                    return false;
                }
                if(validateKey(key2.length, 56)){
                    alert("Enter 56-bit in key2 you now entered "+key2.length+"-bit");
                    return false;
                }
                if(validateKey(key3.length, 56)){
                    alert("Enter 56 bit in key3 you now entered "+key3.length+"-bit");
                    return false;
                }
                if(!validateBinary(plaintext)){
                    alert("Not valid binary for plaintext");
                    return false;
                }
                if(!validateBinary(key1)){
                    alert("Not valid binary key1");
                    return false;
                }
                if(!validateBinary(key2)){
                    alert("Not valid binary key2");
                    return false;
                }
                if(!validateBinary(key3)){
                    alert("Not valid binary key3");
                    return false;
                }
            }
        }
    }else if(action==="decrypt5"){
        if(algorithm==="1"){
            if(inputType==="text"){
                let ciphertext = document.getElementById("tciphertext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dtciphertext5").value.trim().replace(/\s/g, "");
                if(validateKey(ciphertext.length, 8)){
                    alert("Enter 8 characters in ciphertext you now entered "+ciphertext.length+" characters");
                    return false;
                }
                if(validateKey(key.length, 7)){
                    alert("Enter 7 characters in key you now entered "+key.length+" characters");
                    return false;
                }
            }else if(inputType==="hexa"){
                let ciphertext = document.getElementById("hciphertext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dhciphertext5").value.trim().replace(/\s/g, "");
                if(validateKey(ciphertext.length, 16)){
                    alert("Enter 16 hexa characters in plaintext you now entered "+ciphertext.length+" hexa characters");
                    return false;
                }
                if(validateKey(key.length, 14)){
                    alert("Enter 14 hexa characters in key you now entered "+key.length+" hexa characters");
                    return false;
                }
                if(!validateHexadecimal(ciphertext)){
                    alert("Not valid hexa for ciphertext");
                    return false;
                }
                if(!validateHexadecimal(key)){
                    alert("Not valid hexa key");
                    return false;
                }
            }else if(inputType==="binary"){
                let ciphertext = document.getElementById("bciphertext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dbciphertext5").value.trim().replace(/\s/g, "");
                if(validateKey(ciphertext.length, 64)){
                    alert("Enter 64-bit in plaintext you now entered "+ciphertext.length+"-bit");
                    return false;
                }
                if(validateKey(key.length, 14)){
                    alert("Enter 56-bit  you now entered "+key.length+"-bit");
                    return false;
                }
                if(!validateBinary(ciphertext)){
                    alert("Not valid binary for ciphertext");
                    return false;
                }
                if(!validateBinary(key)){
                    alert("Not valid binary key");
                    return false;
                }
            }
        }else if(algorithm ==="3"){
            if(inputType==="text"){
                let ciphertext = document.getElementById("tciphertext5").value.trim().replace(/\s/g, "");;
                let key1 = document.getElementById("t1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("t2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("t3key5").value.trim().replace(/\s/g, "");
                 if(validateKey(ciphertext.length, 8)){
                    alert("Enter 8 characters in plaintext you now entered "+ciphertext.length+" characters");
                    return false;
                }
                if(validateKey(key1.length, 7)){
                    alert("Enter 7 characters in key1 you now entered "+key1.length+" characters");
                    return false;
                }
                if(validateKey(key2.length, 7)){
                    alert("Enter 7 characters in key2 you now entered "+key2.length+" characters");
                    return false;
                }
                if(validateKey(key3.length, 7)){
                    alert("Enter 7 characters in key3 you now entered "+key3.length+" characters");
                    return false;
                }
            }else if(inputType==="hexa"){
                let ciphertext = document.getElementById("hciphertext5").value.trim().replace(/\s/g, "");;
                let key1 = document.getElementById("h1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("h2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("h3key5").value.trim().replace(/\s/g, "");
                 if(validateKey(ciphertext.length, 16)){
                    alert("Enter 16 hexa characters in plaintext you now entered "+ciphertext.length+" hexa characters");
                    return false;
                }
                if(validateKey(key1.length, 14)){
                    alert("Enter 14 characters in key1 you now entered "+key1.length+" hexa characters");
                    return false;
                }
                if(validateKey(key2.length, 14)){
                    alert("Enter 14 characters in key2 you now entered "+key2.length+" hexa characters");
                    return false;
                }
                if(validateKey(key3.length, 14)){
                    alert("Enter 14 characters in key3 you now entered "+key3.length+" hexa characters");
                    return false;
                }
                if(!validateHexadecimal(ciphertext)){
                    alert("Not valid hexa for ciphertext");
                    return false;
                }
                if(!validateHexadecimal(key1)){
                    alert("Not valid hexa key1");
                    return false;
                }
                if(!validateHexadecimal(key2)){
                    alert("Not valid hexa key2");
                    return false;
                }
                if(!validateHexadecimal(key3)){
                    alert("Not valid hexa key3");
                    return false;
                }
            }else if(inputType==="binary"){
                let ciphertext = document.getElementById("bciphertext5").value.trim().replace(/\s/g, "");
                let key1 = document.getElementById("b1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("b2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("b3key5").value.trim().replace(/\s/g, "");
                 if(validateKey(ciphertext.length, 64)){
                    alert("Enter 64-bit in plaintext you now entered "+ciphertext.length+"-bit");
                    return false;
                }
                if(validateKey(key1.length, 56)){
                    alert("Enter 56-bit in key1 you now entered "+key1.length+"-bit");
                    return false;
                }
                if(validateKey(key2.length, 56)){
                    alert("Enter 56-bit in key2 you now entered "+key2.length+"-bit");
                    return false;
                }
                if(validateKey(key3.length, 56)){
                    alert("Enter 56 bit in key3 you now entered "+key3.length+"-bit");
                    return false;
                }
                if(!validateBinary(ciphertext)){
                    alert("Not valid binary for ciphertext");
                    return false;
                }
                if(!validateBinary(key1)){
                    alert("Not valid binary key1");
                    return false;
                }
                if(!validateBinary(key2)){
                    alert("Not valid binary key2");
                    return false;
                }
                if(!validateBinary(key3)){
                    alert("Not valid binary key3");
                    return false;
                }
            }
        }
    }
    return true;
}

// Function to process encryption or decryption based on action
function processAction5() {
    if (!validateInputs5()) {
        return;
    }

    let action = document.getElementById("action5").value;
    let inputType= document.querySelector('input[name="radio2"]:checked').value; // Get algorithm type
    let algorithm = document.querySelector('input[name="radio1"]:checked').value; // Get algorithm type

    let result;
    if (action === "encrypt5") {
        if(algorithm === "1"){
            //Des Encryption (for three modes => text, hexa, binary)
            if(inputType==="text"){
                let plaintext = document.getElementById("tplaintext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dtciphertext5").value.trim().replace(/\s/g, "");
                key=textToBinary(key);

                // getting 56 bit key from 64 bit using the parity bits
                key = permute(key, keyp, 56)

                //splitting
                let left = key.substring(0, 28);
                let right = key.substring(28, 56);

                // Arrays to store round keys
                let rkb = []; // RoundKeys in binary
                let rk = [];  // RoundKeys in hexadecimal

                for (let i = 0; i < 16; i++) {
                    // Shifting the bits by nth shifts by checking from shift table
                    left = shift_left(left, shift_table[i]);
                    right = shift_left(right, shift_table[i]);

                    // Combination of left and right string
                    let combine_str = left + right;

                    // Compression of key from 56 to 48 bits
                    let round_key = permute(combine_str, key_comp, 48);

                    rkb.push(round_key);
                    rk.push(bin2hex(round_key));
                }
                plaintext = textToBinary(plaintext);
                plaintext = bin2hex(plaintext);
                let result = encrypt(plaintext, rkb, rk, action, inputType, algorithm);
                document.getElementById("details5").value = result.details;
                document.getElementById("ciphertext5").value = result.Ciphertext;

            }else if(inputType==="hexa"){
                let plaintext = document.getElementById("hplaintext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dhciphertext5").value.trim().replace(/\s/g, "");
                key=hex2bin(key);
                
                // getting 56 bit key from 64 bit using the parity bits
                key = permute(key, keyp, 56)

                //splitting
                let left = key.substring(0, 28);
                let right = key.substring(28, 56);

                // Arrays to store round keys
                let rkb = []; // RoundKeys in binary
                let rk = [];  // RoundKeys in hexadecimal

                for (let i = 0; i < 16; i++) {
                    // Shifting the bits by nth shifts by checking from shift table
                    left = shift_left(left, shift_table[i]);
                    right = shift_left(right, shift_table[i]);

                    // Combination of left and right string
                    let combine_str = left + right;

                    // Compression of key from 56 to 48 bits
                    let round_key = permute(combine_str, key_comp, 48);

                    rkb.push(round_key);
                    rk.push(bin2hex(round_key));
                }
                let result = encrypt(plaintext, rkb, rk, action, inputType, algorithm);
                document.getElementById("details5").value = result.details;
                document.getElementById("ciphertext5").value = result.Ciphertext;

            }else if(inputType==="binary"){
                let plaintext = document.getElementById("bplaintext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dbciphertext5").value.trim().replace(/\s/g, "");
                
                plaintext = bin2hex(plaintext);

                // getting 56 bit key from 64 bit using the parity bits
                key = permute(key, keyp, 56)

                //splitting
                let left = key.substring(0, 28);
                let right = key.substring(28, 56);

                // Arrays to store round keys
                let rkb = []; // RoundKeys in binary
                let rk = [];  // RoundKeys in hexadecimal

                for (let i = 0; i < 16; i++) {
                    // Shifting the bits by nth shifts by checking from shift table
                    left = shift_left(left, shift_table[i]);
                    right = shift_left(right, shift_table[i]);

                    // Combination of left and right string
                    let combine_str = left + right;

                    // Compression of key from 56 to 48 bits
                    let round_key = permute(combine_str, key_comp, 48);

                    rkb.push(round_key);
                    rk.push(bin2hex(round_key));
                }
                
                let result = encrypt(plaintext, rkb, rk, action, inputType, algorithm);
                document.getElementById("details5").value = result.details;
                document.getElementById("ciphertext5").value = result.Ciphertext;
            
            }
            //Triple Des encryption
        }else if(algorithm === "3"){
            if(inputType==="text"){
                let plaintext = document.getElementById("tplaintext5").value.trim().replace(/\s/g, "");
                let key1 = document.getElementById("t1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("t2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("t3key5").value.trim().replace(/\s/g, "");
                const triplekey = [key1, key2, key3];
                plaintext=textToBinary(plaintext);
                plaintext=bin2hex(plaintext);
                let loop = 1;
                document.getElementById("details5").value = "*** Encryption by Triple DES ***\n";
                for (const keys of triplekey) {

                    const key = textToBinary(keys);

                    let left = key.slice(0, 28);
                    let right = key.slice(28, 56);

                    const rkb = [];
                    const rk = [];
                    document.getElementById("details5").value += "->Encryption by key"+ loop+"<-\n";
                    loop += 1;
                    for (let i = 0; i < 16; i++) {
                    left = shift_left(left, shift_table[i]);
                    right = shift_left(right, shift_table[i]);

                    const combine_str = left + right;
                    const round_key = permute(combine_str, key_comp, 48);

                    rkb.push(round_key);
                    rk.push(bin2hex(round_key));
                    }

                    let result = encrypt(plaintext, rkb, rk, action, inputType, algorithm);
                    document.getElementById("details5").value += result.details;
                    document.getElementById("ciphertext5").value = result.Ciphertext;
                    }
            
            }else if(inputType==="hexa"){
                let plaintext = document.getElementById("hplaintext5").value.trim().replace(/\s/g, "");
                let key1 = document.getElementById("h1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("h2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("h3key5").value.trim().replace(/\s/g, "");
              
                const triplekey = [key1, key2, key3];
                let loop = 1;
                document.getElementById("details5").value = "*** Encryption by Triple DES ***\n";
                for (const keys of triplekey) {

                    const key = hex2bin(keys);

                    let left = key.slice(0, 28);
                    let right = key.slice(28, 56);

                    const rkb = [];
                    const rk = [];
                    document.getElementById("details5").value += "->Encryption by key"+ loop+"<-\n";
                    loop += 1;
                    for (let i = 0; i < 16; i++) {
                    left = shift_left(left, shift_table[i]);
                    right = shift_left(right, shift_table[i]);

                    const combine_str = left + right;
                    const round_key = permute(combine_str, key_comp, 48);

                    rkb.push(round_key);
                    rk.push(bin2hex(round_key));
                    }

                    let result = encrypt(plaintext, rkb, rk, action, inputType, algorithm);
                    document.getElementById("details5").value += result.details;
                    document.getElementById("ciphertext5").value = result.Ciphertext;
                    }

            }else if(inputType==="binary"){
                let plaintext = document.getElementById("hplaintext5").value.trim().replace(/\s/g, "");
                let key1 = document.getElementById("b1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("b2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("b3key5").value.trim().replace(/\s/g, "");

                const triplekey = [key1, key2, key3];
                plaintext=textToBinary(plaintext);
                plaintext=bin2hex(plaintext);
                let loop = 1;
                document.getElementById("details5").value = "*** Encryption by Triple DES ***\n";
                for (const keys of triplekey) {

                    const key = keys;

                    let left = key.slice(0, 28);
                    let right = key.slice(28, 56);

                    const rkb = [];
                    const rk = [];
                    document.getElementById("details5").value += "->Encryption by key"+ loop+"<-\n";
                    loop += 1;
                    for (let i = 0; i < 16; i++) {
                    left = shift_left(left, shift_table[i]);
                    right = shift_left(right, shift_table[i]);

                    const combine_str = left + right;
                    const round_key = permute(combine_str, key_comp, 48);

                    rkb.push(round_key);
                    rk.push(bin2hex(round_key));
                    }

                    let result = encrypt(plaintext, rkb, rk, action, inputType, algorithm);
                    document.getElementById("details5").value += result.details;
                    document.getElementById("ciphertext5").value = result.Ciphertext;
                    }
             
            }
        }
        //Des decryption
    }else if(action==="decrypt5"){
        if(algorithm==="1"){
            if(inputType==="text"){
                let ciphertext = document.getElementById("tciphertext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dtciphertext5").value.trim().replace(/\s/g, "");
                ciphertext= textToBinary(ciphertext);
                ciphertext= bin2hex(ciphertext);
                key=textToBinary(key);

                // Getting 56 bit key from 64 bit using the parity bits
                key = permute(key, keyp, 56);

                // Splitting
                left = key.slice(0, 28);  // rkb for RoundKeys in binary
                right = key.slice(28, 56);  // rk for RoundKeys in hexadecimal
                rkb = [];
                rk = [];
                for (let i = 0; i < 16; i++) {
                // Shifting the bits by nth shifts by checking from shift table
                left = shift_left(left, shift_table[i]);
                right = shift_left(right, shift_table[i]);

                // Combination of left and right string
                combine_str = left + right;

                // Compression of key from 56 to 48 bits
                round_key = permute(combine_str, key_comp, 48);

                rkb.push(round_key);
                rk.push(bin2hex(round_key));
                }
                rkb_rev = rkb.reverse();
                rk_rev = rk.reverse();
                let result = encrypt(ciphertext, rkb_rev, rk_rev, action, inputType, algorithm);
                document.getElementById("details5").value = result.details;
                document.getElementById("plaintext5").value = result.Ciphertext;
               
            }else if(inputType==="hexa"){
                let ciphertext = document.getElementById("hciphertext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dhciphertext5").value.trim().replace(/\s/g, "");
                key=hex2bin(key)
                // Getting 56 bit key from 64 bit using the parity bits
                key = permute(key, keyp, 56);

                // Splitting
                left = key.slice(0, 28);  // rkb for RoundKeys in binary
                right = key.slice(28, 56);  // rk for RoundKeys in hexadecimal
                rkb = [];
                rk = [];
                for (let i = 0; i < 16; i++) {
                // Shifting the bits by nth shifts by checking from shift table
                left = shift_left(left, shift_table[i]);
                right = shift_left(right, shift_table[i]);

                // Combination of left and right string
                combine_str = left + right;

                // Compression of key from 56 to 48 bits
                round_key = permute(combine_str, key_comp, 48);

                rkb.push(round_key);
                rk.push(bin2hex(round_key));
                }
                rkb_rev = rkb.reverse();
                rk_rev = rk.reverse();
                let result = encrypt(ciphertext, rkb_rev, rk_rev, action, inputType, algorithm);
                document.getElementById("details5").value = result.details;
                document.getElementById("plaintext5").value = result.Ciphertext;
            }else if(inputType==="binary"){
                let ciphertext = document.getElementById("bciphertext5").value.trim().replace(/\s/g, "");
                let key = document.getElementById("dbciphertext5").value.trim().replace(/\s/g, "");

                ciphertext= bin2hex(ciphertext);

                // Getting 56 bit key from 64 bit using the parity bits
                key = permute(key, keyp, 56);

                // Splitting
                left = key.slice(0, 28);  // rkb for RoundKeys in binary
                right = key.slice(28, 56);  // rk for RoundKeys in hexadecimal
                rkb = [];
                rk = [];
                for (let i = 0; i < 16; i++) {
                // Shifting the bits by nth shifts by checking from shift table
                left = shift_left(left, shift_table[i]);
                right = shift_left(right, shift_table[i]);

                // Combination of left and right string
                combine_str = left + right;

                // Compression of key from 56 to 48 bits
                round_key = permute(combine_str, key_comp, 48);

                rkb.push(round_key);
                rk.push(bin2hex(round_key));
                }
                rkb_rev = rkb.reverse();
                rk_rev = rk.reverse();
                let result = encrypt(ciphertext, rkb_rev, rk_rev, action, inputType, algorithm);
                document.getElementById("details5").value = result.details;
                document.getElementById("plaintext5").value = result.Ciphertext;
               
            }
            //triple des decryption
        }else if(algorithm ==="3"){
            if(inputType==="text"){
                let ciphertext = document.getElementById("tciphertext5").value.trim().replace(/\s/g, "");
                let key1 = document.getElementById("t1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("t2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("t3key5").value.trim().replace(/\s/g, "");

                ciphertext= textToBinary(ciphertext);
                ciphertext= bin2hex(ciphertext);

                document.getElementById("details5").value = "*** Decryption by Triple DES ***\n";

                const keyArray = [key1, key2, key3];
                let loop = 1;
                for (const key of keyArray) {
                    document.getElementById("details5").value += "->Decryption by key"+ loop+"<-\n";
                    loop += 1;
                    
                    const keyBinary = textToBinary(key);

                    let left = keyBinary.slice(0, 28);
                    let right = keyBinary.slice(28, 56);

                    const rkb = [];
                    const rk = [];

                    for (let i = 0; i < 16; i++) {
                    left = shift_left(left, shift_table[i]);
                    right = shift_left(right, shift_table[i]);

                    const combineStr = left + right;
                    const roundKey = permute(combineStr, key_comp, 48);

                    rkb.push(roundKey);
                    rk.push(bin2hex(roundKey));
                    }

                    const rkbRev = rkb.reverse();
                    const rkRev = rk.reverse();

                    let result = encrypt(ciphertext, rkbRev, rkRev, action, inputType, algorithm);
                    document.getElementById("details5").value += result.details;
                    document.getElementById("plaintext5").value = result.Ciphertext;
                }
              
            }else if(inputType==="hexa"){
                let ciphertext = document.getElementById("hciphertext5").value.trim().replace(/\s/g, "");
                let key1 = document.getElementById("h1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("h2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("h3key5").value.trim().replace(/\s/g, "");

                document.getElementById("details5").value = "*** Decryption by Triple DES ***\n";

                const keyArray = [key1, key2, key3];
                let loop = 1;
                for (const key of keyArray) {
                    document.getElementById("details5").value += "->Decryption by key"+ loop+"<-\n";
                    loop += 1;
                    
                    const keyBinary = hex2bin(key);

                    let left = keyBinary.slice(0, 28);
                    let right = keyBinary.slice(28, 56);

                    const rkb = [];
                    const rk = [];

                    for (let i = 0; i < 16; i++) {
                    left = shift_left(left, shift_table[i]);
                    right = shift_left(right, shift_table[i]);

                    const combineStr = left + right;
                    const roundKey = permute(combineStr, key_comp, 48);

                    rkb.push(roundKey);
                    rk.push(bin2hex(roundKey));
                    }

                    const rkbRev = rkb.reverse();
                    const rkRev = rk.reverse();

                    let result = encrypt(ciphertext, rkbRev, rkRev, action, inputType, algorithm);
                    document.getElementById("details5").value += result.details;
                    document.getElementById("plaintext5").value = result.Ciphertext;
                }
              
            }else if(inputType==="binary"){
                let ciphertext = document.getElementById("bciphertext5").value.trim().replace(/\s/g, "");
                let key1 = document.getElementById("b1key5").value.trim().replace(/\s/g, "");
                let key2 = document.getElementById("b2key5").value.trim().replace(/\s/g, "");
                let key3 = document.getElementById("b3key5").value.trim().replace(/\s/g, "");

                ciphertext= bin2hex(ciphertext);

                document.getElementById("details5").value = "*** Decryption by Triple DES ***\n";

                const keyArray = [key1, key2, key3];
                let loop = 1;
                for (const key of keyArray) {
                    document.getElementById("details5").value += "->Decryption by key"+ loop+"<-\n";
                    loop += 1;
                    
                    const keyBinary = key;

                    let left = keyBinary.slice(0, 28);
                    let right = keyBinary.slice(28, 56);

                    const rkb = [];
                    const rk = [];

                    for (let i = 0; i < 16; i++) {
                    left = shift_left(left, shift_table[i]);
                    right = shift_left(right, shift_table[i]);

                    const combineStr = left + right;
                    const roundKey = permute(combineStr, key_comp, 48);

                    rkb.push(roundKey);
                    rk.push(bin2hex(roundKey));
                    }

                    const rkbRev = rkb.reverse();
                    const rkRev = rk.reverse();

                    let result = encrypt(ciphertext, rkbRev, rkRev, action, inputType, algorithm);
                    document.getElementById("details5").value += result.details;
                    document.getElementById("plaintext5").value = result.Ciphertext;
                }
            }
        }
    }
}

// Event listener for process button
document.getElementById("process-btn5").addEventListener("click", processAction5);