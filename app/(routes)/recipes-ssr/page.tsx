/*
@Example: 
Server side component 
*/
import React from "react";
import CATEGORY, {
  TCategory,
  TCategoryModel,
} from "@/db/model/recipe_category";
import dbConnect from "@/db/db";
import Category from "@/components/recipes/Category";

const RecipesSSR = async () => {
  try {
    await dbConnect();

    const categories = await CATEGORY.find<TCategoryModel>().sort({
      name: "asc",
    });

    return (
      <div className="grid grid-cols-4 gap-4 m-2">
        {categories.map(({ _id, name, image_url }) => (
          <Category<TCategory>
            key={_id.toString()}
            _id={_id}
            name={name}
            image_url={image_url}
          />
        ))}
      </div>
    );
  } catch (error) {
    return <div>Something went wrong!</div>;
  }
};

export default RecipesSSR;
