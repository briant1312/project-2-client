const indexContainer = document.querySelector('.index-container')
const logInForm = document.querySelector('#log-in')
const messageContainer = document.querySelector('.message-container')
const showContainer = document.querySelector('.show-container')
const updateRecipeForm = document.querySelector('#update-recipe')
const addNewRecipeForm = document.querySelector('#add-recipe')
const messageContainerBox = document.querySelector('.message-container-box')
const emptyRecipeContainer = document.querySelector('.empty-recipe-container')

export const onFailure = (err) => {
    messageContainerBox.classList.remove('hidden')
    if(err == 'TypeError: Failed to fetch') {
        messageContainer.innerHTML = 
        `
        <h3>Server is currently down</h3>
        <p>Please try again later</p>
        `
    } else {
        messageContainer.innerHTML = 
        `
        <h3>Oops! There was an error</h3>
        <p>${err}</p>
        `
    }
}

export const userInputError = () => {
    messageContainerBox.classList.remove('hidden')
    messageContainer.innerHTML = 
    `
    <p>All fields must be filled out to submit</p>
    `
}

export const onLoginSuccess = (responseData) => {
    document.querySelector('h1').innerText = 'Your Recipes'
    messageContainer.innerHTML = ''
    window.localStorage.setItem('token', responseData.token)
    logInForm.classList.add('hidden')
}

export const onCreateAccountSuccess = (userData) => {
    messageContainerBox.classList.remove('hidden')
    messageContainer.innerHTML = 
    `
    <h3 class='success-message'>Username ${userData.userName} has been created successfully </h3>
    <p class='success-message'>Please login with your credentials</p>
    `
}

export const onIndexSuccess = (recipes) => {
    if(recipes.length > 0) {
        recipes.forEach(recipe => {
            const div = document.createElement('div')
            div.innerHTML =
             `
            <h2>${recipe.name}</h2>
            `
            div.classList.add('recipe-overview')
            div.setAttribute('data-id', recipe._id)
            indexContainer.appendChild(div)
        })
    } else {
        const div = document.createElement('div')
        div.innerHTML = "<h2>It looks like you don't have any recipes yet.</h2>" +
                        "<h2>Click the link above to start adding recipes now.</h2>"
        emptyRecipeContainer.appendChild(div)
    }
}

export const onShowSuccess = (recipe) => {
    showContainer.innerHTML = ''
    showContainer.classList.remove('hidden')
    const div = document.createElement('div')
    const stepsOl = document.createElement('ol')
    recipe.steps.forEach(step => {
        const li = document.createElement('li')
        li.innerText = step
        stepsOl.appendChild(li)
    })
    const ingredientsUl = document.createElement('ul')
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li')
        li.innerHTML = `<span class="ingredient-qty">${ingredient.qty}</span> 
                        <span class="ingredient-unit">${ingredient.unit}</span> of
                        <span class="ingredient-name">${ingredient.name}</span>`
        ingredientsUl.appendChild(li)
    })
    div.innerHTML = 
    `
    <h2 class="recipe-name">${recipe.name}</h2>
    <p class="description">${recipe.description}</p>
    <p>Time: <span class='recipe-time'>${recipe.time}</span> Minutes</p>
    `
    const ingredientsHeader = document.createElement('h3')
    ingredientsHeader.innerText = 'Ingredients'
    const stepsHeader = document.createElement('h3')
    stepsHeader.innerText = 'Steps'
    showContainer.appendChild(div)
    div.appendChild(ingredientsHeader)
    div.appendChild(ingredientsUl)
    div.appendChild(stepsHeader)
    div.appendChild(stepsOl)

    const editButton = document.createElement('button')
    editButton.innerText = 'Edit'
    editButton.classList.add('edit-recipe')
    editButton.setAttribute('data-id', recipe._id)
    showContainer.appendChild(editButton)
}

export const createEditForm = (id) => {
    const name = document.querySelector('.show-container h2')
    const description = document.querySelector('.description')
    const time = document.querySelector('.recipe-time')
    const ingredients = document.querySelectorAll('.show-container ul>li')
    const steps = document.querySelectorAll('.show-container ol>li')

    updateRecipeForm.innerHTML = 
    `
    <label>Name:</label>
    <input class="update-form-name" type="text" value="${name.innerText}">
    <label>Description:</label>
    <input class="update-form-description" type="text" value="${description.innerText}">
    <label>Time(in minutes):</label>
    <input class="update-form-time" type="number" value="${time.innerText}">
    <h3>Ingredients</h3>
    <button class="update-form-add-ingredient">Add Ingredient</button>
    <div class="update-form-ingredients"></div>
    <h3>Steps</h3>
    <button class="update-form-add-step">Add Step</button>
    <div class="update-form-steps"></div>
    <div class="update-form-button-container">
        <button class="update-form-submit" data-id="${id}">Submit</button>
        <button class="delete-recipe-submit" data-id="${id}">Delete</button>
    </div>
    `

    ingredients.forEach(ingredient => {
        const div = document.createElement('div')
        div.innerHTML = 
        `
        <label>qty</label>
        <input type="number" step="0.1" value="${ingredient.childNodes[0].innerText}">
        <label>unit</label>
        <input type="text" value="${ingredient.childNodes[2].innerText}">
        <label>name</label>
        <input type="text" value="${ingredient.childNodes[4].innerText}">
        <button class="update-form-delete-ingredient">&times;</button>
        `
        document.querySelector('.update-form-ingredients').appendChild(div)
    })

    steps.forEach(step => {
        const div = document.createElement('div')
        div.innerHTML = 
        `
        <textarea>${step.innerText}</textarea>
        <button class="update-form-delete-step">&times</button>
        `
        document.querySelector('.update-form-steps').appendChild(div)
    })
    showContainer.classList.add('hidden')
}

export const craeteAddRecipeForm = () => {
    addNewRecipeForm.innerHTML = 
    `
    <label>Name:</label>
    <input class="add-recipe-form-name" type="text">
    <label>Description:</label>
    <input class="add-recipe-form-description" type="text">
    <label>Time(in minutes):</label>
    <input class="add-recipe-form-time" type="number">
    <h3>Ingredients</h3>
    <button class="add-recipe-form-add-ingredient">Add Ingredient</button>
    <div class="add-recipe-form-ingredients"></div>
    <h3>Steps</h3>
    <button class="add-recipe-form-add-step">Add Step</button>
    <div class="add-recipe-form-steps"></div>
    <button class="add-recipe-form-submit">Submit</button>
    `

    const ingredientDiv = document.createElement('div')
    ingredientDiv.innerHTML = 
        `
        <label>qty</label>
        <input type="number" step="0.1">
        <label>unit</label>
        <input type="text">
        <label>name</label>
        <input type="text">
        <button class="add-recipe-form-delete-ingredient">&times;</button>
        `
    document.querySelector('.add-recipe-form-ingredients').appendChild(ingredientDiv)

    const stepDiv = document.createElement('div')
    stepDiv.innerHTML = 
    `
    <textarea></textarea>
    <button class="add-recipe-form-delete-step">&times;</button>
    `
    document.querySelector('.add-recipe-form-steps').appendChild(stepDiv)
}

export const createNewIngredientRow = (formBaseName) => {
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
}

export const createNewStepRow = (formBaseName) => {
    const div = document.createElement('div')
        div.innerHTML = 
        `
        <textarea></textarea>
        <button class="${formBaseName}-form-delete-step">&times;</button>
        `
        document.querySelector(`.${formBaseName}-form-steps`).appendChild(div)
}

export const clearContent = () => {
    messageContainerBox.classList.add('hidden')
    messageContainer.innerHTML = ''
    indexContainer.innerHTML = ''
    showContainer.innerHTML = ''
    updateRecipeForm.innerHTML = ''
    addNewRecipeForm.innerHTML = ''
    emptyRecipeContainer.innerHTML = ''
}