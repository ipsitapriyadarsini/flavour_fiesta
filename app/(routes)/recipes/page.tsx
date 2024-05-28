"use client";
/*
@Example: 
Client side component with swr & using server component
*/
import Image from "next/image";
import React from "react";
import useSWR, { Fetcher } from "swr";
import Category from "@/components/recipes/Category";

type TCategory = { _id: string; image_url: string; name: string };

const fetcher: Fetcher<{ status: number; data: TCategory[] }, string> = (url) =>
  fetch(url).then((res) => res.json());

const Recipes = () => {
  const { data, isLoading } = useSWR("/api/recipes/categories", fetcher);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-4 gap-4 m-2">
      {data?.data.map((cat) => (
        <Category<TCategory> key={cat._id} {...cat} />
      ))}
    </div>
  );
};

export default Recipes;
