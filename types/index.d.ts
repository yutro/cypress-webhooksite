import '@testing-library/cypress/add-commands'

import './commands.custom'

export type WebhookSiteToken = Readonly<{
    uuid: string
    redirect: boolean
    alias: string | null
    actions: boolean
    cors: boolean
    expiry: boolean
    timeout: number
    premium: boolean
    user_id: string | null
    password: boolean
    ip: string
    user_agent: string
    default_content: string
    default_status: number
    default_content_type: string
    premium_expires_at: string
    description: null
    created_at: string // "2023-04-19 20:53:03"
    updated_at: string // "2023-04-19 20:53:03"
    // computed
    email: string
}>

export type WebhookSiteTokenRequest = Readonly<{
    uuid: string
    type: "email" | string
    hostname: string
    token_id: string
    sender: string
    message_id: string
    "destinations": ReadonlyArray<string>
    checks: {
        spam: boolean
        virus: boolean
        spf: boolean
        dkim: boolean
        dmarc: boolean
    }, headers: {
        "authentication-results": ReadonlyArray<string>
        "content-type": ReadonlyArray<string>
        date: ReadonlyArray<string>
        "dkim-signature": ReadonlyArray<string>
        from: ReadonlyArray<string>
        "list-unsubscribe": ReadonlyArray<string>
        "message-id": ReadonlyArray<string>
        "mime-version": ReadonlyArray<string>
        received: ReadonlyArray<string>
        "received-spf": ReadonlyArray<string>
        "reply-to": ReadonlyArray<string>
        "return-path": ReadonlyArray<string>
        sender: ReadonlyArray<string>
        subject: ReadonlyArray<string>
        to: ReadonlyArray<string>
        "x-msg-eid": ReadonlyArray<string>
        "x-please-report-any-spam": ReadonlyArray<string>
    }, content: string
    text_content: string
    email_truncated: boolean
    size: number
    files: ReadonlyArray<File>
    created_at: string // "2023-04-19 20:53:03"
    updated_at: string // "2023-04-19 20:53:03"
    sorting: number
}>

export type WebhookSiteTokenRequests = ReadonlyArray<WebhookSiteTokenRequest>

export type GetWebhookSiteTokenRequestsResponse = Readonly<{
    data: WebhookSiteTokenRequests, total: number
    per_page: number, current_page: number, is_last_page: true, from: number, to: number
}>

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * @description creates new webhook site token object
             * @link https://docs.webhook.site/api/about.html#create-new-urlemail-address
             * @param {string} apiKey
             * @returns {Cypress.Chainable<WebhookSiteToken>}
             */
            readonly getWebHookSiteToken(apiKey?: string): Chainable<WebhookSiteToken>

            /**
             * @description get list of latest captured requests
             * @link https://docs.webhook.site/api/tokens.html#capture-request
             * @param {string} token
             * @param {string} apiKey
             * @param {number} timeout
             * @returns {Cypress.Chainable<GetWebhookSiteTokenRequestsResponse>}
             */
            readonly getWebHookSiteTokenRequests(token: string, apiKey?: string, timeout?: number): Chainable<GetWebhookSiteTokenRequestsResponse>

            /**
             * @description remove webhookSite token
             * @link https://docs.webhook.site/api/tokens.html#delete-token
             * @param {string} token
             * @param {string} apiKey
             * @returns {Cypress.Chainable<boolean>}
             */
            readonly deleteWebHookSiteToken(token: string, apiKey?: string): Chainable<boolean>
        }
    }
}