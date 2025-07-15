const express = require("express");
// const adminRoute = require("./admin");
const userRoute = require("./users");

const router = express.Router();

let routes = [
  // {
  //   path: "/admin",
  //   route: adminRoute,
  // },
  {
    path: "/user",
    route: userRoute,
  },
];

routes.forEach((item) => {
  router.use(item.path, item.route);
});

module.exports = router;
