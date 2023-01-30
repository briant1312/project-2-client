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
    userInputError,
    createNewIngredientRow,
    createNewStepRow,
    clearContent,
    createDeleteConfirmationPrompt
} from './ui.js'

const signUpButton = document.querySelector('#sign-up')
const signInButton = document.querySelector('#sign-in')
const indexContainer = document.querySelector('.index-container')
const homeButton = document.querySelector('.home-button')
const addNewRecipe = document.querySelector('.add-new-recipe')
const messageContainer = document.querySelector('.message-container')
const logoutButton = document.querySelector('.logout')
const navBar = document.querySelector('nav')
const logInForm = document.querySelector('#log-in')
const closeMessageContainerSpan = document.querySelector('.close-message-container')
const messageContainerBox = document.querySelector('.message-container-box')
const userNameInput = document.querySelector('#userName')
const passwordInput = document.querySelector('#password')

signUpButton.addEventListener('click', (e) => {
    e.preventDefault()
    // prevent the user from submitting the form if both fields aren't filled out to prevent
    // unnecessary calls to the api
    if(!userNameInput.value || !passwordInput.value) {
        userInputError()
        return
    }
    const userData = createUserObject()
    userNameInput.value = ''
    passwordInput.value = ''
    clearContent()
    signUp(userData)
        .then(checkResponseStatusCode)
        .then(res => res.json())
        .then(onCreateAccountSuccess)
        .catch(onFailure)
})

signInButton.addEventListener('click', (e) => {
    e.preventDefault()
    // prevent the user from submitting the form if both fields aren't filled out to prevent
    // unnecessary calls to the api
    if(!userNameInput.value || !passwordInput.value) {
        userInputError()
        return
    }
    const userData = createUserObject()
    userNameInput.value = ''
    passwordInput.value = ''
    clearContent()
    logIn(userData)
        .then(checkResponseStatusCode)
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

const createUserObject = () => {
    // create the user object to send to the api
    const userData = {
        credentials: {
            userName: userNameInput.value,
            password: passwordInput.value
        }
    }
    return userData
}

const createIndexEventListeners = () => {
    const recipes = document.querySelectorAll('.recipe-overview')
    recipes.forEach(recipe => {
        // create event listeners for all of the indexed recipes for the show route
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
        // create the edit form once the user has clicked the edit button on the show page
        // and create the event listeners for all of the buttons in the form
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
        createNewIngredientRow(formBaseName)
        createDeleteIngredientEventListener(formBaseName)
    })
}

const createAddStepEventListener = (formBaseName) => {
    const addStepButton = document.querySelector(`.${formBaseName}-form-add-step`)
    addStepButton.addEventListener('click', (e) => {
        e.preventDefault()
        createNewStepRow(formBaseName)
        createDeleteStepEventListener(formBaseName)
    })
}

const createUpdateFormEventListener = () => {
    const submitButton = document.querySelector('.update-form-submit')
    submitButton.addEventListener('click', (e) => {
        e.preventDefault()
        // create the recipe object from the update form that will get sent to the api 
        const updatedRecipe = generateRecipeObject('update')
        // make sure none of the fields for the recipe object are empty to avoid unneccesary 
        // requests to the api
        if(!isRecipeObjectValid(updatedRecipe)) {
            userInputError()
            return
        }
        clearContent()
        const recipeId = submitButton.getAttribute('data-id')
        updateRecipe(updatedRecipe, recipeId)
            .then(checkResponseStatusCode)
            .then(() => showRecipe(recipeId))
            .then(res => res.json())
            .then(recipe => onShowSuccess(recipe.recipe))
            .then(() => createEditButtonEventListener(recipeId))
            .catch(onFailure)
    })
}

const createDeleteFormEventListener = () => {
    const deleteButton = document.querySelector('.delete-recipe-submit')
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault()
        // prompt the user to make sure they want to delete the recipe to prevent 
        // accidentally presssing the delete button
        createDeleteConfirmationPrompt()
        const deletePromptButton = document.querySelector('.delete-recipe-prompt')
        deletePromptButton.addEventListener('click', () => {
            clearContent()
            deleteRecipe(deleteButton.getAttribute('data-id'))
                .then(checkResponseStatusCode)
                .then(() => indexRecipes())
                .then(res => res.json())
                .then(responseObject => onIndexSuccess(responseObject.recipes))
                .then(() => createIndexEventListeners())
                .catch(onFailure)
        })
    })
}

const createAddNewFormEventListener = () => {
    const submitButton = document.querySelector('.add-recipe-form-submit')
    submitButton.addEventListener('click', (e) => {
        e.preventDefault()
        // create the recipe object from the add new recipe form that will get sent to the api
        const newRecipe = generateRecipeObject('add-recipe')
        // make sure none of the fields for the recipe object are empty to avoid unneccesary 
        // requests to the api
        if(!isRecipeObjectValid(newRecipe)) {
            userInputError()
            return
        }
        clearContent()
        createRecipe(newRecipe, submitButton.getAttribute('data-id'))
            .then(checkResponseStatusCode)
            .then(() => indexRecipes())
            .then(res => res.json())
            .then(responseObject => onIndexSuccess(responseObject.recipes))
            .then(() => createIndexEventListeners())
            .catch(onFailure)
    })
}

// this function takes in the formBaseName so that it can be used to generate the recipe object
// for both the add and update forms
const generateRecipeObject = (formBaseName) => {
    // create all of the different variables that are required for the recipe model
    const name = document.querySelector(`.${formBaseName}-form-name`).value
    const description = document.querySelector(`.${formBaseName}-form-description`).value
    const time = document.querySelector(`.${formBaseName}-form-time`).value
    const stepsArray = []
    const ingredientsArray = []
    // grabs all of the text area's from the form that contain the steps so that 
    // it can be looped through to push them all into the stepsArray
    const steps = document.querySelectorAll(`.${formBaseName}-form-steps textarea`)
    for(let step of steps) {
        stepsArray.push(step.value)
    }
    // grabs all of the ingredients input fields from the form
    const ingredients = document.querySelectorAll(`.${formBaseName}-form-ingredients input`)
    // each ingredient model has 3 fields, the above query returns all of the input fields that pertain
    // to the ingredients. The below loop will cycle through each and create an object for each ingredient
    // and pushes them into the ingredientsArray
    for(let i = 0; i < ingredients.length; i += 3) {
        const ingredient = {
            qty: ingredients[i].value,
            unit: ingredients[i+1].value,
            name: ingredients[i+2].value
        }
        ingredientsArray.push(ingredient)
    }
    
    // create the recipe object from the above info to be sent to the api
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

// check all of the fields in the recipe object and see if they are empty before sending the 
// request to the api
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
    document.querySelector('h1').innerText = 'Recipe Tracker'
    window.localStorage.clear()
    navBar.classList.add('hidden')
    logInForm.classList.remove('hidden')
})

// very basic function to check the status code of the response from the api
// to try and create more helpful error messages
const checkResponseStatusCode = (res) => {
    let message
    if(res.status === 422) {
        message = 'Username or password was incorrect'
    }else if(res.status === 500) {
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