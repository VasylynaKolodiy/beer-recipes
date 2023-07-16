'use client'
import {useEffect, useRef, useState} from "react"
import Link from 'next/link'
import {useAppStore} from "../lib/store/store"
import "./page.scss"
import {useOnScreen} from "../hooks/useOnScreen";

const Home = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [shift, setShift] = useState(0);
    const {recipes, fetchRecipes, updateRecipes} = useAppStore()
    const [selectedRecipes, setSelectedRecipes] = useState<number[]>([])
    const elementRef = useRef(null);
    const isOnScreen = useOnScreen(elementRef);

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

    useEffect(() => {
        if(isOnScreen && !!recipes.length){
            const newShift = shift + 1;
            if(newShift * 5 + 15 > recipes.length){
                setPageNumber(pageNumber + 1);
            }
            setShift(newShift)
        }
    }, [isOnScreen])

    return (
        <main className='main'>
            <h1>Beer recipes</h1>
            <div className='recipes'>
                <ul className='recipes__list'>
                    {recipes.slice(shift * 5, 15 + shift * 5).map((recipe) => (
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
                    <li className='recipes__observer' ref={elementRef}/>
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