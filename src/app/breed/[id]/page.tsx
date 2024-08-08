// pages/breed/[id].tsx
"use client";

import { useQuery } from "react-query";
import { catApi, dogApi } from "@/lib/axios";
import { useRouter } from "next/router";
import Image from "next/image";

interface Breed {
  id: string;
  name: string;
  reference_image_id: string;
  description: string;
  temperament: string;
  life_span: string;
}

async function fetchDogBreed(id: string): Promise<Breed> {
  const { data } = await dogApi.get(`/breeds/${id}`);
  return data;
}

async function fetchCatBreed(id: string): Promise<Breed> {
  const { data } = await catApi.get(`/breeds/${id}`);
  return data;
}

export default function BreedPage() {
  const router = useRouter();

  const { id } = router?.query;

  const { data: dogBreed, isLoading: isLoadingDog } = useQuery<Breed>(
    ["dogBreed", id],
    () => fetchDogBreed(id as string),
    {
      enabled: !!id, // запрос будет выполнен только при наличии id
    }
  );

  const { data: catBreed, isLoading: isLoadingCat } = useQuery<Breed>(
    ["catBreed", id],
    () => fetchCatBreed(id as string),
    {
      enabled: !!id,
    }
  );

  if (isLoadingDog || isLoadingCat) return <div>Loading...</div>;

  const breed = dogBreed || catBreed;

  if (!breed) return <div>Breed not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Image
          src={`https://cdn2.${
            dogBreed ? "thedogapi.com" : "thecatapi.com"
          }/images/${breed.reference_image_id}.jpg`}
          alt={breed.name}
          className="w-full h-64 object-cover"
          width={500}
          height={500}
        />
        <div className="p-4">
          <h1 className="text-2xl font-bold">{breed.name}</h1>
          <p className="mt-2">{breed.description}</p>
          <p className="mt-2">
            <strong>Temperament:</strong> {breed.temperament}
          </p>
          <p className="mt-2">
            <strong>Life Span:</strong> {breed.life_span} years
          </p>
          {/* добавьте другие данные о породе, если нужно */}
        </div>
      </div>
    </div>
  );
}
