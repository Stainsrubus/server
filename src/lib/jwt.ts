import {sign,verify} from "jsonwebtoken"

export const jwt = {
  sign: (payload: any, key: string) => {
    return sign(payload, process.env.JWT_SECRET || "secret", {
      expiresIn: process.env.JWT_EXPIRE,
    });
  },
  verify: (token: string) => verify(token, process.env.JWT_SECRET || "secret"),
};
