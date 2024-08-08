import { Elysia, t } from "elysia";
import { jwt } from "../../lib/jwt";
import { UserModel } from "../../models/admin/user";

export const AdminAuthController = new Elysia({
  prefix: "/auth",
}).post(
  "/login",
  async ({ set, body, cookie: { auth } }) => {
    try {
      const { email, password } = body;
      const admin = await UserModel.findOne({
        email,
        password,
        role: "admin",
      });
      if (!admin) {
        set.status = 400;
        return {
          message: "Invalid credentials",
          ok: false,
        };
      }
let userData= await UserModel.findOne({email:email},"-password -__v -createdAt -updatedAt")
      let token = jwt.sign({ id: admin._id }, "");

      set.status = 200;
      return {
        message: "Logged in successfully",
        token,
        userData,
        ok: true,
      };
    } catch (error: any) {
      set.status = 400;
      return {
        message: error.message,
        ok: false,
      };
    }
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  }
);
