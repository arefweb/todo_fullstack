describe('Test Todo', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept({
      method: 'POST',
      url: '/api/addTodo*',
      hostname: 'localhost',
    }).as('createTodo');
    cy.intercept({
      method: 'DELETE',
      url: '/api/todo/*',
      hostname: 'localhost',
    }).as('deleteTodo');
    cy.intercept({
      method: 'GET',
      url: '/api/todos*',
      hostname: 'localhost',
    }).as('getTodos');
    cy.intercept({
      method: 'PUT',
      url: '/api/todo/*',
      hostname: 'localhost',
    }).as('updateTodo');

    cy.wait('@getTodos');
    cy.get('[data-cy="todo input"]').type('Study in vacation{enter}');
  });

  it('Adds Todo', () => {
    cy.wait('@createTodo').then(() =>{
      cy.get('[data-cy="todo title"]')
        .contains('Study in vacation')
        .should('exist');
    }).then(() => {
      cy.get('[data-cy="todo title"]')
        .contains('Study in vacation')
        .parents('[data-cy="todo card"]')
        .find('[data-cy="delete button"]')
        .click();
    })
    cy.wait('@deleteTodo');
  });

  it('Deletes Todo', () => {
    cy.wait('@createTodo').then(() =>{
      cy.get('[data-cy="todo title"]')
        .contains('Study in vacation')
        .parents('[data-cy="todo card"]')
        .find('[data-cy="delete button"]')
        .click();
    });
    cy.wait('@deleteTodo').then(() => {
      cy.contains('Study in vacation')
        .should('not.exist');
    })
  });

  it('Updates Todo', () => {
    cy.wait('@createTodo').then(() => {
      cy.get('[data-cy="todo title"]')
        .contains('Study in vacation')
        .parents('[data-cy="todo card"]')
        .find('[data-cy="edit button"]')
        .click().wait(500).then(() => {
        cy.get('[data-cy="edit input"]')
          .should('have.value', 'Study in vacation')
          .click()
          .clear()
          .type('Updated Todo{enter}')
        })
    });
    cy.wait('@updateTodo').then(() => {
      cy.get('[data-cy="todo title"]')
        .contains('Updated Todo')
        .should('exist');
      cy.contains('Updated Todo')
        .parents('[data-cy="todo card"]')
        .find('[data-cy="delete button"]')
        .click();
    })
  })
});


export {};