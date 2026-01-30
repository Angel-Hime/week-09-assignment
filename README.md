Description

<!--  -->

Reflection

<!--  -->

Requirements

    🎯 Set up user sign-up and user login using Clerk.

    ✔️	- home page with links to sign in and sign up

    🎯 Create and display an error/not found page if the user visits a page that doesn’t exist.

    ✔️ - not found pages for user profile, as specific page, and for other pages

    🎯 Use 1 or more Radix UI Primitive component, or something similar (e.g. use of a different component library to enhance UX, not just Tailwind).

    ✔️ - radix / motion

    🎯 Enable users to create a user profile, and input profile information (such as a user biography) using a form. Users and user information should be stored in their own table in the database and handled with an appropriate route.

    ✔️ - username bio location interests , remove the email address (showing it only) --> auth is authentication; current user

    🎯 Enable users to create posts associated with their Clerk userId. Posts should be displayed on the user’s profile page.

    ✔️ - table for posts --> foreign key = userID

Stretch Requirements

    🏹 Allow users to update their content. You can achieve this either with a dynamic route (“/posts/[id]/edit”) or by creating a modal.

    ✔️ - users can enter their profile page and see their comments and edit them accordingly

    🏹 Allow users to delete their content.

    ✔️ - users can go to edit and, during the edit process, are provided with a delete button.

    🏹 Allow users to view other profiles directly from posts they see on the global timeline, using a dynamic users route (e.g. /user/[userId]).

    ✔️ - using a separate route /timeline/user/[username] I have created a public profile page

    🏹 Let users follow each other by establishing a follower and followee relationship between profiles.

    	-

    🏹 Enable users to like posts by linking their user_id to the liked_post in a junction table.

    	- I have created a table for likes joining user and post id --> I am able to update the shown amount of likes by updating the post_likes column.
        --> I need to now ensure that if the user has liked already, the feature is not available

    🏹 Ensure that a user’s biography cannot be left blank. If a user logs in without one, prompt them to add this information.

    	- logic to check in entry is incomplete and have popup to notify
            --> have the server call the data and have the alert pop up anywhere if(userID)

    🏹 Create and display an error/not found page if the user visits another users profile that doesn’t exist.

    ✔️ - page will notify that the user does not exist if they go to a 'profile' page

    ✔️ - user page

Sources and Attributions

Tabs: https://www.radix-ui.com/primitives/docs/components/tabs

Dropdown Menu: https://www.radix-ui.com/primitives/docs/components/dropdown-menu

Dialog: https://www.radix-ui.com/primitives/docs/components/dialog
