import Elysia, { t } from "elysia";
import { UserModel } from "../../models/admin/user";
import {jwt} from "../../lib/jwt";
import {CreateUserDto} from "../../dto/user-types" 


export const UserController = new Elysia({
  prefix: "/users",

})
  .post(
    "/create",
    async ({ set, body }) => {
      try {
        const {
          email,
          mobileNumber,
          password,
          role,
          userid,
          username,
        } = body;

        const existing = await UserModel.findOne({
          userid,
          mobileNumber,
        });

        if (existing) {
          set.status = 400;
          return {
            message: "Employee already exists",
            ok: false,
          };
        }


        const newUser = new UserModel({
          email,
          userid,
          username,
          mobileNumber,
          password,
          role
        });
        await newUser.save();

        set.status = 200;
        return {
          message: "Employee created successfully",
          ok: true,
        };
      } catch (error: any) {
        set.status = 400;

        console.error(error);
        return {
          message: error.message,
          ok: false,
        };
      }
    },
    {
      detail: {
        tags: ["User Admin"],
        description: "Create a new User",
      },
      body: CreateUserDto,
    }
  )


  .get(
    "/all",
    async ({ query, set }) => {
      try {
        let { page, limit, role, q } = query;
        let users: any = null;
        let count = 0;

        const fetchQuery: any = {};

        if (role && role !== "all") {
          fetchQuery.role = role;
        }

        if (q) {
          fetchQuery.$or = [
            {
              username: {
                $regex: q,
                $options: "i",
              },
            },
            {
              userid: {
                $regex: q,
                $options: "i",
              },
            },
            {
              mobileNumber: {
                $regex: q,
                $options: "i",
              },
            },
          ];
        }

        if (page && limit) {
          let _page = parseInt(page);
          let _limit = parseInt(limit);

          users = await UserModel.find(fetchQuery)
            .skip((_page - 1) * _limit)
            .limit(_limit)
            .lean();

          count = await UserModel.countDocuments(fetchQuery);
        } else {
          users = await UserModel.find(fetchQuery,"-password -createdAt -updatedAt ")
            .sort({ createdAt: -1 })
            .lean();
          count = await UserModel.countDocuments(fetchQuery);
        }

        set.status = 200;
        return {
          message: "Users fetched successfully",
          ok: true,
          users,
          total: count,
        };
      } catch (error: any) {
        set.status = 400;

        console.error(error);
        return {
          message: error.message,
          ok: false,
        };
      }
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
        limit: t.Optional(t.String()),
        role: t.Optional(t.String()),
        q: t.Optional(t.String()),
      }),
      detail: {
        tags: ["Employee Admin"],
        description: "Get all users",
      },
    }
  )



  .get(
    "/get/:id",
    async ({ params, set }) => {
      try {
        const { id } = params;
        const user: any = await UserModel.findOne(
          {
           _id: id,
          },
          "-password  -createdAt -updatedAt"
        );

        if (!user) {
          set.status = 400;
          return {
            message: "User not found",
            ok: false,
          };
        }
        set.status = 200;
        return {
          message: "User fetched successfully",
          ok: true,
          data: user,
        };
      } catch (error: any) {
        set.status = 400;

        console.error(error);
        return {
          message: error.message,
          ok: false,
        };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["User Admin"],
        description: "Get User by id",
      },
    }
  )