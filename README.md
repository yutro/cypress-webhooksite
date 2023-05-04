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

- add tasks into `cypress.config.ts`
```typescript
import {defineConfig} from 'cypress'
import {tasks} from '@icokie/cypress-webhooksite/lib/tasks'

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('task', tasks)
        },
    },
})
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
describe('Email', () => {
    before(() => {
        // request test email
        cy.getWebHookSiteToken().as('emailRequest')
    })

    it('should receive email after user submits subscribe form', () => {
        cy.visit('http://localhost:5000')

        cy.findByLabelText('Name').should('be.empty').type('Test name')

        cy.get('@emailRequest').then((response) => {
            const { email } = response

            // type email into form
            cy.findByLabelText('Email').should('be.empty').type(email)
        })

        // send email form
        cy.findByRole('button').should('be.enabled').click()

        cy.get('@emailRequest').then((response) => {
            const { uuid } = response

            return cy.getWebHookSiteTokenRequests(uuid, undefined, 30000).then((response) => {
                // get latest email request from email server
                const {data: [latestRequest]} = response

                // check if email contains message which was sent
                cy.wrap(latestRequest.content).should('contain', 'Congratulations you are subscribed :) stay tuned!!!!')

                // delete email when not needed :)
                cy.deleteWebHookSiteToken(uuid)
            });
        })
    })
})
```

### That's it!
