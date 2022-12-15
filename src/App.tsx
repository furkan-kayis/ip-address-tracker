import { FormEvent, useState } from 'react';
import Map from './components/Map';
import Spinner from './components/Spinner';
import useGeolocation from './hooks/useGeolocation';

const App = () => {
  const [search, setSearch] = useState('');
  const { geo, isLoading, error, fetchGeo, setError } = useGeolocation();

  const getGeoInfo = async () => {
    const urlRegex =
      /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    const ipRegex =
      /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

    const isIp = ipRegex.test(search);
    const isUrl = urlRegex.test(search);

    if (isIp) {
      await (search === localStorage.getItem('ip')
        ? fetchGeo()
        : fetchGeo(search));
    } else if (isUrl) {
      await fetchGeo(search, true);
    } else {
      setError(new Error('You must enter ip address or url'));
    }
    setSearch('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getGeoInfo();
  };

  return (
    <div className="flex place-content-center">
      <div className="absolute w-full h-full text-very-dark-gray max-w-screen-2xl">
        <div className="bg-[url(../assets/pattern-bg.png)] bg-cover h-1/3 flex flex-col items-center">
          <h1 className="text-white font-medium text-xl lg:text-3xl m-7">
            IP Address Tracker
          </h1>
          <div className="w-full z-10 px-6 flex flex-col place-items-center">
            <form
              onSubmit={handleSubmit}
              className="flex mb-6 w-full lg:w-2/6 lg:mb-12"
            >
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search for any IP address or domain"
                className="pl-5 cursor-pointer outline-none w-full rounded-l-2xl"
              />
              <button
                type="submit"
                className="bg-black p-5 pl-6 rounded-r-2xl hover:bg-very-dark-gray"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
                  <path
                    fill="none"
                    stroke="#FFF"
                    strokeWidth="3"
                    d="M2 1l6 6-6 6"
                  />
                </svg>
              </button>
            </form>
            {error ? (
              <h1 className="text-red-600 bg-red-100 p-4 rounded-2xl">
                {error?.message}
              </h1>
            ) : (
              !isLoading && (
                <ul className="bg-white w-full rounded-2xl text-center p-3 shadow-2xl lg:text-left lg:grid lg:grid-flow-col lg:grid-cols-4 lg:w-3/4">
                  <li className="m-2 lg:m-5">
                    <h2 className="text-dark-gray tracking-widest text-xs font-bold">
                      IP ADDRESS
                    </h2>
                    <p className="lg:text-2xl font-medium mt-1 lg:mt-2">
                      {geo?.ip}
                    </p>
                  </li>
                  <li className="m-2 lg:m-5 lg:border-l-2 lg:pl-5">
                    <h2 className="text-dark-gray tracking-widest text-xs font-bold">
                      LOCATION
                    </h2>
                    <p className=" lg:text-2xl font-medium mt-1 lg:mt-2">
                      {`${geo?.location?.city || ''}${
                        geo?.location?.region ? `, ${geo.location?.region}` : ''
                      } ${geo?.location?.postalCode || ''}`}
                    </p>
                  </li>
                  <li className="m-2 lg:m-5 lg:border-l-2 lg:pl-5">
                    <h2 className="text-dark-gray tracking-widest text-xs font-bold">
                      TIMEZONE
                    </h2>
                    <p className=" lg:text-2xl font-medium mt-1 lg:mt-2">
                      UTC {geo?.location?.timezone}
                    </p>
                  </li>
                  <li className="m-2 lg:m-5 lg:border-l-2 lg:pl-5">
                    <h2 className="text-dark-gray tracking-widest text-xs font-bold">
                      ISP
                    </h2>
                    <p className=" lg:text-2xl font-medium mt-1 lg:mt-2">
                      {geo?.isp}
                    </p>
                  </li>
                </ul>
              )
            )}
          </div>
        </div>
        <Map
          position={[geo?.location.lat || 51.505, geo?.location.lng || -0.09]}
        />
      </div>
      {isLoading && <Spinner />}
    </div>
  );
};
export default App;
