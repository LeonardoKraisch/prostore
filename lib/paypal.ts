const base = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";
export const paypal = {
  createOrder: async function createOrder(price: number) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "BRL",
              value: price,
            },
          },
        ],
      }),
    });
    const data = await handleResponse(res);
    return data;
  },
  capturePayment: async function capturePayment(orderId: string) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await handleResponse(res);
    return data;
  },
};

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

  const data = await handleResponse(res);
  return data.access_token;
}

async function handleResponse(res: Response) {
  if (res.ok) return res.json();
  else {
    const error = await res.text();
    throw new Error(error);
  }
}

export { generateAccessToken };
