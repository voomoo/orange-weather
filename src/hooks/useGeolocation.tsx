import { atom, useAtom } from "jotai";
import { useState, useEffect } from "react";

export const latAtom = atom<number | null>(null);
export const longAtom = atom<number | null>(null);

export const useGeolocation = () => {
    const [error, setError] = useState<string | null>(null);
    const lat = useAtom(latAtom);
    const long = useAtom(longAtom);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    lat[1](position.coords.latitude);
                    long[1](position.coords.longitude);
                },
                () => {
                    setError("Unable to retrieve your location");
                }
            );
        }
    }, []);

    return { error };
};
