import MoonLoader from 'react-spinners/MoonLoader';

const Spinner = () => (
  <div className="absolute top-0 bottom-0 right-0 left-0 z-20">
    <div className="h-full flex justify-center items-center bg-black bg-opacity-30">
      <MoonLoader />
    </div>
  </div>
);

export default Spinner;
