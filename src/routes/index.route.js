import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.send(`Welcome ${req.oidc.user.name}`);
  } else {
    res.send(`Landing Page`);
  }
});

export default router;
