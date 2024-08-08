import {model, Schema} from "mongoose"

const UserSchema = new Schema(
    {
        username:{
            type:String,
        },
        role:{
            type:String,
            enum:["admin", "user"],
        },
        email:{type:String,unique:true},
        password:{type:String},
        mobileNumber:{type:String},
        userid:{type:String}
    },
    {timestamps:true},
);
export const UserModel = model("user", UserSchema);