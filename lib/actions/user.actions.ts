"use server";

import { auth, signIn, signOut } from "@/auth";
import { paymentMethodSchema, shippingAddressSchema, signInFormSchema, signUpFormSchema } from "@/lib/validators";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "@/lib/utils";
import { ShippingAddressProps } from "@/types";
import z from "zod";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

export async function signOutUser() {
  await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const userData = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = userData.password;

    userData.password = hashSync(userData.password, 10);

    await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
    });

    await signIn("credentials", {
      email: userData.email,
      password: plainPassword,
    });

    return { success: true, message: "User signed up successfully" };
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    return user;
  } catch {
    throw new Error('User not found');
  }
}

export async function updateUserAddress(data: ShippingAddressProps) {
  try {
    const session = await auth();

    const userId = session?.user?.id;

    const currentUser = userId ? await getUserById(userId) : null;

    if (!currentUser) {
      throw new Error('User not found');
    }

    const address = shippingAddressSchema.parse(data);
    
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    });
    
    return {success: true, message: "Address updated successfully"};
  } catch (error){
    return {success: false, message: formatError(error)};
  }
}

export async function updateUserPaymentMethod(data: z.infer<typeof paymentMethodSchema>) {
  try {
    const session = await auth();

    const userId = session?.user?.id;

    const currentUser = userId ? await getUserById(userId) : null;

    if (!currentUser) {
      throw new Error('User not found');
    }

    const paymentMethod = paymentMethodSchema.parse(data);
    
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });
    
    return {success: true, message: "Payment method updated successfully"};
  } catch (error) {
    return {success: false, message: formatError(error)};
  }
}