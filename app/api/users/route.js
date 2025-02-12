
import User from "@models/user";
import { connectToDB } from "@utils/database";
const bcrypt = require('bcrypt');
import { NextResponse } from "next/server";
import {isAuthenticate} from "../../../middleware/middleware"

// fetch all users
export const GET = async (req) => {
    try {
        
        if(!await isAuthenticate(req)){
            return new Response("Unauthorized, please provide a valid token.", { status: 401 })
        }

        await connectToDB()

        const users = await User.find({},{
            "password": 0, 
        });

        return NextResponse.json({ status: 201, data: users });
    } catch (error) {
        return new Response("Failed to fetch all users", { status: 500 })
    }
}


// create new user
export const POST = async (req) => {

    const userData = await req.json();
    try {

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const createUserParams = {
            name: userData.name,
            email: userData.email,
            password: hashedPassword
        }

        await connectToDB();

        const checkedUser = await User.findOne({"email": userData.email})

		if (checkedUser) {
            return new Response("User already exists.", { status: 409 });
        }

        const newUser = new User(createUserParams);
        await newUser.save();
        const user = {
            name: newUser.name,
            email: newUser.email,
        }
        return NextResponse.json({ status: 201, data: user });
    } catch (error) {
        return new Response("Failed to create a new user", { status: 500 });
    }
}


