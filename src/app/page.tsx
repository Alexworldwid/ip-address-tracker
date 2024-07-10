"use client";

import BackgroundImage from "./components/BackgroundImage";
import { useCallback, useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import { IPData } from "./utils/types";
import InputIpInfo from "./components/InputIpInfo";
import dynamic from "next/dynamic";

// Dynamic import for Map component to avoid SSR issues
const Map = dynamic(() => import('./components/Map'), {
  ssr: false
});


export default function Home() {
  const [ip, setIp] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const { data: ipData, error, loading } = useFetch<IPData>(url);
  const [position, setPosition] = useState<[number, number]>([6.52563, 3.37761]);

  // fetch the data once url changes
  const handleFetchData = useCallback(() => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const constructedUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`;
    console.log("Constructed URL: ", constructedUrl);
    setUrl(constructedUrl);
  }, [ip]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData])

  useEffect(() => {
    if (ipData && ipData.location) {
      setPosition([ipData.location.lat, ipData.location.lng]);
    }
  }, [ipData]);

  return (
    <main className="min-h-screen relative">
      <BackgroundImage />
      <InputIpInfo 
      ip={ip} 
      setIp={setIp} 
      handleFetchData={handleFetchData} 
      ipData={ipData} 
      loading={loading} 
      error={error} />
      <Map position={position} ipData={ipData} />
    </main>
  );
}
