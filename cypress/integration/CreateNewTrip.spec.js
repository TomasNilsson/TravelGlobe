const VACATION_NAME = 'Vacation in Croatia'
const START_DATE = '2020-06-01'
const END_DATE = '2020-06-10'

const input = (label, content) =>
  cy.findByLabelText(label).click({ force: true }).type(content)

const clickButton = (label) => cy.findByText(label).click()

const awaitModalOpen = () => cy.wait(500)

const awaitApi = () => cy.wait(1000)

describe('Create New Trip', () => {
  before(() => cy.login())
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('jwt')
  })

  it('correctly fills in the Info tab', () => {
    cy.visit('http://localhost:3000/')

    cy.findByText(/add new trip/i).click()
    awaitModalOpen()

    input(/name/i, VACATION_NAME)
    input(/start date/i, START_DATE)
    input(/end date/i, END_DATE)

    cy.findByText('travel_partner_1').should('not', 'exist')
    input(/travel partners/i, 'travel_par{enter}')
    cy.findByText('travel_partner_1').should('exist')

    input(/categories/i, 'cate{enter}')
    input(/categories/i, 'category_3{enter}')
    cy.findByText('category_1').should('exist')
    cy.findByText('category_3').should('exist')

    clickButton(/next/i)
  })

  it('correctly fills in the Places tab', () => {
    input(/countries\/states/i, 'Croatia{enter}')

    input(/places/i, 'Rovinj{enter}')
    awaitApi()

    cy.findByTestId('placesTab').findByText('Croatia').should('exist')
    cy.findByTestId('placesTab').findByText('Rovinj').should('exist')

    clickButton(/next/i)
  })

  it('correctly fills in the Photos/Videos tab', () => {
    clickButton(/next/i)
  })
  it('correctly fills in the Notes tab', () => {
    clickButton(/save/i)
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
    awaitModalOpen()

    cy.findAllByText(VACATION_NAME).should('exist')
    cy.findAllByText(`${START_DATE} - ${END_DATE}`).should('exist')
  })
})
