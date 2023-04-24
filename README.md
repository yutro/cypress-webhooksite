# Cypress-Webhooksite
[![Buy me a beer](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/troinoff)

Simple library which adds [webhook.site](https://docs.webhook.site) commands into  [cypress.io](https://docs.cypress.io)

![npm version](https://img.shields.io/npm/v/@icokie/cypress-webhooksite.svg)
![package size minified](https://img.shields.io/bundlephobia/min/@icokie/cypress-webhooksite?style=plastic)
[![](https://data.jsdelivr.com/v1/package/npm/@icokie/cypress-webhooksite/badge)](https://www.jsdelivr.com/package/npm/@icokie/cypress-webhooksite)

![total downloads](https://img.shields.io/npm/dt/@icokie/cypress-webhooksite.svg)
![total downloads per year](https://img.shields.io/npm/dy/@icokie/cypress-webhooksite.svg)
![total downloads per week](https://img.shields.io/npm/dw/@icokie/cypress-webhooksite.svg)
![total downloads per month](https://img.shields.io/npm/dm/@icokie/cypress-webhooksite.svg)

### Email e2e testing:
- add import to cypress `commands`
```typescript
import '@icokie/cypress-webhooksite'
```

- connect types in `tsconfig.json`
```json
{
  "compilerOptions": {
    "types": ["cypress", "@icokie/cypress-webhooksite"]
  }
}
```
- use it in your CY `test` files
```typescript jsx
describe('My test', () => {
    before(() => {
        cy.getWebHookSiteToken().as('emailRequest')
    })
    
    it('should work', () => {
        cy.get('@emailRequest').then(({email, uuid}) => {
            // type email into form input
            cy.findByLabelText('Email').should('be.empty').type(email)

            // send your form to Email Server
            cy.findByRole('button').should('be.enabled').click()

            // check that email has reached your mail box
            cy.get('@emailRequest').then(({uuid}) => cy.getWebHookSiteTokenRequests(uuid).then((response) => {
                const {data: [latestRequest]} = response

                cy.wrap(latestRequest.content).should('contain', 'text youre email shold have')

                // cleare webhook when you don't need it anymore
                cy.deleteWebHookSiteToken(uuid)
            }))
        })
    })
})
```

### That's it!
