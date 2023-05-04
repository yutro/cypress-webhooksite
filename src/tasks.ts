export const WEBHOOK_TOKEN_HOST = 'https://webhook.site/token'
export const baseHeaders = {
    Accept: 'application/json', 'Content-Type': 'application/json'
}
export const withApiKeyHeader = (apiKey?:string) => {
    if (!apiKey) return undefined

    return {"Api-Key": apiKey}
}
export const fetchWebHookSiteToken = async (apiKey?:string, headers = baseHeaders) =>
    fetch(WEBHOOK_TOKEN_HOST, {
        method: 'POST',
        redirect: 'follow',
        headers: withApiKeyHeader( apiKey)
    }).then(response => response.json())

type FetchWebHookSiteTokenRequestsParams = Readonly<{
    token: string,
    apiKey?:string
}>

export const fetchWebHookSiteTokenRequests = async ({token, apiKey}: FetchWebHookSiteTokenRequestsParams) =>
    fetch(`${WEBHOOK_TOKEN_HOST}/${token}/requests?sorting=newest`, {
        method: 'GET', headers: withApiKeyHeader(apiKey)
    }).then(response => response.json())
export type DeleteWebHookSiteTokenParams = FetchWebHookSiteTokenRequestsParams

export const deleteWebHookSiteToken = async ({token, apiKey}: DeleteWebHookSiteTokenParams) =>
    fetch(`${WEBHOOK_TOKEN_HOST}/${token}`, {
        method: 'DELETE',
        headers: withApiKeyHeader(apiKey)
    }).then(() => true)
export const tasks = { fetchWebHookSiteToken, fetchWebHookSiteTokenRequests, deleteWebHookSiteToken }
