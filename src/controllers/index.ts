import {Elysia} from "elysia";
import { AdminAuthController } from "./admin/user-authcontroller";
import {UserController} from "./admin/user-controller"

export const AdminRouter = new Elysia({
  prefix:"/api/admin",
})
.use(AdminAuthController)
.use(UserController)