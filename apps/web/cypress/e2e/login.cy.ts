describe('login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/pl/login');
  });

  it('should successfully log in with valid credentials', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');

    cy.get('[data-cy=username]').type('403hpns');
    cy.get('[data-cy=password]').type('1234');
    cy.get('[data-cy=login-button]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

    cy.url().should('eq', 'http://localhost:3000/pl/dashboard');
  });

  it('should fail to log in with invalid credentials', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequestFailed');

    cy.get('[data-cy=username]').type('403hpns');
    cy.get('[data-cy=password]').type('12345');
    cy.get('[data-cy=login-button]').click();

    cy.wait('@loginRequestFailed').its('response.statusCode').should('eq', 401);

    cy.get('[data-state=open]').should('be.visible');
  });
});
