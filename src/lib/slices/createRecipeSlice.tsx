import {StateCreator} from "zustand";
import {IRecipe} from "../../models/interfaces";

export interface RecipeSlice {
    recipe: IRecipe[];
    fetchRecipe: (id: number) => void;
}

export const createRecipeSlice: StateCreator<RecipeSlice> = (set) => ({
    recipe: [],
    fetchRecipe: async (id) => {
        const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`)
        const newRecipe = await res.json();
        set({recipe: newRecipe})
    },
})