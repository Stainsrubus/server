import { t } from "elysia";

export const CreateUserDto = t.Object({
  username: t.String({
    examples: ["Rajan"],
    description: "The name of the employee",
  }),
  userid: t.String({
    examples: ["123456"],
    description: "The employee id",
  }),
  email: t.String({
    examples: ["rajan@gmail.com"],
    description: "The email of the employee",
  }),
  mobileNumber: t.String({
    examples: ["9876543210"],
    description: "The mobile number of the employee",
  }),
 
  password: t.Optional(
    t.String({
      examples: ["password"],
      description: "The password of the employee",
    })
  ),
  role: t.Optional(
    t.String({
      examples: ["Manager", "Employee"],
      description: "The role of the employee",
    })
  ),
});
