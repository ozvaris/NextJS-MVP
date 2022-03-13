const UserIdPage = (props) => {
  return <h1>{props.id}</h1>;
};

export default UserIdPage;

export const getServerSideProps = async (context) => {
  console.log("(Re-)Generating");
  const { params } = context;
  const userId = params.uid;

  return {
    props: {
      id: "userld-" + userId,
    },
  };
};
