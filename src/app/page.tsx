"use client";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchDogBreeds, fetchCatBreeds } from "@/lib/api";
import Link from "next/link";
import { Breed } from "@/types/types";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const { data: dogBreeds, isLoading: isLoadingDogs } = useQuery<Breed[]>(
    "dogBreeds",
    fetchDogBreeds
  );
  const { data: catBreeds, isLoading: isLoadingCats } = useQuery<Breed[]>(
    "catBreeds",
    fetchCatBreeds
  );

  const shuffledDogBreeds = useMemo(
    () => shuffle(dogBreeds || []),
    [dogBreeds]
  );

  const shuffledCatBreeds = useMemo(
    () => shuffle(catBreeds || []),
    [catBreeds]
  );

  const filteredDogBreeds = useMemo(
    () =>
      shuffledDogBreeds.filter((breed: Breed) =>
        breed.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      ),
    [shuffledDogBreeds, searchQuery]
  );

  const filteredCatBreeds = useMemo(
    () =>
      shuffledCatBreeds.filter((breed: Breed) =>
        breed.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      ),
    [shuffledCatBreeds, searchQuery]
  );

  if (isLoadingDogs || isLoadingCats)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <p className="text-center text-xl font-semibold">Loading...</p>
      </div>
    );

  const allBreeds = [...(dogBreeds || []), ...(catBreeds || [])];
  const filteredBreeds = allBreeds.filter((breed: Breed) =>
    breed.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (breed: Breed) => {
    setSearchQuery(breed.name);
    setShowSuggestions(false);
  };

  return (
    <div className="container mx-auto ">
      <div className=" flex justify-center mt-10 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          placeholder="Search breeds..."
          className="mb-4 p-2 border rounded w-full max-w-md"
        />
        {showSuggestions && searchQuery && (
          <div className="absolute top-full mt-2 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <ul>
              {filteredBreeds.slice(0, 5).map((breed: Breed) => (
                <li
                  key={breed.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(breed)}
                >
                  {breed.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredDogBreeds?.slice(0, 10).map((breed: Breed) => (
          <Link href={`/breed/dog/${breed.id}`} key={breed.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden transform  hover:shadow-xl transition duration-300 ease-in-out">
              <ImageWithFallback
                breed={breed}
                apiBaseUrl="https://cdn2.thedogapi.com/images"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{breed.name}</h3>
              </div>
            </div>
          </Link>
        ))}
        {filteredCatBreeds?.slice(0, 10).map((breed: Breed) => (
          <Link href={`/breed/cat/${breed.id}`} key={breed.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:shadow-xl transition duration-300 ease-in-out">
              <ImageWithFallback
                breed={breed}
                apiBaseUrl="https://cdn2.thecatapi.com/images"
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
