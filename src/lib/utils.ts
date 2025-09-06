import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

export const axiosInstance = axios.create({
  baseURL: "https://crudify.dev/api/v1/quizzes",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});