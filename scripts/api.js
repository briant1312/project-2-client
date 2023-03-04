const baseUrl = 'https://glacial-plains-23237.herokuapp.com'
// const baseUrl = 'http://localhost:3000'

export const signUp = (data) => {
    return fetch(`${baseUrl}/sign-up`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const logIn = (data) => {
    return fetch(`${baseUrl}/sign-in`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const createRecipe = (data) => {
    return fetch(`${baseUrl}/recipes`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.token}`
        },
        body: JSON.stringify(data)
    })
}

export const indexRecipes = (token = null) => {
    if(!token) {
        return fetch(`${baseUrl}/recipes`, {
        headers: {
            'Authorization': `Bearer ${window.localStorage.token}`
        }
    })
    } else {
        return fetch(`${baseUrl}/recipes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export const indexAllRecipes = () => {
    return fetch(`${baseUrl}/allRecipes`, {
        headers: {
            'Authorization': `Bearer ${window.localStorage.token}`
        }
    })
}

export const showRecipe = (recipeId) => {
    return fetch(`${baseUrl}/recipes/${recipeId}`, {
        headers: {
            'Authorization': `Bearer ${window.localStorage.token}`
        }
    })
} 

export const updateRecipe = (data, recipeId) => {
    return fetch(`${baseUrl}/recipes/${recipeId}`, {
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
    return fetch(`${baseUrl}/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${window.localStorage.token}`
        }
    })
}