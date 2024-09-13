export const setTokens = (data) => {
    localStorage.setItem('accessToken', data.access)
    localStorage.setItem('refreshToken', data.refresh)

}

export const getAccessToken = () => {
    return localStorage.getItem('accessToken')
}

export const clearTokens = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}