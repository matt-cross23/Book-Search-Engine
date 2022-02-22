import { gql} from '@apollo/client';
export const GET_ME = gql`{
me{
_id
username
email
bookCount
savedBook{
  # _id
  bookId
  authors
  description
  title
  image
  link
    }
  }
  }
`;
