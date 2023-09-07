import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const client = new SESClient({
  region: "us-east-2", // Change it to match your region
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const input = {
  // SendEmailRequest
  Source: "", // required
  Destination: {
    // Destination
    ToAddresses: [
      // AddressList
    ],
  },
  Message: {
    // Message
    Subject: {
      // Content
      Charset: "UTF-8",
      Data: "Test email", // required
    },
    Body: {
      // Body
      Html: {
        Data: "<p>This is the body of the test message</p>", // required
      },
    },
  },
};

/* GET home page. */
router.post("/send-email", async (req, res) => {
  input.Destination.ToAddresses = [req.body.addresses];
  input.Source = 'support@piknpac.com';
  input.Message.Subject.Data = req.body.subject;
  input.Message.Body.Html.Data = req.body.body;

  const command = new SendEmailCommand(input);

  try {
    const response = await client.send(command);
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
