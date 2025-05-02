//Caso de Teste: Registro de novo usuário com sucesso.
// Descrição: Verifique se é possível registrar um novo usuário com informações válidas. Caso de Teste: Tentar registrar um novo usuário com informações incompletas.
// Descrição: Garanta que o sistema exiba mensagens de erro ao tentar registrar um novo usuário sem preencher todas as informações obrigatórias.

describe('', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/signin');
        cy.contains('Sign in').should('be.visible');
    })
    it('Deve Registrar um novo usuário válido', () => {
        cy.get("[data-test='signup']").should('contain.text', "Don't have");
        cy.get("[data-test='signup']").click();
        cy.get('.SignUpForm-form').within(() => {
            cy.contains('label', 'First Name').should('be.visible');
            cy.contains('   label', 'Last Name').should('be.visible');
            cy.contains('label', 'Username').should('be.visible');
            cy.contains('label', 'Password').should('be.visible');
            cy.contains('label', 'Confirm Password').should('be.visible');
        });
        cy.get("input[name='firstName']").click()
        cy.get("input[name='firstName']").clear().type('Lucas{enter}');
        cy.get("input[name='lastName']").click()
        cy.get("input[name='lastName']").clear().type('Silva{enter}');
        cy.get("input[name='username']").click()
        cy.get("input[name='username']").clear().type('lucas.silva123{enter}');
        cy.get("input[name='password']").click()
        cy.get("input[name='password']").clear().type('SenhaForte@2024{enter}');
        cy.get("input[name='confirmPassword']").click()
        cy.get("input[name='confirmPassword']").clear().type('SenhaForte@2024{enter}');
        cy.wait(1000);
        cy.get("button[type='submit']").should('not.be.disabled').click();
        cy.wait(1000);
        cy.contains('Sign in').should('be.visible');
    })
    it('Login com o Novo Usuário', () => {
        const username = 'lucas.silva123';
        const password = 'SenhaForte@2024';

        cy.get("input[name='username']").click().clear().type(username);
        cy.get("input[type='password']").click().clear().type(password);
        cy.get("button[type='submit']").then(($button) => {
            if ($button.prop('disabled')) {
                cy.contains('username or password').should('be.visible');
                throw new Error("A senha não foi preenchida corretamente");
                return;
            }
            cy.wrap($button).click();
            cy.wait(1000);
            cy.get('body').then(($body) => {
                if ($body.find('div.MuiAlert-message').length > 0) {
                    cy.get('div.MuiAlert-message').should('contain.text', 'invalid');
                    cy.log('Erro de login: Senha ou usuário incorretos.');
                } else {
                    cy.get('.MainLayout-container').should('be.visible');
                    cy.log('Login feito com sucesso!');
                }
            })
        })
    })

})

