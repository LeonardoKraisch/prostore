import { generateAccessToken, paypal } from "../lib/paypal";

test("generates token from paypal", async () => {
  const token = await generateAccessToken();
  console.log(token);
  expect(token).toBeDefined();
  expect(typeof token).toBe("string");
  expect(token.length).toBeGreaterThan(0);
});

test("creates order with paypal", async () => {
  // const token = await generateAccessToken();
  const price = 20.0;
  const order = await paypal.createOrder(price);
  console.log(order);
  expect(order).toBeDefined();
  expect(typeof order).toBe("object");
  expect(order.id).toBeDefined();
  expect(order.status).toBe("CREATED");
});

test("simulate capturing a payment from an order", async () => {
  const orderId = "100";

  const mockCapturePayment = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    });

  const order = await paypal.capturePayment(orderId);

  expect(order.status).toBe("COMPLETED");

  mockCapturePayment.mockRestore();
});
