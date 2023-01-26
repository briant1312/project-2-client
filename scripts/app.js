import {
    logIn,
    signUp,
    createRecipe,
    indexRecipes,
    showRecipe,
    updateRecipe,
    deleteRecipe,
    addIngredient,
    deleteIngredient
} from './api.js'
import {
    onLoginSuccess,
    onIndexSuccess,
    onCreateAccountSuccess,
    onShowSuccess,
    createEditForm
} from './ui.js'

// window.localStorage.clear()

const signUpButton = document.querySelector('#sign-up')
const signInButton = document.querySelector('#sign-in')
const indexContainer = document.querySelector('.index-container')
const updateRecipeForm = document.querySelector('#update-recipe')


signUpButton.addEventListener('click', (e) => {
    e.preventDefault()
    const userNameInput = document.querySelector('#userName')
    const passwordInput = document.querySelector('#password')
    if(!userName || !password) {
        return
    }
    const userData = {
        credentials: {
            userName: userNameInput.value,
            password: passwordInput.value
        }
    }
    userNameInput.value = ''
    passwordInput.value = ''
    signUp(userData)
        .then(res => res.json())
        .then(onCreateAccountSuccess)
        .catch(console.error)
})

signInButton.addEventListener('click', (e) => {
    e.preventDefault()
    const userNameInput = document.querySelector('#userName')
    const passwordInput = document.querySelector('#password')
    if(!userName || !password) {
        return
    }
    const userData = {
        credentials: {
            userName: userNameInput.value,
            password: passwordInput.value
        }
    }
    userNameInput.value = ''
    passwordInput.value = ''
    logIn(userData)
        .then(res => res.json())
        .then(token => {
            onLoginSuccess(token)
            return token
        })
        .then(token => indexRecipes(token.token))
        .then(res => res.json())
        .then(responseObject => onIndexSuccess(responseObject.recipes))
        .then(() => createIndexEventListeners())
        .catch(console.error)
})

const createIndexEventListeners = () => {
    const recipes = document.querySelectorAll('.recipe-overview')
    recipes.forEach(recipe => {
        recipe.addEventListener('click', () => {
            const id = recipe.getAttribute('data-id')
            indexContainer.innerHTML = ''
            showRecipe(id)
                .then(res => res.json())
                .then(recipe => onShowSuccess(recipe.recipe))
                .then(() => createEditButtonEventListener(id))
                .catch(console.error)
        })
    })
}

const createEditButtonEventListener = (id) => {
    const editButton = document.querySelector('.edit-recipe')
    editButton.setAttribute('data-id', id)
    editButton.addEventListener('click', () => {
        createEditForm(editButton.getAttribute('data-id'))
        createDeleteIngredientEventListener()
        createDeleteStepEventListener()
        createAddIngredientEventListener()
        createAddStepEventListener()
        createSubmitFormEventListener()
    })
}

const createDeleteIngredientEventListener = () => {
    const deleteButtons = document.querySelectorAll('.update-form-delete-ingredient')
    for(let button of deleteButtons) {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            button.parentElement.remove()
        })
    }
}

const createDeleteStepEventListener = () => {
    const deleteButtons = document.querySelectorAll('.update-form-delete-step')
    for(let button of deleteButtons) {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            button.parentElement.remove()
        })
    }
}

const createAddIngredientEventListener = () => {
    const addIngredientButton = document.querySelector('.update-form-add-ingredient')
    addIngredientButton.addEventListener('click', (e) => {
        e.preventDefault()
        const div = document.createElement('div')
        div.innerHTML = 
        `
        <label for="update-form-qty">qty</label>
        <input type="number" step="0.1" id="update-form-qty">
        <label for="update-form-unit">unit</label>
        <input type="text" id="update-form-unit">
        <label for="update-form-name">name</label>
        <input type="text" id="update-form-name">
        <button class="update-form-delete-ingredient">Remove</button>
        `
        document.querySelector('.update-form-ingredients').appendChild(div)
        createDeleteIngredientEventListener()
    })
}

const createAddStepEventListener = () => {
    const addStepButton = document.querySelector('.update-form-add-step')
    addStepButton.addEventListener('click', (e) => {
        e.preventDefault()
        const div = document.createElement('div')
        div.innerHTML = 
        `
        <input type="text">
        <button class="update-form-delete-step">Remove</button>
        `
        document.querySelector('.update-form-steps').appendChild(div)
        createDeleteStepEventListener()
    })
}

const createSubmitFormEventListener = () => {
    const submitButton = document.querySelector('.update-form-submit')
    submitButton.addEventListener('click', (e) => {
        e.preventDefault()
        const name = document.querySelector('.update-form-name').value
        const description = document.querySelector('.update-form-description').value
        const time = document.querySelector('.update-form-time').value
        const stepsArray = []
        const ingredientsArray = []
        const steps = document.querySelectorAll('.update-form-steps input')
        for(let step of steps) {
            stepsArray.push(step.value)
        }
        const ingredients = document.querySelectorAll('.update-form-ingredients input')
        for(let i = 0; i < ingredients.length; i += 3) {
            const ingredient = {
                qty: ingredients[i].value,
                unit: ingredients[i+1].value,
                name: ingredients[i+2].value
            }
            ingredientsArray.push(ingredient)
        }
        
        const updatedRecipe = {
            recipe: {
                name: name,
                description: description,
                time: time,
                steps: stepsArray,
                ingredients: ingredientsArray
            }
        }
        updateRecipeForm.innerHTML = ''
        updateRecipe(updatedRecipe, submitButton.getAttribute('data-id'))
            .then(() => indexRecipes())
            .then(res => res.json())
            .then(responseObject => onIndexSuccess(responseObject.recipes))
            .then(() => createIndexEventListeners())
            .catch(console.error)
    })
}