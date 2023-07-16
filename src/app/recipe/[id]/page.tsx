'use client'
import {useEffect} from "react"
import "./recipe.scss"
import {useAppStore} from "../../../lib/store/store";
import {usePathname} from 'next/navigation'
import Link from "next/link";

const Recipe = () => {
    const {recipe, fetchRecipe} = useAppStore()
    const recipeItem = recipe[0]
    const recipeId = Number(usePathname().replace('/recipe/', ''))

    useEffect(() => {
        fetchRecipe(recipeId)
    }, [])


    return (
        <main className='recipe'>
            <Link className='recipe__link' href='/'> ← Home</Link>
            <h2 className='recipe__name'>{recipeItem?.id}. {recipeItem?.name}</h2>

            <div className='recipe__info'>
                <div className='recipe__image'>
                    <img src={recipeItem?.image_url} alt={recipeItem?.name}/>
                </div>

                <div className='recipe__subscribe'>
                    <div><span>Tagline:</span> {recipeItem?.tagline}</div>
                    <div><span>First brewed:</span> {recipeItem?.first_brewed}</div>
                    <div><span>Description:</span> {recipeItem?.description}</div>
                    <div><span>Volume:</span> {recipeItem?.volume?.value} {recipeItem?.volume?.unit}</div>
                    <div><span>Boil volume:</span> {recipeItem?.boil_volume?.value} {recipeItem?.boil_volume?.unit}</div>
                </div>
            </div>

            <h3>Ingredients</h3>
            <div className='recipe__info'>
                <div>
                    <span>Malt:</span>
                    <ol>
                        {recipeItem?.ingredients?.malt?.map((elem, i) =>
                            <li key={i}>{elem.name} - {elem.amount.value} {elem.amount.unit}</li>
                        )}
                    </ol>
                </div>

                <div>
                    <span>Hops:</span>
                    <ol>
                        {recipeItem?.ingredients?.hops?.map((elem, i) =>
                            <li key={i}>{elem.name} - {elem.amount.value} {elem.amount.unit} ({elem.add} {elem.attribute})</li>
                        )}
                    </ol>
                </div>
            </div>

            <div className='recipe__subscribe'>
                <div><span>Yeast:</span> {recipeItem?.ingredients?.yeast}</div>
                <div><span>Food pairing:</span> {recipeItem?.food_pairing}</div>
                <div><span>Brewers tips:</span> {recipeItem?.brewers_tips}</div>
                <div><span>Contributed by:</span> {recipeItem?.contributed_by}</div>
            </div>

        </main>
    )
};
export default Recipe;