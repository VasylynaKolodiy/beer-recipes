'use client'
import {useEffect, useState} from "react"
import Link from 'next/link'
import {useAppStore} from "../lib/store/store"
import "./page.scss"

const Home = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const {recipes, fetchRecipes, updateRecipes} = useAppStore()
    const [selectedRecipes, setSelectedRecipes] = useState<number[]>([])

    useEffect(() => {
        fetchRecipes(pageNumber)
    }, [pageNumber])

    const selectRecipe = (event: React.MouseEvent<HTMLLIElement>, id: number) => {
        event.preventDefault();
        (selectedRecipes.includes(id)
                ? setSelectedRecipes(selectedRecipes.filter(elem => elem !== id))
                : setSelectedRecipes([...selectedRecipes, id])
        )
    }

    const deleteRecipes = () => {
        const updatedRecipes = recipes.filter(recipe => !selectedRecipes.includes(recipe.id));
        updateRecipes(updatedRecipes);
        (updatedRecipes.length < 15) && setPageNumber(pageNumber + 1)
        setSelectedRecipes([])
    }

    return (
        <main className='main'>
            <h1>Beer recipes</h1>
            <div className='recipes'>
                <ul className='recipes__list'>
                    {recipes.slice(0, 15).map((recipe) => (
                        <li className={`recipes__card ${selectedRecipes.includes(recipe.id) ? 'selected' : ''}`}
                            key={recipe.id}
                            onContextMenu={event => selectRecipe(event, recipe.id)}
                        >
                            <div className='recipes__name'> {recipe.id}. {recipe.name} </div>
                            <Link className='recipes__link' href={`/recipe/${recipe.id}`}/>
                            <div className='recipes__image'>
                                <img src={recipe.image_url} alt={recipe.name}/>
                            </div>

                        </li>
                    ))}
                </ul>
                <div className='recipes__delete'>
                    {selectedRecipes.length > 0 && (
                        <button className='recipes__delete-button' type='button' onClick={deleteRecipes}>DELETE</button>
                    )}
                </div>
            </div>
        </main>
    )
}
export default Home;