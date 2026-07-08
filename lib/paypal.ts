const base = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";
export const paypal = {};

async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env;

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString(
    "base64",
  );
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  });

  if (res.ok) {
    const data = await res.json();
    return data.access_token;
  } else {
    const error = await res.text();
    throw new Error(error);
  }
}
export { generateAccessToken };
