export const signUp = (data) => {
    return fetch('http://localhost:3000/sign-up', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const logIn = (data) => {
    return fetch('http://localhost:3000/sign-in', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

//=============

export const createRecipe = (data) => {
    return fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const indexRecipes = () => {
    return fetch('http://localhost:3000/recipes')
}

export const showRecipe = (recipeId) => {
    return fetch(`http://localhost:3000/recipes/${recipeId}`)
} 

export const updateRecipe = (data) => {
    return fetch(`http://localhost:3000/recipes/${recipeId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const deleteRecipe = (recipeId) => {
    return fetch(`http://localhost:3000/recipes/${recipeId}`, {
        method: 'DELETE'
    })
}

export const addIngredient = (data, recipeId) => {
    return fetch(`http://localhost:3000/ingredients/${recipeId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const deleteIngredient = (data, recipeId) => {
    return fetch(`http://localhost:3000/ingredients/${recipeId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredientId)
    })
}