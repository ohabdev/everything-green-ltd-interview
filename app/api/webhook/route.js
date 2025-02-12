import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const SECRET_KEY = process.env.WEBHOOK_SECRET || "sdjflsdjlf";

const DB_PATH = path.resolve(process.cwd(), "db.json");

const verifySignature = async (req) => {
  const signature = req.headers.get('X-Signature');
  if (!signature) return false;

  const payload = await req.json();
  const expectedSignature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(payload)
    .digest("hex");

  return signature === expectedSignature;
};

const saveToFile = (data) => {
  let db = { events: [] };
  
  if (fs.existsSync(DB_PATH)) {
    const fileData = fs.readFileSync(DB_PATH, "utf-8");
    db = JSON.parse(fileData);
  }

  db.events.push(data);
  
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
};

export const POST = async (req, res) => {
    
    try {
        if (req.method !== "POST") {
            return new Response("Method Not Allowed.", { status: 405 })
          }
        
          if (!verifySignature(req)) {
            return new Response("Invalid Signature.", { status: 401 })
          }
        
          const { eventType, data } = await req.json();
          if (!eventType || !data) {
            return new Response("Invalid Payload.", { status: 400 })
          }
        
          saveToFile({ eventType, data, receivedAt: new Date().toISOString() });
                
          return NextResponse.json({ success: true, message: "Received" });
        
    } catch (error) {
        return new Response("Fails to create webhook.", { status: 500 })
    }
  }