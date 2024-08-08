"use client";
import { useQuery } from "react-query";
import { dogApi, catApi } from "../lib/axios";
import Link from "next/link";
import Image from "next/image";

interface Breed {
  id: string;
  name: string;
  reference_image_id: string;
}

async function fetchDogBreeds(): Promise<Breed[]> {
  const { data } = await dogApi.get("/breeds");
  return data;
}

async function fetchCatBreeds(): Promise<Breed[]> {
  const { data } = await catApi.get("/breeds");
  return data;
}

export default function Home() {
  const { data: dogBreeds, isLoading: isLoadingDogs } = useQuery<Breed[]>(
    "dogBreeds",
    fetchDogBreeds
  );
  const { data: catBreeds, isLoading: isLoadingCats } = useQuery<Breed[]>(
    "catBreeds",
    fetchCatBreeds
  );

  if (isLoadingDogs || isLoadingCats) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {dogBreeds?.slice(0, 10).map((breed: Breed) => (
        <Link href={`/breed/${breed.id}`} key={breed.id}>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`}
              alt={breed.name}
              className="w-full h-48 object-cover"
              width={500}
              height={500}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{breed.name}</h3>
            </div>
          </div>
        </Link>
      ))}
      {catBreeds?.slice(0, 10).map((breed: Breed) => (
        <Link href={`/breed/${breed.id}`} key={breed.id}>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`}
              alt={breed.name}
              className="w-full h-48 object-cover"
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
  );
}

