/// <reference types="../types/index.d.ts" />

const WEBHOOK_TOKEN_HOST = 'https://webhook.site/token'
const baseHeaders = {
    Accept: 'application/json', 'Content-Type': 'application/json'
}

const withApiKeyHeader = (headers = {}, apiKey?: string) => {
    if(!apiKey) return headers

    return {...headers, "Api-Key": apiKey}
}

Cypress.Commands.add('getWebHookSiteToken', (apiKey) => cy.wrap(fetch(WEBHOOK_TOKEN_HOST, {
    method: 'POST', mode: 'no-cors', headers: withApiKeyHeader(apiKey)
}).then(response => response.json()).then(({uuid, ...data}) => ({
    ...data, uuid, email: `${uuid}@email.webhook.site`
}))))

Cypress.Commands.add('getWebHookSiteTokenRequests', (token, apiKey, timeout = 5000) => {
    cy.log(`Wait ${timeout} for email server to handle email`).wait(timeout)
        .then(() => fetch(`${WEBHOOK_TOKEN_HOST}/${token}/requests?sorting=newest`, {
            method: 'GET', headers: withApiKeyHeader(apiKey)
        }).then(response => response.json()))
})

Cypress.Commands.add('deleteWebHookSiteToken', (token, apiKey) => cy.wrap(
    fetch(`${WEBHOOK_TOKEN_HOST}/${token}`, {
        method: 'DELETE', headers: withApiKeyHeader(apiKey)
    }).then(() => true)))
