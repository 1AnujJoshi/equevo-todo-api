const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const todoApi = require("../../../controllers/api/v1/todo_api");
router.get("/", (req, res) => {
  return res.status(200).json({
    message: `
    - /signin (send email default@email.com and password as Default@2022 in body through postman)
    `,
  });
});
// router.use('/question', require('./question'));
// router.use('/option', require('./option'));
router.post("/signin", todoApi.signIn);
router.post("/create-todo", auth, todoApi.createTodo);
router.patch("/update-todo/:id", auth, todoApi.updateTodo);
router.get("/todo", auth, todoApi.getTodos);
router.delete("/todo/:id", auth, todoApi.deleteTodo);

module.exports = router;
