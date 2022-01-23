import { JwtPayload } from 'jsonwebtoken';

export default interface JwtUserPayload extends JwtPayload {
  userId: number;
}
