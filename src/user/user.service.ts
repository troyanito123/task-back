import { JwtService } from "../jwt/jwt.service";

export abstract class UserService {
  abstract jwtService: JwtService;

  abstract getByEmail(
    email: string
  ): Promise<{ user: any; token: string } | null>;

  abstract createUser(
    email: string
  ): Promise<{ user: any; token: string } | null>;

  abstract renew(token: string): Promise<{ user: any; token: string } | null>;
}
