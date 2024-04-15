import { TailSpin } from "react-loader-spinner";

const LoaderSpinner = () => {
  return (
    <div>
        <TailSpin
            height="23"
            width="23"
            color="#fffff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
  );
};

export default LoaderSpinner;