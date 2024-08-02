// decrypt.js
import CryptoJS from "crypto-js";

const secretKey = '63e33f99bdd5fa344fe6e18r';

const decrypt = (encryptedText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

export default decrypt;
