# Photoshopify - Client

npm start

# TODO:

- [ ] All users will be able to search for any photo based on username
- [ ] All users will be able to search for registered photographer accounts.
- [ ] NEXT: All users will be able to search for any photo based on tags
- [ ] All users will be able to sort their searches by time, popularity, relevance
- [ ] All users will be able to view another photographer's page.
- [ ] Non-authenticated users will be able to create an account.
- [ ] Authenticated users will be able to add a single photo(s) to their page.
- [ ] Authenticated users will be able to delete a single photo(s) to their page.
- [ ] Authenticated users will be able to move around photos in their page.
- [ ] NEXT: Authenticated users will be able to like photos.
- [ ] LOW: Authenticated users will be able to follow photographers.
- [ ] LOW: Separate Register page to a 3 step horizontal stepper.

# Debugging:

- Form handling: Don't forget to add the name and value props in each TextField for the onChange
- Graphql mutation: Make sure the casing matches with the api specs and input to properly to avoid connection issues; else you get 400 error
- Password validation was buggy; Confirm validators are taking the correct input
- In SignupPage, addUser doesn't exist yet for useForm to use, so we use wrap it in a function registerUser() because in Javascript, 'function's are ran first
