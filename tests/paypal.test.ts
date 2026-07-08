import { generateAccessToken } from "../lib/paypal";

test("generates token from paypal", async () => {
  const token = await generateAccessToken();
  console.log(token);
  expect(token).toBeDefined();
  expect(typeof token).toBe("string");
  expect(token.length).toBeGreaterThan(0);
});
