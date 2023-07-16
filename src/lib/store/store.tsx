import {create} from 'zustand'
import {createRecipesSlice, RecipesSlice} from '../slices/createRecipesSlice'
import {createRecipeSlice, RecipeSlice} from "../slices/createRecipeSlice";

type StoreState = RecipesSlice & RecipeSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createRecipesSlice(...a),
    ...createRecipeSlice(...a),
}))