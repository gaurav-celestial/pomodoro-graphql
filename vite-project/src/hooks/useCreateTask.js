import { gql, useMutation } from "@apollo/client";

const mutation = gql`
  mutation createTaskGroup($taskGroup: taskInput!) {
    createTaskGroup(taskGroup: $taskGroup) {
      id
      title
      description
      totaltime
      breaktime
      userid
      tasks
    }
  }
`;

const useCreateTask = () => {
  const [createTask, { data, error, loading }] = useMutation(mutation);

  const createTaskHandler = function (data) {
    createTask({
      variables: {
        taskGroup: {
          ...data,
        },
      },
    }).catch((error) => {
      console.log(error);
      const msg =
        error.message === "Invalid Credentials"
          ? "Invalid Credentials"
          : "Something went wrong";

      alert(msg); // Handle the error here, such as displaying a message to the user
    });
  };

  return { createTaskHandler, data, error, loading };
};

export default useCreateTask;
