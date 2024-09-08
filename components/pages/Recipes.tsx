'use client';
import React, { useEffect, useState } from 'react';
import FoodImage from '../ui/FoodImage';
interface Category {
  _id: string;
  imageUrl: string;
  name: string;
}

const Recipes = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    fetch(`/api/recipes/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h2 className="grid place-items-center font-extrabold text-3xl mt-2">
        Recipes
      </h2>
      <div className="flex flex-wrap gap-8">
        {categories.map((category) => (
          <div key={category._id}>
            <FoodImage src={category.imageUrl} alt={category.name} />
            <h3 className="text-center font-bold">{category.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Recipes;

// import React from 'react';
// import FoodImage from '../ui/FoodImage';

// const Recipes = () => {
//   const arr = [1, 2, 3, 5, 6, 8, 9, 2, 7, 9, 3, 1];
//   return (
//     <>
//       <h2 className="grid place-items-center font-extrabold text-3xl mt-2">
//         Recipes
//       </h2>
//       <div className="flex flex-wrap gap-8">
//         {arr.map((e, i) => {
//           return <FoodImage key={i} />;
//         })}
//       </div>
//     </>
//   );
// };

// export default Recipes;
