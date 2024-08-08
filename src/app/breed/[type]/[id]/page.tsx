"use client";

import { useQuery } from "react-query";
import { catApi, dogApi } from "@/lib/axios";
import { useParams } from "next/navigation";

import { Breed } from "@/types/types";
import Link from "next/link";
import { DynamicImageWithFallback } from "@/components/DynamicImageWithFallback";

async function fetchBreed(id: string, type: "dog" | "cat"): Promise<Breed> {
  const api = type === "dog" ? dogApi : catApi;
  const { data } = await api.get(`/breeds/${id}`);
  return data;
}

export default function BreedPage() {
  const { id, type } = useParams<{ id: string; type: "dog" | "cat" }>();

  const { data: breed, isLoading } = useQuery<Breed>(
    ["breed", id],
    () => fetchBreed(id, type),
    {
      enabled: !!id && !!type,
    }
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <p className="text-center text-xl font-semibold">Loading...</p>
      </div>
    );

  if (!breed)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <p className="text-center text-xl font-semibold">Breed not found</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4 max-w-[1000px]">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <DynamicImageWithFallback breed={breed} type={type} />
        <div className="p-4 ">
          <h1 className="text-2xl font-bold">{breed.name}</h1>
          <p className="mt-2">{breed.description}</p>
          <p className="mt-2">
            <strong>Temperament:</strong> {breed.temperament}
          </p>
          <p className="mt-2">
            <strong>Life Span:</strong> {breed.life_span} years
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Link href="/" passHref>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
