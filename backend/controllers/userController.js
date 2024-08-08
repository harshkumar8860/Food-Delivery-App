const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
    // console.log(req.body)
    // res.send("post success");

    // extracting the crediantials from body
    const { email, password, name } = req.body;
    // checking email in the usermodel
    const emailExists = await UserModel.findOne({ email: email });
    // sending response to frontend if email already exists
    if (emailExists) {
        return res.status(400).send("User Already Exists");
    }
    // cryptography of password 10 times like
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // creating a new user in db
    const newUser = new UserModel({
        name: name,
        email: email,
        password: hashPassword,
    });

    // saving a user in DB
    const savedUser = newUser.save();

    // create payload then Generate an access token
    const token = jwt.sign({ userId: savedUser._id }, "randomsecret");
    return res.status(200).json({
        user: newUser,
        token: token,
    });
}

const userLogin = async (req, res) => {
    // console.log(req.body)
    // res.send("post success");

    // extracting the crediantials from body
    const { email, password, name } = req.body;
    // checking user in the DB
    const user = await UserModel.findOne({ email: email });
    if (!user) {
        return res.status(400).send("User Not Found, Please Sign Up!");
    }
    //checking password in DB
    const isPasswordMatchingFromDb = await bcrypt.compare(password, user.password);
    // giving jwt token to the user
    if (isPasswordMatchingFromDb) {
        const token = jwt.sign({ userId: user._id }, "randomsecret");
        return res.status(200).json({
            user: user,
            token: token,
        });
    }
    //if password doesn't match return
    return res.status(401).send("Incorrect login crediantials");
}

module.exports = { userRegister, userLogin }