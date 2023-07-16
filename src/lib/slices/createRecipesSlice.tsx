import {StateCreator} from "zustand";
import {IRecipe} from "../../models/interfaces";

export interface RecipesSlice {
    recipes: IRecipe[];
    fetchRecipes: (pageNumber: number) => void;
    updateRecipes: (updatedRecipes: IRecipe[]) => void;
}

export const createRecipesSlice: StateCreator<RecipesSlice> = (set, get) => ({
    recipes: [],
    fetchRecipes: async (pageNumber) => {
        const res = await fetch(`https://api.punkapi.com/v2/beers?page=${pageNumber}`)
        const newRecipes = await res.json();
        set({recipes: pageNumber === 1 ? newRecipes : [ ...get().recipes, ...newRecipes]})
    },

    updateRecipes: (updatedRecipes) => {
        set({recipes: updatedRecipes})
    },
})