const tokenName = 'token'

/**
 * 取得 Token
 * @date 2022-05-16
 * @returns {String} Token
 */
export const getToken = () => sessionStorage.getItem(tokenName)

/**
 * 設定 Token，存入到 sessionStorage
 * @date 2022-05-16
 * @param {String} token
 */
export const setToken = (token) => sessionStorage.setItem(tokenName, token)

/**
 * 移除 Token
 * @date 2022-05-16
 */
export const removeToken = () => sessionStorage.removeItem(tokenName)