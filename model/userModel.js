const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            required: [true, "User email is required"],
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Password is required"],
        },
    },
    {
        timestamps: true,
    }
);

// To Hashed Password
UserSchema.pre("save", async function (next) {
    const password = this.password; // accessing password

    const salt = await bcrypt.genSalt(16); //generating salt
    const hashedPassword = bcrypt.hashSync(password, salt);

    this.password = hashedPassword; // reasign hashed password

    next();
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
