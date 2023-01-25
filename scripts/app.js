import {
    logIn,
    signUp 
} from './api.js'
import {
    onLoginSuccess
} from './ui.js'

const signUpButton = document.querySelector('#sign-up')
const signInButton = document.querySelector('#sign-in')

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
        .then(console.log)
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
        .then(data => onLoginSuccess(data))
        .catch(console.error)
})