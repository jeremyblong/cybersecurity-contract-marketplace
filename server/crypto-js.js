var CryptoJS = require("crypto-js");
const config = require("config");
const secretKey = config.get("cryptoSecret");

// string decrypt/encrypt
const encryptString = (text) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

const decryptString = (hash) => {

    const bytes  = CryptoJS.AES.decrypt(hash, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText;
};
// object encyption/decryption
const encryptObject = (obj) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), secretKey).toString();

    return ciphertext;
};

const decryptObject = (hash) => {

    const bytes  = CryptoJS.AES.decrypt(hash, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
};

module.exports = {
    encryptString,
    decryptString,
    decryptObject,
    encryptObject
}