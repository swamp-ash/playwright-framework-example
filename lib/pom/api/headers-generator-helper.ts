const headersGen = async (accessToken: string = null) => {
    return {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
}
export default headersGen