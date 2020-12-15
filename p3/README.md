# Project 3
+ By: Vinney Cavallo
+ Production URL: <http://p3.vinney.xyz>

## Outside resources

None

## Notes for instructor

- **Validation**: I only added validation in the `RecipeShow.vue` component as a way to demonstrate my understanding. I hope that by writing a (maybe weird) custom client-side validation scheme as well as extracting out the `ErrorList` component I make up for the fact that other forms elsewhere don't include any validation.
- Re above: an improvement would be to clear the error messages (both client and server) upon change of the field. Even better, the various `input` elements could be wrapped in components that take validation rules and handle themselves entirely (similar to frameworks like Vuetify). It's enlightening building this stuff up from scratch and seeing how the popular frameworks may have evolved!
- I added a page that acts as a trigger for the re-seed of the database. This is used by some tests in order to guarantee and clean DB state. This seemed to be a quick way to handle this, making use of existing API functionality - although I would _not_ do this in a production application :)
- Some of the tests randomly fail for rate-limit reasons. After some research it seems like this is a Laravel setting that was a bit beyond my PHP skills to try and disable.


Known Problems:

- The following problem from `p2` has been solved in `p3`: "opening the 'add to shopping list' widget makes a call to the API each time it is opened. This could be solved by keeping the collection of shopping lists in the parent component and passing them into this 'widget', but that creates more of a developer maintenance burden on anyone who wants to use this component easily in the future. A better choice would be to **keep these items in a general store**."


