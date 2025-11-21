import { Router } from "express";
import verifyRole from "../middleware/auth.middleware.js";
import { userProfile, userRole } from "../controllers/user.controller.js";
import {
  createProduct,
  readProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/profile", userProfile);
router.post("/role", verifyRole(["Admin"]), userRole);

router.post("/product", verifyRole(["User"]), createProduct);
router.get("/product", verifyRole(["User", "Partner"]), readProduct);

export default router;
