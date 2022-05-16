const tokenName = 'token'

// 取得 Token
export const getToken = () => sessionStorage.getItem(tokenName)
// 設定 Token
export const setToken = (token) => sessionStorage.setItem(tokenName, token)
// 移除 Token
export const removeToken = (token) => sessionStorage.removeItem(tokenName)