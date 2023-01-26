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
    onShowSuccess
} from './ui.js'

// window.localStorage.clear()

const signUpButton = document.querySelector('#sign-up')
const signInButton = document.querySelector('#sign-in')
const indexContainer = document.querySelector('.index-container')


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
                })
            })
}