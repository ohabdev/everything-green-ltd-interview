import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import {isAuthenticate} from "../../../../middleware/middleware"


export const GET = async (req, { params }) => {
    try {
        if(!await isAuthenticate(req)){
            return new Response("Unauthorized, please provide a valid token.", { status: 401 })
        }
        await connectToDB()
        const user = await User.findOne({"_id":params.id}, {
            "password": 0,
        });

        return NextResponse.json({ status: 201, data: user });
    } catch (error) {
        return new Response("Failed to fetch user", { status: 500 })
    }
}
