import "../firebase";
import { getFirestore } from "firebase-admin/firestore";
import { JwtService } from "../jwt/jwt.service";

export class UserService {
  readonly firestore = getFirestore();

  constructor(readonly jwtService: JwtService) {}

  async getByEmail(email: string) {
    const formatEmail = email.trim().toLowerCase();
    const userDoc = await this.firestore
      .collection("Users")
      .where("email", "==", formatEmail)
      .get();
    if (userDoc.empty) {
      return null;
    }
    const userData = userDoc.docs.map((doc) => doc.data())[0];
    const token = this.jwtService.sign(userData);
    return { user: userData, token };
  }

  async createUser(email: string) {
    const formatEmail = email.trim().toLowerCase();
    const existingUser = await this.getByEmail(formatEmail);
    if (existingUser) {
      return null;
    }
    const id = this.firestore.collection("Users").doc().id;
    const userData = {
      id,
      email,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const token = this.jwtService.sign(userData);
    await this.firestore.collection("Users").doc(id).set(userData);
    return { user: userData, token };
  }

  async renew(token: string) {
    const decoded = this.jwtService.verify(token);
    if (!decoded) {
      return null;
    }
    const data = JSON.parse(JSON.stringify(decoded));
    const user = {
      id: data.id,
      email: data.email,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
    const renewToken = this.jwtService.sign(user);
    return { user, token: renewToken };
  }
}
