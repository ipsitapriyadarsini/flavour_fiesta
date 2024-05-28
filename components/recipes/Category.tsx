// "use client";
import Image from "next/image";
import React from "react";

type Props<T> = T & { name: string; image_url: string };

const Category = <T,>({ image_url, name }: Props<T>) => {
  return (
    <div className="flex items-center flex-col cursor-pointer">
      <Image
        width={500}
        height={500}
        className="w-40 h-40 rounded-full"
        src={image_url}
        alt={name}
      />
      <p className="text-center">{name}</p>
    </div>
  );
};

export default Category;
