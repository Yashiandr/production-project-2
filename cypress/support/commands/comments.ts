import { Comment } from '../../../src/entities/Comment';

export const addComment = (text: string) => {
    cy.getByTestId('AddCommentForm.Input').type(text);
    cy.getByTestId('AddCommentForm.Button').click();
};

export const removeComment = (articleId: string) => cy.request({
    method: 'GET',
    url: `http://localhost:8000/comments/?articleId=${articleId}`,
    headers: { Authorization: 'asd' },
}).then((resp) => {
    const { body } = resp;
    body.forEach((comment: Comment) => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:8000/comments/${comment.id}`,
            headers: { Authorization: 'asd' },
        });
    });
});

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(text: string): Chainable<void>;

            removeComment(articleId: string): Chainable<void>
        }
    }
}
