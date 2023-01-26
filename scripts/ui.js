const indexContainer = document.querySelector('.index-container')
const logInForm = document.querySelector('#log-in')
const messageContainer = document.querySelector('.message-container')
const showContainer = document.querySelector('.show-container')

export const onLoginSuccess = (responseData) => {
    messageContainer.innerHTML = ''
    window.localStorage.setItem('token', responseData.token)
    logInForm.classList.add('hidden')
}

export const onCreateAccountSuccess = (userData) => {
    messageContainer.innerHTML = 
    `
    <h3>Username ${userData.userName} has been created successfully </h3>
    <p>Please login with your credentials</p>
    `
}

export const onIndexSuccess = (recipes) => {
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
}

export const onShowSuccess = (recipe) => {
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
        li.innerText = `${ingredient.qty} ${ingredient.unit} of ${ingredient.name}`
        ingredientsUl.appendChild(li)
    })
    div.innerHTML = 
    `
    <h2>${recipe.name}</h2>
    <p>${recipe.description}</p>
    <p>Time: ${recipe.time} Minutes</p>
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
}