import { gql, useMutation } from "@apollo/client";

const Signup = gql`
  mutation Signup($details: signupInput!) {
    signup(details: $details)
  }
`;

const useSignup = function () {
  const [signup, { data, error, loading }] = useMutation(Signup);

  const signupHandler = function (username, password, image, profession) {
    signup({
      variables: {
        details: {
          username,
          password,
          image,
          profession,
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

  return { signupHandler, data, error, loading };
};

export default useSignup;
