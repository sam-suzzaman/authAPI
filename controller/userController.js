const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const JWTGenerator = require("../utils/JWTGenerator");
// const JWTGenerator = require("../utilities/JWT_Generator");

// user Signup/Registration Controller
const registerUserHandler = async (req, res) => {
    const user = req.body;
    try {
        const isEmailExist = await UserModel.findOne({ email: user.email });
        if (isEmailExist) {
            res.status(201).json({
                status: false,
                message: "Registration failed",
                result: "Email already exists",
            });
        } else {
            await UserModel.create(user);

            res.status(201).json({
                status: true,
                message: "Registration Successfull",
            });
        }
    } catch (error) {
        console.log(`register/signup error is: ${error}`);
        res.status(400).json({
            status: false,
            message: "something wrong",
            result: error.message,
        });
    }
};

// user login handler
const userLoginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            // checking user identity: exist or not
            let isUserExist = await UserModel.findOne({ email: email });
            if (isUserExist) {
                // checking password
                const isMatched = await bcrypt.compare(
                    password,
                    isUserExist.password
                );
                if (email === isUserExist.email && isMatched) {
                    // JWT Token(string,expireTime)
                    const token_payload = {
                        email: isUserExist.email,
                        role: isUserExist.role,
                    };
                    const jwt_token = JWTGenerator(token_payload, "1h");

                    // Convert Mongoose object to plain JavaScript object
                    let userObj = isUserExist.toObject();
                    delete userObj.password;

                    res.send({
                        status: true,
                        message: "Login Successfull",
                        token: jwt_token,
                        result: userObj,
                    });
                } else {
                    res.send({
                        status: false,
                        message: "Email or Password is not valid",
                    });
                }
            } else {
                res.send({
                    status: false,
                    message: "Email is not found",
                });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.send({
            status: false,
            message: "something went wrong",
            result: error?.message,
        });
    }
};

module.exports = { registerUserHandler, userLoginHandler };
