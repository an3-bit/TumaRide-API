const express = require("express");
const authRoute = require("./auth.route");

const userRoute = require("./user.route");

const router = express.Router();

let routes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

routes.forEach((item) => {
  router.use(item.path, item.route);
});

module.exports = router;
