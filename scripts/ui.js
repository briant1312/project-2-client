const indexContainer = document.querySelector('.index-container')
const logInForm = document.querySelector('#log-in')

export const onLoginSuccess = (responseData) => {
    window.localStorage.setItem('token', responseData.token)
    logInForm.classList.add('hidden')
}

export const onIndexSuccess = (recipes) => {
    recipes.forEach(recipe => {
        const div = document.createElement('div')
        div.innerHTML =
         `
        <h2>${recipe.name}</h2>
        `
        indexContainer.appendChild(div)
    })
}