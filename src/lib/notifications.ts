const TWILIO_BASE_URL = "https://api.twilio.com/2010-04-01";

type TwilioConfig = {
  sid?: string;
  authToken?: string;
  smsFrom?: string;
  whatsappFrom?: string;
};

function getTwilioConfig(): TwilioConfig {
  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_FROM_NUMBER,
    WHATSAPP_BUSINESS_NUMBER,
  } = process.env;
  return {
    sid: TWILIO_ACCOUNT_SID,
    authToken: TWILIO_AUTH_TOKEN,
    smsFrom: TWILIO_FROM_NUMBER,
    whatsappFrom: WHATSAPP_BUSINESS_NUMBER,
  };
}

async function sendTwilioMessage(payload: URLSearchParams) {
  const { sid, authToken } = getTwilioConfig();
  if (!sid || !authToken) {
    console.log("[Notification] Missing Twilio credentials, skipping send.", Object.fromEntries(payload));
    return;
  }

  try {
    const response = await fetch(`${TWILIO_BASE_URL}/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("[Notification] Twilio API responded with error:", errorText);
    }
  } catch (error) {
    console.error("[Notification] Failed to send Twilio message:", error);
  }
}

export async function sendWhatsappNotification(toPhone: string, message: string) {
  const { whatsappFrom } = getTwilioConfig();
  if (!whatsappFrom) {
    console.log(`[Notification] WhatsApp to ${toPhone}: ${message}`);
    return;
  }

  const payload = new URLSearchParams();
  payload.set("To", toPhone.startsWith("whatsapp:") ? toPhone : `whatsapp:${toPhone}`);
  payload.set("From", whatsappFrom);
  payload.set("Body", message);

  await sendTwilioMessage(payload);
}

export async function sendSmsNotification(toPhone: string, message: string) {
  const { smsFrom } = getTwilioConfig();
  if (!smsFrom) {
    console.log(`[Notification] SMS to ${toPhone}: ${message}`);
    return;
  }

  const payload = new URLSearchParams();
  payload.set("To", toPhone);
  payload.set("From", smsFrom);
  payload.set("Body", message);

  await sendTwilioMessage(payload);
}


