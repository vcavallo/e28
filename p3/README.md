# Project 2
+ By: Vinney Cavallo
+ Production URL: <http://recipes.vinney.xyz>

refresh endpoint for tests

rate limit in tests

## Pages summary

The headers below correspond to routes (with dashes omitted for readability)

### Home

Simple landing page. Provides a list of "highlighted recipes", which are those `recommended == true`.

### Recipes

This is the index of all recipes. A star icon is used to denote the recommended items.

### Recipes / ID

View page for a single recipe. Shows the recipe components / ingredients as well as the recipe instructions.  
The 'list' icon next to ingredients allows the user to add this item to any of the existing shopping lists.  
Additional ingredients can be added to the list using the inline form.

### Recipes / New

This is the form for creating a new recipe. In order to avoid making many API calls all at once per ingredient involved, the ingredient-adding process is done on the above view page for a recipe.  
This page could have had an in-component list of pending ingredients which would be looped-through and created after successfully creating the recipe, but I wanted to avoid nested callbacks.

### Shopping Lists

Lists all shopping lists. I opted to allow for multiple lists - but have not added a `create` action for users yet.

### Shopping Lists / ID

"Show" page for a given shopping lists. Items here would be "joined" with `recipeComponents` (ingredients), in the database query, ideally.  
Shopping list items can be "checked off" by clicking on them (which marks them `acquired == true`)

---

## SFC summary

The 'View/Page' components have been covered above, so I'll only detail the non-view components here:

- `App.vue` - The main entry point to the Vue app. Contains the router and main nav
- `AddToListWidget.vue` - Small popup that takes a recipe component ID prop and allows for adding this ingredient to a shopping list.
- `Home.vue` - See above
- `ListIndex.vue` - See above
- `ListShow.vue` - See above. Takes a list ID prop in order to render a given shopping list
- `RecipeComponent.vue` - Super basic presenter component responsible for properly displaying an ingredient on either a recipe view or a shopping list view. Handles a small amount of logic for showing units or not, based on if the item is itself a single unit (like an egg!)
- `RecipeIndex.vue` - See above
- `RecipeNew.vue` - See above
- `RecipeShow.vue` - See above. Takes a recipe ID prop to render a single recipe
- `ShoppingListItem.vue` - A single item on a shopping list. Is responsible for marking _itself_ acquired or not. Relies on the `RecipeComponent` component to handle displaying the ingredients properly.


## Server interaction

- `GET /shoppingList` - Gets all shopping lists. For the shopping list index page as well as the `AddToListWidget`.
- `GET /shoppingList/:id` - For the shopping list show page
- `GET /shoppingListItem/query?shopping_list_id=:id` - Gets all the items for a single shopping list
- `GET /shoppingListItem/:id` - get an item for display on the shopping list
- `POST /shoppingListItem` - Adds a `recipe_component_id`, `shopping_list_id` pair to the `shoppingListItems` table
- `PUT /shoppingListItem/:id` - Used for marking a shopping list item 'acquired'
- `GET /recipe` - Get all recipes for the recipe index page
- `GET /recipe/:id` - Get a single recipe for show page
- `POST /recipe` - Create a new recipe
- `GET /recipeComponent/query?recipe_id=:id` - Get all recipe components for a given recipe
- `GET /recipe/query?recommended=1` - Used to display the recommended recipes on the homepage
- `GET /recipeComponent/:id` - Get the details of a recipe component, for displaying on the shopping list
- `POST /recipeComponent` - Create a new recipe component (from the inline form on the recipe show page.


## Outside resources

- icons: https://fontawesome.com/

## Notes for instructor


I've added only the minimal styling necessary to use the UI properly.

In a few places, I've included "loading" states while API calls are pending in order to demonstrate understanding of that concept. I didn't use this pattern on _all_ elements which could use it (for instance, the recipe index) - but only where it would prevent confusing UX; like after marking a shopping list item 'acquired'. Without a loading state here the user may think they 'missed' the click target and could accidentally toggle the state multiple times without realizing.  
Similarly, I added an api-call-dependent `disabled` state to the "Save" button on the new recipe form to avoid accidental double-posts.

Known Problems:

- n+1 issue on shopping list view. would be solved by a join on the shopping list items with recipe components. Or by getting all recipe components used on this shopping list and then combining these two result sets in Vue with a `map` or related collection method.
- opening the 'add to shopping list' widget makes a call to the API each time it is opened. This could be solved by keeping the collection of shopping lists in the parent component and passing them into this 'widget', but that creates more of a developer maintenance burden on anyone who wants to use this component easily in the future. A better choice would be to keep these items in a general store.


