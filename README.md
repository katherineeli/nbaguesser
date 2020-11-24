## Welcome to NBA Guesser!

NBA Guesser is our web game where you are given a set of statistics from an NBA player and you try to guess who the player is. This is a competitive game where you can compare your scores to your friends on the leaderboard. The statistics used are from the 2018-2019 season

### How to Use the App

Create an account using the login button on the top right of the navigation bar, or scroll down to the bottom of the home page and click sign up! Your score will be associated with your account information. Once you sign up or log in, the website will automatically take you to our game. 

You have 3 minutes to guess as many NBA players as possible. You can choose to skip if you are stuck on a player at the expense of 4 seconds. At the end of the 3 minutes, your score will be sent to our backend where it saves each user's maximum score. 

Click on the leaderboard button on the navigation bar to see how your score compares to everyone else's!

### App Features 

- Sign in and login page 
- User can create and update their display name 
- User can delete their account 
- Autocomplete input form with all the NBA player's names as options 
- Utilizes balldontlie.io as the API to fetch NBA player data 
- Leaderboard to compare users' scores
- Firebase backend to retrieve each user's profile and score


### Backend 

Our application utilizes Firebase as the backend. It saves user account information such as their username and password, along with their display name and their maximum score. Display name can be updated by the user's choosing, and their score is updated only if their new score on the game is greater than their score in the backend. 

Users can choose to delete their account if they would like. 