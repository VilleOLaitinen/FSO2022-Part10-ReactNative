import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({username, password}) => {
    const credentials = { username, password };
    return await mutate({ variables: {credentials} });
  };

  return [signIn, result];
}

export default useSignIn;