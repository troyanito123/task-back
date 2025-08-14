import { sign, verify, SignOptions } from "jsonwebtoken";

export class JwtService {
  constructor(private secret: string, private expiresIn: unknown) {}

  sign(payload: object) {
    return sign(payload, this.secret, {
      expiresIn: this.expiresIn as SignOptions["expiresIn"],
    });
  }

  verify(token: string) {
    try {
      const payload = verify(token, this.secret);
      return payload;
    } catch (error) {
      return null;
    }
  }
}
