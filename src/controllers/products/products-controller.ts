import Elysia, { t } from "elysia";

export const ProductController = new Elysia({
  prefix: "/product",
}).post(
  "/create",
  async ({ set, body }) => {
    try {
      const { productName, productCode, model, brand, description }: any = body;
    } catch (error: any) {
      set.status = 400;
      return {
        ok: false,
        message: error.message,
      };
    }
  },
  {
    body: t.Object({
      productName: t.String(),
      productCode: t.String(),
      model: t.String(),
      brand: t.String(),
      description: t.String(),
    }),
    detail: {
      tags: ["Product"],
      description: "Create a new product",
      summary: "Create a new product",
    },
  }
);
