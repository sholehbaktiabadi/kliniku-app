import { jwtDecode } from "jwt-decode";

const getDecodedToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Gagal mendekode token:", error);
    return null;
  }
};

export const isSessionExpired = (token: string) => {
  const decodedToken = getDecodedToken(token);

  if (!decodedToken || !decodedToken.exp) {
    return true;
  }
  const expirationTime = decodedToken.exp;
  const currentTime = Date.now() / 1000;
  return currentTime >= expirationTime;
};