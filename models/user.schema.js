import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";

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
)

export default mongoose.model("User", userSchema)