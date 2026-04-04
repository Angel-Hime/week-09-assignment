# week-09-assignment 

# Social Media Apllication 

__Project Overview__

The Empty Room is a social platform for people to say things! I have created this so that a user is taken to the home page only when they are not logged in; if they are logged in the home page will redirect to the timeline page. When a new user signs up they will be able to submit their data to the database as they are automaticcaly redirected to the page and form.

Once a user is signed in they will be taken to the 'timeline' page where they can view posts from other users and like the posts if they so wish. The user can navigate into the public profile of other users by clicking on the name in the post of hovering over and clicking on the name in hover component. If the user selects to navigate into their own profile they will be taken to the 'my-profile' page which allows the user to see an edit posts functionality. This permits the user to also delete their post if they wish to do so, but will present a warning before completion.

There is a menu in the top right for users to navigate to their own profile and the timeline for the The Empty Room.

Users cannot view the private profiles of other users as this will redirect them to their own private profile if they attempt to enter the relevant url. The user will also be presented with a not found page if they seek to navigate to a user that doesn't exist.

__Reflection__

Requirements

🎯 Set up user sign-up and user login using Clerk.

    [x] home page with links to sign in and sign up

🎯 Create and display an error/not found page if the user visits a page that doesn’t exist.

    [x] not found pages for user profile, as specific page, and for other pages

🎯 Use 1 or more Radix UI Primitive component, or something similar (e.g. use of a different component library to enhance UX, not just Tailwind).

    [x] radix / motion

🎯 Enable users to create a user profile, and input profile information (such as a user biography) using a form. Users and user information should be stored in their own table in the database and handled with an appropriate route.

    [x] username bio location interests , remove the email address (showing it only) --> auth is authentication; current user

🎯 Enable users to create posts associated with their Clerk userId. Posts should be displayed on the user’s profile page.

    [x] table for posts --> foreign key = userID

Stretch Requirements

🏹 Allow users to update their content. You can achieve this either with a dynamic route (“/posts/[id]/edit”) or by creating a modal.

    [x] users can enter their profile page and see their comments and edit them accordingly

🏹 Allow users to delete their content.

    [x] users can go to edit and, during the edit process, are provided with a delete button.

🏹 Allow users to view other profiles directly from posts they see on the global timeline, using a dynamic users route (e.g. /user/[userId]).

    [x] using a separate route /timeline/user/[username] I have created a public profile page

🏹 Let users follow each other by establishing a follower and followee relationship between profiles.

    	- junction table for following

        -  const followerQuery = (await (`INSERT INTO social_follow (user_id, currentuser_id) VALUES ($1, $2) RETURNING * WHERE user_id = $1`,[userId, currentUserId])).rows

🏹 Enable users to like posts by linking their user_id to the liked_post in a junction table.

    [x] I have created a table for likes joining user and post id --> I am able to update the shown amount of likes by updating the post_likes column.
    [x] users can only like once

        - additional goal --> if the user has liked already, the feature is not available

🏹 Ensure that a user’s biography cannot be left blank. If a user logs in without one, prompt them to add this information.

    	- logic to check if entry is incomplete and have popup to notify
            --> have the server call the data fpr the current user and have the alert pop up anywhere if(userID)
            --> I want to have a component that fetches --> the drop down menu.

🏹 Create and display an error/not found page if the user visits another users profile that doesn’t exist.

    [x] page will notify that the user does not exist if they go to a 'profile' page

    [x] user page

My design on this project was not complete but I believe that I learned invaluable skills for future projects and continue to work on my design skills and css knowledge

There were additional features that I was not able to achieve in this project, including some personal goals that were set. Some code is included in the repo as that was being worked on but, due to time constraints, was not completed.

Sources:

    Tabs: https://www.radix-ui.com/primitives/docs/components/tabs
    
    Dropdown Menu: https://www.radix-ui.com/primitives/docs/components/dropdown-menu
    
    Dialog: https://www.radix-ui.com/primitives/docs/components/dialog
    
    Hover: https://www.radix-ui.com/primitives/docs/components/hover-card
