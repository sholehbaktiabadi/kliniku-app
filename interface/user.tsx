import { JwtPayload } from "jwt-decode";

export interface UserSession extends JwtPayload {
  id: number
  name: string
  identifier: string
  email: string
  phone: string
}