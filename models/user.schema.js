import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto"


const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, "Name is required"],
            maxLength : [50, "Name must be less than 50"]
        },
        email : {
            type : String,
            required : [true, "Email is required"],
            unique : true
        },
        password : {
            type : String,
            required : [true, "Password is required"],
            minLength : [8, "password must contain atleast 8 characters"],
            // this field will not come when we make mongodb query
            select : false
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,

    },
    {
        timestamps: true
    }
);

//encrypt the password - hooks
userSchema.pre("save", async function(next){
    if(!this.modified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export default mongoose.model("User", userSchema)