import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };
    const res = await mutate({ variables: { credentials } });
    if (res.data.authenticate.accessToken) {
      const token = res.data.authenticate.accessToken;
      await authStorage.setAccessToken(token);
      client.resetStore();

      return res;
    }
    return null;
  };

  return [signIn, result];
};

export default useSignIn;
