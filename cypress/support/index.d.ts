/// <reference types="cypress" />

type ShowcasAttributes = {
  name: string
  highlight?: boolean
}

type FieldAttributes = {
  label: string
  name: string | number
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to get element by data-cy
     * @example cy.getByDataCy('selector')
     */
    getByDataCy(selector: string): Chainable<JQuery<Element>>
    /**
     * Custom command to get fields by label
     * @example cy.getFields([{label: 'foo', name: 'foo' }])
     */
    getFields(fields: FieldAttributes[]): Chainable<Element>
    /**
     * Custom command to if check value is greater than preice
     * @example cy.shouldBeGreaterThan(100)
     */
    shouldBeGreaterThan(value: number): Chainable<Element>
    /**
     * Custom command to check if value is less than price
     * @example cy.shouldBeLessThan(50)
     */
    shouldBeLessThan(value: number): Chainable<Element>

    /**
     * Custom command to check banner in page
     * @example cy.shouldRenderBanner()
     */
    shouldRenderBanner(): Chainable<Element>
    /**
     * Custom command to check showcase in page
     * @example cy.shouldRenderShowcase({name: 'Showcase', highlight: true  })
     */
    shouldRenderShowcase(attrs: ShowcasAttributes): Chainable<Element>
  }
}
