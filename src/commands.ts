/// <reference types="../types/index.d.ts" />

import {GetWebhookSiteTokenRequestsResponse, WebhookSiteToken} from "../types";

const WEBHOOK_TOKEN_HOST = 'https://webhook.site/token'
const baseHeaders = {
    Accept: 'application/json', 'Content-Type': 'application/json'
}

const withApiKeyHeader = (headers = {}, apiKey?: string) => {
    if(!apiKey) return headers

    return {...headers, "Api-Key": apiKey}
}

Cypress.Commands.add('getWebHookSiteToken', (apiKey) =>
    cy.task<WebhookSiteToken>('fetchWebHookSiteToken').then(({uuid, ...data}) => ({
        ...data, uuid, email: `${uuid}@email.webhook.site`
    }))
)

Cypress.Commands.add('getWebHookSiteTokenRequests', (token, apiKey, timeout = 5000) => {
    cy.log(`Wait ${timeout} for email server to handle email`).wait(timeout)
        .then(() => cy.task<GetWebhookSiteTokenRequestsResponse>('fetchWebHookSiteTokenRequests', {token, apiKey}))
})

Cypress.Commands.add('deleteWebHookSiteToken', (token, apiKey) =>
    cy.task<boolean>('deleteWebHookSiteToken', { token, apiKey}))
