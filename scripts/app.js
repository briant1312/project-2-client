import {
    logIn,
    signUp,
    createRecipe,
    indexRecipes,
    showRecipe,
    updateRecipe,
    deleteRecipe,
} from './api.js'
import {
    onLoginSuccess,
    onIndexSuccess,
    onCreateAccountSuccess,
    onShowSuccess,
    createEditForm,
    craeteAddRecipeForm,
    onFailure,
    userInputError
} from './ui.js'

const signUpButton = document.querySelector('#sign-up')
const signInButton = document.querySelector('#sign-in')
const indexContainer = document.querySelector('.index-container')
const showContainer = document.querySelector('.show-container')
const updateRecipeForm = document.querySelector('#update-recipe')
const addNewRecipeForm = document.querySelector('#add-recipe')
const homeButton = document.querySelector('.home-button')
const addNewRecipe = document.querySelector('.add-new-recipe')
const messageContainer = document.querySelector('.message-container')
const logoutButton = document.querySelector('.logout')
const navBar = document.querySelector('nav')
const logInForm = document.querySelector('#log-in')
const closeMessageContainerSpan = document.querySelector('.close-message-container')
const messageContainerBox = document.querySelector('.message-container-box')
const emptyRecipeContainer = document.querySelector('.empty-recipe-container')



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
    clearContent()
    signUp(userData)
        .then(res => checkResponseStatusCode(res))
        .then(res => res.json())
        .then(onCreateAccountSuccess)
        .catch(onFailure)
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
    clearContent()
    logIn(userData)
        .then(res => checkResponseStatusCode(res))
        .then(res => res.json())
        .then(token => {
            onLoginSuccess(token)
            return token
        })
        .then(token => indexRecipes(token.token))
        .then(res => res.json())
        .then(responseObject => onIndexSuccess(responseObject.recipes))
        .then(() => {
            createIndexEventListeners()
            navBar.classList.remove('hidden')
        })
        .catch(onFailure)
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
                .catch(onFailure)
        })
    })
}

const createEditButtonEventListener = (id) => {
    const editButton = document.querySelector('.edit-recipe')
    editButton.setAttribute('data-id', id)
    editButton.addEventListener('click', () => {
        createEditForm(editButton.getAttribute('data-id'))
        createDeleteIngredientEventListener('update')
        createDeleteStepEventListener('update')
        createAddIngredientEventListener('update')
        createAddStepEventListener('update')
        createUpdateFormEventListener()
        createDeleteFormEventListener()
    })
}

const createDeleteIngredientEventListener = (formBaseName) => {
    const deleteButtons = document.querySelectorAll(`.${formBaseName}-form-delete-ingredient`)
    for(let button of deleteButtons) {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            button.parentElement.remove()
        })
    }
}

const createDeleteStepEventListener = (formBaseName) => {
    const deleteButtons = document.querySelectorAll(`.${formBaseName}-form-delete-step`)
    for(let button of deleteButtons) {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            button.parentElement.remove()
        })
    }
}

const createAddIngredientEventListener = (formBaseName) => {
    const addIngredientButton = document.querySelector(`.${formBaseName}-form-add-ingredient`)
    addIngredientButton.addEventListener('click', (e) => {
        e.preventDefault()
        const div = document.createElement('div')
        div.innerHTML = 
        `
        <label for="${formBaseName}-form-qty">qty</label>
        <input type="number" step="0.1" id="${formBaseName}-form-qty">
        <label for="${formBaseName}-form-unit">unit</label>
        <input type="text" id="${formBaseName}-form-unit">
        <label for="${formBaseName}-form-name">name</label>
        <input type="text" id="${formBaseName}-form-name">
        <button class="${formBaseName}-form-delete-ingredient">&times;</button>
        `
        document.querySelector(`.${formBaseName}-form-ingredients`).appendChild(div)
        createDeleteIngredientEventListener(formBaseName)
    })
}

const createAddStepEventListener = (formBaseName) => {
    const addStepButton = document.querySelector(`.${formBaseName}-form-add-step`)
    addStepButton.addEventListener('click', (e) => {
        e.preventDefault()
        const div = document.createElement('div')
        div.innerHTML = 
        `
        <textarea></textarea>
        <button class="${formBaseName}-form-delete-step">&times;</button>
        `
        document.querySelector(`.${formBaseName}-form-steps`).appendChild(div)
        createDeleteStepEventListener(formBaseName)
    })
}

const createUpdateFormEventListener = () => {
    const submitButton = document.querySelector('.update-form-submit')
    submitButton.addEventListener('click', (e) => {
        e.preventDefault()
        const updatedRecipe = generateRecipeObject('update')
        if(!isRecipeObjectValid(updatedRecipe)) {
            userInputError()
            return
        }
        clearContent()
        updateRecipe(updatedRecipe, submitButton.getAttribute('data-id'))
            .then(res => checkResponseStatusCode(res))
            .then(() => indexRecipes())
            .then(res => res.json())
            .then(responseObject => onIndexSuccess(responseObject.recipes))
            .then(() => createIndexEventListeners())
            .catch(err => onFailure(err))
    })
}

const createDeleteFormEventListener = () => {
    const deleteButton = document.querySelector('.delete-recipe-submit')
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault()
        clearContent()
        deleteRecipe(deleteButton.getAttribute('data-id'))
            .then(res => checkResponseStatusCode(res))
            .then(() => indexRecipes())
            .then(res => res.json())
            .then(responseObject => onIndexSuccess(responseObject.recipes))
            .then(() => createIndexEventListeners())
            .catch(err => onFailure(err))
    })
}

const createAddNewFormEventListener = () => {
    const submitButton = document.querySelector('.add-recipe-form-submit')
    submitButton.addEventListener('click', (e) => {
        e.preventDefault()
        const newRecipe = generateRecipeObject('add-recipe')
        if(!isRecipeObjectValid(newRecipe)) {
            userInputError()
            return
        }
        clearContent()
        createRecipe(newRecipe, submitButton.getAttribute('data-id'))
            .then(res => checkResponseStatusCode(res))
            .then(() => indexRecipes())
            .then(res => res.json())
            .then(responseObject => onIndexSuccess(responseObject.recipes))
            .then(() => createIndexEventListeners())
            .catch(err => onFailure(err))
    })
}

const generateRecipeObject = (formBaseName) => {
    const name = document.querySelector(`.${formBaseName}-form-name`).value
    const description = document.querySelector(`.${formBaseName}-form-description`).value
    const time = document.querySelector(`.${formBaseName}-form-time`).value
    const stepsArray = []
    const ingredientsArray = []
    const steps = document.querySelectorAll(`.${formBaseName}-form-steps textarea`)
    for(let step of steps) {
        stepsArray.push(step.value)
    }
    const ingredients = document.querySelectorAll(`.${formBaseName}-form-ingredients input`)
    for(let i = 0; i < ingredients.length; i += 3) {
        const ingredient = {
            qty: ingredients[i].value,
            unit: ingredients[i+1].value,
            name: ingredients[i+2].value
        }
        ingredientsArray.push(ingredient)
    }
    
    const recipe = {
        recipe: {
            name: name,
            description: description,
            time: time,
            steps: stepsArray,
            ingredients: ingredientsArray
        }
    }
    return recipe
}

const isRecipeObjectValid = (recipe) => {
    for(let key in recipe.recipe) {
        if(recipe.recipe[key] === null || recipe.recipe[key] === '') {
            return false
        } for(let step of recipe.recipe.steps) {
            if(step === null || step === '') {
                return false
            }
        } for(let ingredient of recipe.recipe.ingredients) {
            for(let key in ingredient) {
                if(ingredient[key] === null || ingredient[key] === '') {
                    return false
                }
            }
        }
    }
    return true
}

addNewRecipe.addEventListener('click', () => {
    clearContent()
    craeteAddRecipeForm()
    createDeleteIngredientEventListener('add-recipe')
    createDeleteStepEventListener('add-recipe')
    createAddIngredientEventListener('add-recipe')
    createAddStepEventListener('add-recipe')
    createAddNewFormEventListener()
})

const clearContent = () => {
    messageContainerBox.classList.add('hidden')
    messageContainer.innerHTML = ''
    indexContainer.innerHTML = ''
    showContainer.innerHTML = ''
    updateRecipeForm.innerHTML = ''
    addNewRecipeForm.innerHTML = ''
    emptyRecipeContainer.innerHTML = ''
}

homeButton.addEventListener('click', () => {
    clearContent()
    indexRecipes()
    .then(res => res.json())
    .then(responseObject => onIndexSuccess(responseObject.recipes))
    .then(() => createIndexEventListeners())
    .catch(onFailure)
})

logoutButton.addEventListener('click', () => {
    clearContent()
    window.localStorage.clear()
    navBar.classList.add('hidden')
    logInForm.classList.remove('hidden')
})

const checkResponseStatusCode = (res) => {
    let message
    if(res.statusText === 'Unprocessable Entity') {
        message = 'Username or password was incorrect'
    }else if(res.statusText === 'Internal Server Error') {
        message = 'There was a problem processing your request'
    } else {
        message = res.statusText
    }
    if(res.status >= 400 && res.status < 500) {
        throw message
    }
    if(res.status >= 500) {
        throw message
    }
    return res
}

closeMessageContainerSpan.addEventListener('click', () => {
    messageContainerBox.classList.add('hidden')
    messageContainer.innerHTML = ''
})