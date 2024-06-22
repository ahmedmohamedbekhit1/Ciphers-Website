// Helper functions for conversion and validation
function textToBinary(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}

function hexToBinary(hex) {
    return hex.split('').map(char => parseInt(char, 16).toString(2).padStart(4, '0')).join('');
}

function binaryToText(binary) {
    return binary.match(/.{1,8}/g).map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
}

function binaryToHex(binary) {
    return binary.match(/.{1,4}/g).map(nibble => parseInt(nibble, 2).toString(16)).join('');
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

// DES encryption and decryption functions
function desEncrypt(plaintext, key) {
    // Implement DES encryption logic here
    // Use static variables for permutations, initial and final permutations, S-boxes, etc.
    // For now, return a placeholder value
    return 'des-encrypted-' + plaintext;
}

function desDecrypt(ciphertext, key) {
    // Implement DES decryption logic here
    // Use static variables for permutations, initial and final permutations, S-boxes, etc.
    // For now, return a placeholder value
    return 'des-decrypted-' + ciphertext;
}

// Triple DES encryption and decryption functions
function tripleDesEncrypt(plaintext, key1, key2, key3) {
    // Implement Triple DES encryption logic here
    // Use desEncrypt function three times with the provided keys
    let result = desEncrypt(plaintext, key1);
    result = desDecrypt(result, key2);
    result = desEncrypt(result, key3);
    return result;
}

function tripleDesDecrypt(ciphertext, key1, key2, key3) {
    // Implement Triple DES decryption logic here
    // Use desDecrypt function three times with the provided keys
    let result = desDecrypt(ciphertext, key3);
    result = desEncrypt(result, key2);
    result = desDecrypt(result, key1);
    return result;
}

// Function to validate inputs before processing
function validateInputs5() {
    let action = document.getElementById("action5").value;
    let inputType= document.querySelector('input[name="radio2"]:checked').value; // Get algorithm type
    let algorithm = document.querySelector('input[name="radio1"]:checked').value; // Get algorithm type

    if (action === "encrypt5") {
        if(algorithm === "1"){
            if(inputType==="text"){
                let plaintext = document.getElementById("tplaintext5").value.trim().replace(/\s/g, "");;
                let key = document.getElementById("dtciphertext5").value.trim().replace(/\s/g, "");;
                if(validateKey(plaintext.length, 8)){
                    alert("Enter 8 characters in plaintext you now entered "+plaintext.length+" characters");
                    return false;
                }
                if(validateKey(key.length, 7)){
                    alert("Enter 7 characters in key you now entered "+key.length+" characters");
                    return false;
                }
            }else if(inputType==="hexa"){
                let plaintext = document.getElementById("hplaintext5").value.trim().replace(/\s/g, "");;
                let key = document.getElementById("dhciphertext5").value.trim().replace(/\s/g, "");;
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
                let plaintext = document.getElementById("bplaintext5").value.trim().replace(/\s/g, "");;
                let key = document.getElementById("dbciphertext5").value.trim().replace(/\s/g, "");;
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
                let plaintext = document.getElementById("tplaintext5").value.trim().replace(/\s/g, "");;
                let key1 = document.getElementById("t1key5").value.trim().replace(/\s/g, "");;
                let key2 = document.getElementById("t2key5").value.trim().replace(/\s/g, "");;
                let key3 = document.getElementById("t3key5").value.trim().replace(/\s/g, "");;
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
                let plaintext = document.getElementById("hplaintext5").value.trim().replace(/\s/g, "");;
                let key1 = document.getElementById("h1key5").value.trim().replace(/\s/g, "");;
                let key2 = document.getElementById("h2key5").value.trim().replace(/\s/g, "");;
                let key3 = document.getElementById("h3key5").value.trim().replace(/\s/g, "");;
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
                let plaintext = document.getElementById("hplaintext5").value.trim().replace(/\s/g, "");;
                let key1 = document.getElementById("b1key5").value.trim().replace(/\s/g, "");;
                let key2 = document.getElementById("b2key5").value.trim().replace(/\s/g, "");;
                let key3 = document.getElementById("b3key5").value.trim().replace(/\s/g, "");;
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
                let key = document.getElementById("dtciphertext5").value.trim().replace(/\s/g, "");;
                if(validateKey(ciphertext.length, 8)){
                    alert("Enter 8 characters in ciphertext you now entered "+ciphertext.length+" characters");
                    return false;
                }
                if(validateKey(key.length, 7)){
                    alert("Enter 7 characters in key you now entered "+key.length+" characters");
                    return false;
                }
            }else if(inputType==="hexa"){
                let ciphertext = document.getElementById("hciphertext5").value.trim().replace(/\s/g, "");;
                let key = document.getElementById("dhciphertext5").value.trim().replace(/\s/g, "");;
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
                let ciphertext = document.getElementById("bciphertext5").value.trim().replace(/\s/g, "");;
                let key = document.getElementById("dbciphertext5").value.trim().replace(/\s/g, "");;
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
                let key1 = document.getElementById("t1key5").value.trim().replace(/\s/g, "");;
                let key2 = document.getElementById("t2key5").value.trim().replace(/\s/g, "");;
                let key3 = document.getElementById("t3key5").value.trim().replace(/\s/g, "");;
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
                let key1 = document.getElementById("h1key5").value.trim().replace(/\s/g, "");;
                let key2 = document.getElementById("h2key5").value.trim().replace(/\s/g, "");;
                let key3 = document.getElementById("h3key5").value.trim().replace(/\s/g, "");;
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
                let ciphertext = document.getElementById("bciphertext5").value.trim().replace(/\s/g, "");;
                let key1 = document.getElementById("b1key5").value.trim().replace(/\s/g, "");;
                let key2 = document.getElementById("b2key5").value.trim().replace(/\s/g, "");;
                let key3 = document.getElementById("b3key5").value.trim().replace(/\s/g, "");;
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



    // let result;
    // if (action === "encrypt3") {
    //     result = vigenereEncrypt(plaintext, vigkey, mode);
    //     document.getElementById("ciphertext3").value = result.ciphertext;
    // } else if (action === "decrypt3") {
    //     result = vigenereDecrypt(ciphertext, vigkey, mode);
    //     document.getElementById("plaintext3").value = result.plaintext;
    // }

    // document.getElementById("details5").value = result.details;
}

// Event listener for process button
document.getElementById("process-btn5").addEventListener("click", processAction5);