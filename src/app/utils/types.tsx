export interface Location {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: number;
    timezone: string;
    geonameId: number;
}

export interface AS {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
}

export interface IPData {
    ip: string;
    location: Location;
    domains: string[];
    as: AS;
    isp: string;
}
