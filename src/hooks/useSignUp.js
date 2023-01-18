import useSignIn from "./useSignIn";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

const useSignUp = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [mutate] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      return null;
    },
  });

  const signUp = async ({ username, password }) => {
    const user = { username, password };
    const res = await mutate({ variables: { user } });

    if (res.data.createUser) {
      const { data } = await signIn({ username, password });

      console.log(data);
      navigate("/");
      return res;
    }
  };
  return [signUp];
};

export default useSignUp;
