import { Breed } from "@/types/types";
import { dogApi, catApi } from "../lib/axios";

export async function fetchDogBreeds(): Promise<Breed[]> {
  const { data } = await dogApi.get("/breeds");
  return data;
}

export async function fetchCatBreeds(): Promise<Breed[]> {
  const { data } = await catApi.get("/breeds");
  return data;
}
