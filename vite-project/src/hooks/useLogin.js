import { gql, useMutation } from "@apollo/client";

const Login = gql`
  mutation Login($credentials: loginInput!) {
    login(credentials: $credentials) {
      id
      username
      password
      image
      profession
    }
  }
`;

const useLogin = function () {
  const [loginMutation, { data, error, loading }] = useMutation(Login);

  const login = function (username, password) {
    loginMutation({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    }).catch((error) => {
      const msg =
        error.message === "Invalid Credentials"
          ? "Invalid Credentials"
          : "Something went wrong";

      alert(msg); // Handle the error here, such as displaying a message to the user
    });
  };

  return { login, data, error, loading };
};

export default useLogin;
