import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String, $username: String, $password: String!) {
        login(email: $email, username: $username, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;
