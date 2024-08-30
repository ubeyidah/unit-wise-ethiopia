import { User } from "@/context/AuthProvider";
import { redirect } from "react-router-dom";

export const requirePublicRoute = (user: User | null | undefined) => {
  if (
    user &&
    user.isPaid &&
    user.phoneNumber &&
    !user.isBlock &&
    user.studyType &&
    user.gender
  ) {
    throw redirect("/dashboard");
  }
};

export const requireSignInRoute = (user: User | null | undefined) => {
  if (user && user.isBlock) {
    throw redirect("/block");
  }
  if (
    user &&
    !user.isBlock &&
    (!user.studyType ||
      !user.phoneNumber ||
      !user.gender ||
      !user.paymentImage ||
      !user.status)
  ) {
    throw redirect("/take-info");
  }
  if (user && !user.isPaid) {
    throw redirect("/payment-verify");
  }
  if (user && !user.isBlock && user.isPaid) {
    throw redirect("/dashboard");
  }
};

export const requireAuth = (user: User | null | undefined) => {
  if (
    !user ||
    !user.isPaid ||
    user.isBlock ||
    !user.studyType ||
    !user.phoneNumber ||
    !user.gender ||
    !user.paymentImage ||
    !user.status
  ) {
    throw redirect("/signin?message=You must sign in first");
  }
};

export const requireBlockRoute = (user: User | null | undefined) => {
  if (!user) {
    throw redirect("/signin?message=You must sign in first");
  }
  if (user?.isBlock) {
    return null;
  }
  throw redirect("/signin");
};

export const requireTakeMoreInfo = (user: User | null | undefined) => {
  if (!user) {
    throw redirect("/signin?message=You must sign in first");
  }
  if (user.isBlock) {
    throw redirect("/block");
  }
  if (
    !user?.studyType ||
    !user.phoneNumber ||
    !user.gender ||
    !user.paymentImage ||
    !user.status
  ) {
    return null;
  }

  throw redirect("/signin");
};

export const requirePaymentVerify = (user: User | null | undefined) => {
  if (!user) {
    throw redirect("/signin?message=You must sign in first");
  }
  if (user.isBlock) {
    throw redirect("/block");
  }
  if (!user?.isPaid) {
    return null;
  }
  throw redirect("/signin");
};
