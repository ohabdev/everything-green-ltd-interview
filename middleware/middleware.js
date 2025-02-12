
import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken');

export async function isAuthenticate(req) {
    try {
        const token = req.headers.get('Authorization');

    if (!token) {
        return false;
    }

    if (token) {
        return jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return false;
            }
            return true;
        });
    }
    } catch (error) {
     console.log(error)   
    }
  }