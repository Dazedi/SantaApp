# Notes

Developed on local machine and imported to glitch.com

## Changes 

1. Changed folder structure
2. Changed server and client to use typescript
3. Changed client to use webpack and react
4. Re-created the UI with react and added error/success messages
5. Added config handler / validator
6. Added models for User, UserProfile and Wish, where User and UserProfile uses the provided json url, and Wish is handled in-memory.
7. Added controller and routes
8. Added task for cron to try and mail every 15 minutes

After re-checking the README.md, the documentation says

> If the child is not registered (no match for the user id) or more than 10years old, the webapp should display a basic **error page** with an error message explaining the problem.
> If the child is registered and less than 10 years old, the server should show **a page** indicating that the request has been received.

so, I'm changing the UI from just showing the error / success on the form, to display different components
after submitting the form.