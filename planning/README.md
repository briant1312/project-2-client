# Recipe Tracker

## Wireframes

Login Screen
![alt text](./wireframes/Login.png)
Home Page / Index
![alt text](./wireframes/Home-Page.png)
Show Page
![alt text](./wireframes/Show-Recipe.png)
Edit Page
![alt text](./wireframes/Edit-Recipe.png)
Create Page
![alt text](./wireframes/Create-Recipe.png)

---

## Entity Relationship Diagram

![alt text](./wireframes/ERD.png)

## Recipe Model

- name: String
- description: String
- time: Number
- steps: \[String\]
- ingredients: \[ingredientSchema\]
- user: Schema.Types.ObjectId, ref: User

## Ingredients Model

- name: String
- group: String
- qty: Number
- unit: String

## User Model

- userName: String, unique: true
- password: String
- token: String

---

## MVP

- As a user, I want to be able to create an account
- As a user, I want to be able to log in
- As a user, I want to be able to log out
- As a user, I want to be able to delete my account
- As a user, I want to see all of my recipes once logged in
- As a user, I want to be able to create a recipe
- As a user, I want to be able to update a recipe
- As a user, I want to be able to delete a recipe
- As a user, I want to be able to view a single recipe

## Version 2

- As a user, I want to be able to choose different themes for the app
- As a user, I want to be able to rate recipes
- As a user, I want to organize my recipes in categories
- As a user, I want to be able to add a profile picture
- As a user, I want to be able to add pictures for recipes

## Version 3

- As a user, I want to be able to share recipes with friends
- As a user, I want to be able to choose a serving size and automatically adjust the recipe