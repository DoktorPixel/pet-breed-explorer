"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import { dogApi, catApi } from "../lib/axios";
import Link from "next/link";
import Image from "next/image";
import { Breed } from "@/types/tupes";

async function fetchDogBreeds(): Promise<Breed[]> {
  const { data } = await dogApi.get("/breeds");
  return data;
}

async function fetchCatBreeds(): Promise<Breed[]> {
  const { data } = await catApi.get("/breeds");
  return data;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: dogBreeds, isLoading: isLoadingDogs } = useQuery<Breed[]>(
    "dogBreeds",
    fetchDogBreeds
  );
  const { data: catBreeds, isLoading: isLoadingCats } = useQuery<Breed[]>(
    "catBreeds",
    fetchCatBreeds
  );

  if (isLoadingDogs || isLoadingCats)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <p className="text-center text-xl font-semibold">Loading...</p>
      </div>
    );

  const filteredDogBreeds = dogBreeds?.filter((breed: Breed) =>
    breed.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCatBreeds = catBreeds?.filter((breed: Breed) =>
    breed.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto ">
      <div className=" flex justify-center mt-10">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search breeds..."
          className="mb-4 p-2 border rounded"
        />
      </div>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredDogBreeds?.slice(0, 10).map((breed: Breed) => (
          <Link href={`/breed/dog/${breed.id}`} key={breed.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out">
              <Image
                src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`}
                alt={breed.name}
                className="w-full h-64 object-cover"
                width={500}
                height={500}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{breed.name}</h3>
              </div>
            </div>
          </Link>
        ))}
        {filteredCatBreeds?.slice(0, 10).map((breed: Breed) => (
          <Link href={`/breed/cat/${breed.id}`} key={breed.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out">
              <Image
                src={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`}
                alt={breed.name}
                className="w-full h-64 object-cover"
                width={500}
                height={500}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{breed.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
