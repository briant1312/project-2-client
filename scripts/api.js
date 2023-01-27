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

export const createRecipe = (data) => {
    return fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })
}

export const indexRecipes = (token = null) => {
    if(!token) {
        return fetch('http://localhost:3000/recipes', {
        headers: {
            'Authorization': `Bearer ${window.localStorage.token}`
        }
    })
    } else {
        return fetch('http://localhost:3000/recipes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export const showRecipe = (recipeId) => {
    return fetch(`http://localhost:3000/recipes/${recipeId}`, {
        headers: {
            'Authorization': `Bearer ${window.localStorage.token}`
        }
    })
} 

export const updateRecipe = (data, recipeId) => {
    return fetch(`http://localhost:3000/recipes/${recipeId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.token}`
        },
        body: JSON.stringify(data)
    })
}

export const deleteRecipe = (recipeId) => {
    return fetch(`http://localhost:3000/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${window.localStorage.token}`
        }
    })
}