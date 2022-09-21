import CryptoJS from 'crypto-js'

// 默认的 KEY 与 IV 相同
const AES_KEY = CryptoJS.enc.Utf8.parse('platform.aes.key')
const AES_IV = CryptoJS.enc.Utf8.parse('platform.aes.key')
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * AES加密
 * @param {String} str
 */
export function encrypt(val: string) {
  const vals = CryptoJS.enc.Utf8.parse(val)
  const encrypted = CryptoJS.AES.encrypt(vals, AES_KEY, {
    iv: AES_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * AES解密
 * @param {String} secret
 */
export function decrypt(secret: string) {
  const base64 = CryptoJS.enc.Base64.parse(secret)
  const src = CryptoJS.enc.Base64.stringify(base64)

  const decrypt = CryptoJS.AES.decrypt(src, AES_KEY, {
    iv: AES_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
