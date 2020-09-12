const input = (label, content) =>
  cy.findByLabelText(label).click({ force: true }).type(content)

const clickLabel = (label) => cy.findByText(label).click()

describe('Create New Trip', () => {
  before(() => cy.login())
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('jwt')
  })

  it('correctly fills in the Info tab', () => {
    cy.visit('http://localhost:3000/')

    cy.findByText(/add new trip/i).click()

    input(/name/i, 'Vacation in Croatia')
    input(/start date/i, '2020-06-01')
    input(/end date/i, '2020-06-10')

    cy.findByText('travel_partner_1').should('not', 'exist')
    input(/travel partners/i, 'travel_par{enter}')
    cy.findByText('travel_partner_1').should('exist')

    input(/categories/i, 'cate{enter}')
    input(/categories/i, 'category_3{enter}')
    cy.findByText('category_1').should('exist')
    cy.findByText('category_3').should('exist')

    clickLabel(/next/i)
  })

  it('correctly fills in the Places tab', () => {
    input(/countries\/states/i, 'Croatia{enter}')

    input(/places/i, 'Rovinj{enter}')

    clickLabel(/next/i)
  })

  it('correctly fills in the Photos/Videos tab', () => {
    clickLabel(/next/i)
  })
  it('correctly fills in the Notes tab', () => {
    clickLabel(/save/i)
  })
})

describe('My Trips', () => {
  before(() => cy.login())
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('jwt')
  })

  it('correctly lists my trips', () => {
    cy.visit('http://localhost:3000/')

    cy.findByText(/my trips/i).click()

    cy.wait(1000)

    cy.findAllByText(/vacation in croatia/i).should('exist')
    cy.findAllByText('2020-06-01 – 2020-06-10').should('exist')
  })
})
