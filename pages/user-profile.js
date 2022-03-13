const UserProfilePage = (props) => {
  return <h1>{props.username}</h1>;
};

export default UserProfilePage;

export const getServerSideProps = async () => {
  console.log("(Re-)Generating");
  console.log("server side code");
  return {
    props: {
      username: "Ozgur",
    },
  };
};
