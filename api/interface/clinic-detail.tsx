export interface ClinicDetail {
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
  polyclinics: {
    id: number;
    poly: {
      id: number;
      name: string;
      image: string;
    };
  }[];
  schedules: {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    isToday: boolean;
  }[];
  distance: string;
}