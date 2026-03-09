'use server';
import * as dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { convertToPlaneObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from '../constants';

export async function getLatestProducts() {
  const adapter = new PrismaNeon({connectionString: process.env.DATABASE_URL!,});
  const prisma = new PrismaClient({ adapter });

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {createdAt: 'desc'},
  });
  return convertToPlaneObject(data);
}