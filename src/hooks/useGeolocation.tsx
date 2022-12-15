import { useState, useEffect } from 'react';

interface Geolocation {
  ip: string;
  location: Location;
  as: As;
  isp: string;
}
interface Location {
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
  geonameId: number;
}
interface As {
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
}

const useGeolocation = () => {
  const [error, setError] = useState<Error>();
  const [geo, setGeo] = useState<Geolocation>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchGeo = async (
    value = localStorage.getItem('ip'),
    isHostname = false
  ) => {
    if (value === localStorage.getItem('ip') && localStorage.getItem('geo')) {
      setGeo(JSON.parse(localStorage.getItem('geo') as string) as Geolocation);
      return;
    }
    if (!value) {
      setError(new Error('IP information not found'));
      return;
    }

    const apiKey = import.meta.env.VITE_API_KEY as string;
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&${
      isHostname ? 'domain' : 'ipAddress'
    }=${value}`;

    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetch(url);

      setIsLoading(false);

      if (response.ok) {
        const data = (await response.json()) as Geolocation;

        setGeo(data);

        if (value === localStorage.getItem('ip')) {
          localStorage.setItem('geo', JSON.stringify(data));
        }
      } else
        setError(new Error('Geolocation information could not be fetched'));
    } catch (err) {
      setIsLoading(false);
      setError(err as Error);
    }
  };

  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        setIsLoading(true);
        setError(undefined);

        const response = await fetch('https://api.ipify.org/');

        if (response.ok) {
          const data = await response.text();
          setIsLoading(false);
          localStorage.setItem('ip', data);
        } else setError(new Error('IP information could not be fetched'));
      } catch (err) {
        setIsLoading(false);
        setError(err as Error);
      }
    };

    const fetchData = async () => {
      if (!localStorage.getItem('ip')) await fetchUserIp();
      await fetchGeo();
    };

    fetchData();
  }, []);

  return { geo, isLoading, error, fetchGeo, setError };
};

export default useGeolocation;
