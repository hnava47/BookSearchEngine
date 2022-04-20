import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql`
    query getSingleUser {
        me {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
            bookCount
        }
    }
`;
