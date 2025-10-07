export interface PolyclinicDetail {
  id: number;
  poly: {
    id: number;
    name: string;
    image: string;
  };
  clinic: {
    id: number;
    name: string;
    isVerified: boolean;
    lon: string;
    lat: string;
    images: string[];
    paymentSupports: string[];
    phone: string | null;
    adress: string;
    rating: number | null;
    imageProfile: string;
    vision: string | null;
  };
  queues: {
    status: string;
    sequence: number;
  }[];
  totalRegistrant: number;
}
