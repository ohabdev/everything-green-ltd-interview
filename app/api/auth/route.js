import User from "@models/user";
import { connectToDB } from "@utils/database";
const jwt = require('jsonwebtoken');
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export const POST = async (req) => {

    const userData = await req.json();

    if(userData?.email == undefined || userData?.password == undefined){
        return new Response("Please provide email & password", { status: 400 });
    }

    try {
       
        await connectToDB();
        const userExist = await User.findOne({ "email": userData.email })
        
        if(userExist){
            const passwordMatch = await bcrypt.compare(userData.password, userExist.password);
            if(passwordMatch){
                const userData = {
                    id: userExist.id,
                    email: userExist.email
                };
                const jwtPayload = userData;
                const jwtData = {
                    expiresIn: process.env.JWT_TIMEOUT_DURATION
                };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(jwtPayload, secret, jwtData);
                const userInfo = {
                    name: userExist.name,
                    email: userExist.email,
                    token: token
                }
                return NextResponse.json({ status: 201, data: userInfo });
            } else {
                return new Response("Password not matched", { status: 400 });
            }
        } else {
            return new Response("Email not found", { status: 400 });
        }
        
    } catch (error) {
        console.log(error);
        return new Response("Failed to login", { status: 500 });
    }
}
