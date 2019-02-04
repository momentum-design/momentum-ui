describe('My First Test', function() {
  it('Visits the Kitchen Sink', function() {
    cy.visit('http://localhost:4000');
    cy.contains('alert').click();
  })
})
