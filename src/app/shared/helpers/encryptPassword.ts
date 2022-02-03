import * as CryptoJS from 'crypto-js';

export function EncryptPassword(pass: string): string {
  let secretKey = '65tegd/_dgfy78JGDT8**-!';

  let _key = CryptoJS.enc.Utf8.parse(secretKey);
  let _iv = CryptoJS.enc.Utf8.parse(secretKey);

  let encrypted = CryptoJS.AES.encrypt(pass, _key, {
    keySize: 16,
    iv: _iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}

export function DecryptPassword(cipherPass: string, userPass: string): boolean {
  let secretKey = '65tegd/_dgfy78JGDT8**-!';
  let samePassword = false;

  let _key = CryptoJS.enc.Utf8.parse(secretKey);
  let _iv = CryptoJS.enc.Utf8.parse(secretKey);

  let decrypted = CryptoJS.AES.decrypt(cipherPass, _key, {
    keySize: 16,
    iv: _iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);

  let userPassText = DecryptUserPassword(userPass);
  if (decrypted === userPassText) {
    samePassword = true;
  }

  return samePassword;
}

function DecryptUserPassword(userPass: string): string {
  let secretKey = '65tegd/_dgfy78JGDT8**-!';
  let _key = CryptoJS.enc.Utf8.parse(secretKey);
  let _iv = CryptoJS.enc.Utf8.parse(secretKey);

  let decrypted = CryptoJS.AES.decrypt(userPass, _key, {
    keySize: 16,
    iv: _iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);

  return decrypted;
}
