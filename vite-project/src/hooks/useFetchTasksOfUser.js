import { gql, useMutation } from "@apollo/client";

const mutation = gql`
  mutation getTaskOfUser($data: userIdInput!) {
    getTaskOfUser(data: $data) {
      id
      description
      tasks
      title
      userid
      breaktime
      totaltime
    }
  }
`;

const useFetchTasksOfUser = () => {
  const [fetchTasks, { data, error, loading }] = useMutation(mutation);

  const fetchTasksHandler = function (userid) {
    fetchTasks({
      variables: {
        data: {
          userid,
        },
      },
    }).catch((error) => {
      if (error.message === "Not found") return;

      const msg =
        error.message === "Invalid Credentials"
          ? "Invalid Credentials"
          : "Something went wrong";

      alert(msg);
    });
  };

  return { fetchTasksHandler, data, error, loading };
};

export default useFetchTasksOfUser;
