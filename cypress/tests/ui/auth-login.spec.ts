describe('Login com sucesso', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/signin');
        cy.contains('Sign in').should('be.visible');
    })

    it('Deve fazer login com um usuário válido', () => {
        cy.fixture('userData').then((data) => {
            const username = data.userSuccess.username;
            const password = data.userSuccess.password;

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

    it('Deve fazer login com um usuário inválido', () => {
        cy.fixture('userData').then((data) => {
            const username = data.userFail.username;
            const password = data.userFail.password;

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
})
