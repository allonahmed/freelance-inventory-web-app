import Loader from "react-loader-spinner";

const Load = () => {
  return (
    <Loader
      type="ThreeDots"
      color="green"
      height={30}
      width={30}
      timeout={3000}
    />
  );
};

export default Load;
