import { gql, useMutation } from "@apollo/client";

const mutation = gql`
  mutation editTaskGroupd($taskGroup: editTaskInput!) {
    editTaskGroup(taskGroup: $taskGroup) {
      id
      title
      description
      tasks
      totaltime
      userid
    }
  }
`;

const useEditTask = () => {
  const [editTask, { data, error, loading }] = useMutation(mutation);

  const editTaskHandler = function (data) {
    console.log({
      taskGroupId: data.id,
      tasks: JSON.stringify(data.tasks),
      totalTime: data.totaltime,
    });

    editTask({
      variables: {
        taskGroup: {
          taskGroupId: data.id,
          tasks: JSON.stringify(data.tasks),
          totalTime: data.totaltime,
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

  return { editTaskHandler, data, error, loading };
};

export default useEditTask;
