import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';
import { User } from '../../../src/entities/User';
import { selectByTestId } from '../../helpers/selectByTestId';

export const login = (username: string = 'testuser', password: string = '123') => cy.request({
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
        username,
        password,
    },
}).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));

    return body;
});

export const getByTestId = (testId: string, timeout: number = 4000) => cy.get(selectByTestId(testId), { timeout });

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<User>;

            getByTestId(testId: string, timeout?: number): Chainable<JQuery<HTMLElement>>;
        }
    }
}
