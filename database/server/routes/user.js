const express = require("express");

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

// const { chat } = require("../controller/chat");

const router = express.Router();

///api/v1/user
router.route("/").get(getUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser).get(getUser);
// router.route("/chat/ccc/ccc").post(chat);
//route
//  router.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: "get all users",
//     });
// });

// router.post("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: "post create user",
//     });
// });
// router.get("/:id", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: `${req.params.id} id-t get user`,
//     });
// });
// router.put("/:id", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: `${req.params.id} id-t update user`,
//     });
// });
// router.delete("/:id", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: `${req.params.id} id-t delete user`,
//     });
// });

module.exports = router;
