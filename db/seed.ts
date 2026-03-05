import * as dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import sampleData from "./sample-data";

async function main() {
  const adapter = new PrismaNeon({connectionString: process.env.DATABASE_URL!,});
  const prisma = new PrismaClient({ adapter });
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: sampleData.products,
  });
  console.log("Database seeded successfully.");
}

main();