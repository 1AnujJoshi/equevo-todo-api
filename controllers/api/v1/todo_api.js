const Todo = require("../../../models/todo");
const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

// sign In controller
module.exports.signIn = async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).populate("todos");
    //if user is not present create one and send token in response
    if (!user && email == "default@email.com" && password == "Default@2022") {
      const user = await User.create({
        email: email,
        password: password,
      });
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30m",
        }
      );
      // save user token
      user.token = token;
      //Creating jwt token
      res.status(201).json({
        success: true,
        message:
          "Successfully signed In || copy the token and pass it along with the other requests in header/body!!",
        email: user.email,
        token: user.token,
      });
    }
    //if user is present send token in response
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email: email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "30m",
      }
    );
    // save user token and send in response
    user.token = token;
    res.status(201).json({
      success: true,
      message:
        "Successfully signed In || copy the token and pass it along with the other requests in header / body !!",
      email: user.email,
      token: user.token,
    });
  } catch (err) {
    console.log("********", err);
    return res.status(500).json({
      message:
        "Internal Server Error || check if credentials are as follows:- email- default@email.com password-Default@2022 and are sent through the body ",
    });
  }
};

//create todo
module.exports.createTodo = async function (req, res) {
  try {
    const user = await User.findOne({ email: "default@email.com" });
    const todo = await Todo.create(req.body);
    console.log(todo);
    user.todos.push(todo);
    user.save();
    return res.status(200).json({
      message: "Your todo is successfully created!!",
      todo,
    });
  } catch (err) {
    console.log("********", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// update todo
module.exports.updateTodo = async function (req, res) {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        date: req.body.date,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Your todo is successfully updated!!",
      todo,
    });
  } catch (err) {
    console.log("********", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//delete todo
module.exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    await todo.delete();
    return res.status(200).json({
      status: "success",
      message: "Todo deleted successfully!!",
      todo,
    });
  } catch (err) {
    console.log("********", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//get all the todos in paginated form
module.exports.getTodos = async function (req, res) {
  try {
    let pageSize = req.query.pageSize || req.body.pageSize || 3;
    let page = req.query.page - 1 || req.body.page - 1 || 0;
    let fromDate = req.body.fromDate || req.query.fromDate;
    let toDate = req.body.toDate || req.query.toDate;

    // filter by date and use pagination
    const todos = await Todo.find({
      createdAt: { $gte: Date(fromDate), $lt: Date(toDate) },
    })
      .limit(pageSize)
      .skip(pageSize * page);

    return res.status(200).json({
      message: "List of Todos",
      todos,
    });
  } catch (err) {
    console.log("********", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
