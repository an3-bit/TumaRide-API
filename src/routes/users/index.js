const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const notificationRoute = require("./notification.route");
const packageRoute = require("./package.route");

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
  {
    path: "/notification",
    route: notificationRoute,
  },
  {
    path: "/package",
    route: packageRoute,
  },
];

routes.forEach((item) => {
  router.use(item.path, item.route);
});

module.exports = router;
