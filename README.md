Description

The Empty Room is a social platform for people to say things! I have created this so that a user is taken to the home page only when they are not logged in; if they are logged in the home page will redirect to the timeline page. When a new user signs up they will be able to submit their data to the database as they are automaticcaly redirected to the page and form.

Once a user is signed in they will be taken to the 'timeline' page where they can view posts from other users and like the posts if they so wish. The user can navigate into the public profile of other users by clicking on the name in the post of hovering over and clicking on the name in hover component. If the user selects to navigate into their own profile they will be taken to the 'my-profile' page which allows the user to see an edit posts functionality. This permits the user to also delete their post if they wish to do so, but will present a warning before completion.

There is a menu in the top right for users to navigate to their own profile and the timeline for the The Empty Room.

Users cannot view the private profiles of other users as this will redirect them to their own private profile if they attempt to enter the relevant url. The user will also be presented with a not found page if they seek to navigate to a user that doesn't exist.

Reflection

In order to look after my mental health I decided not to carry on with development on thias project. This is not a decision that I tool lightly as I an really annoyed at myself for not continuing to complete the additiional stretch goals and cleaning things up in terms of design.

I just couldn't figure out how to conditionally show the like button; I wanted to swap it for a dislike button with reverse finctionality but I think that perhaps the logic I used just wasn't the right logic to run this test, or I just got too burned out and couldn't think fully about it. The like functionality works and the user can only like once, so that was the foundational functionality sorted at least.

In terms of the other stretch goals, I was just burned out; I had plans to attain the followers functionality, which is why the hover component shows the data as pending.

I know that I can do more than this in terms of design, I just didn't find the time or energy over the weekend.

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

    	- junction table for following

        -  const followerQuery = (await (`INSERT INTO social_follow (user_id, currentuser_id) VALUES ($1, $2) RETURNING * WHERE user_id = $1`,[userId, currentUserId])).rows

    🏹 Enable users to like posts by linking their user_id to the liked_post in a junction table.

    ✔️ - I have created a table for likes joining user and post id --> I am able to update the shown amount of likes by updating the post_likes column.
    ✔️ - users can only like once

        - additional goal --> if the user has liked already, the feature is not available

    🏹 Ensure that a user’s biography cannot be left blank. If a user logs in without one, prompt them to add this information.

    	- logic to check if entry is incomplete and have popup to notify
            --> have the server call the data fpr the current user and have the alert pop up anywhere if(userID)
            --> I want to have a component that fetches --> the drop down menu.

    🏹 Create and display an error/not found page if the user visits another users profile that doesn’t exist.

    ✔️ - page will notify that the user does not exist if they go to a 'profile' page

    ✔️ - user page

Sources and Attributions

Tabs: https://www.radix-ui.com/primitives/docs/components/tabs

Dropdown Menu: https://www.radix-ui.com/primitives/docs/components/dropdown-menu

Dialog: https://www.radix-ui.com/primitives/docs/components/dialog

Hover: https://www.radix-ui.com/primitives/docs/components/hover-card
