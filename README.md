# Dr. Who Quiz - 30 Seconds to Doomsday

[Link to amiresponsive.com](https://ui.dev/amiresponsive?url=https://thespamster.github.io/dr_who_quiz/)

NB. There is a bug with the readme format that means internal links won't work if the headers they link to are capitalised hence the use of all lowercase headers throughout this document.

## contents

1.  [Introduction](#introduction)
2.  [UX Design](#ux-design)
    1.  [Strategy Plane](#strategy-plane)
        1.  [Creator Story](#the-creator-story)
        2. [User Story](#the-user-story)
    2.  [Scope Plane](#scope-plane)
    3.  [Structure Plane](#structure-plane)
    4.  [Skeleton Plane](#skeleton-plane)
    5.  [Surface Plane](#surface-plane)
3.  [Technologies Used](#technologies-used)
4.  [Initial build, Testing & Bugs](#building-and-testing)
5.  [Deployment](#deployment)
6.  [Credits](#credits)
7.  [Why Doctor Who?](#why-doctor-who)

## introduction

This is my second milestone project as part of a Level 5 Diploma in Web Development offered through the Code Institute and accredited through The College of West Anglia. This project builds on the HTML & CSS knowledge from the first milestone project and adds Javascript which increases the interactivity potential of a website. Here I will outline the process I took to build this project, the issues that have had to be overcome both expected and unexpected through the coding,testing and debugging of the project and its final deployment to Github Pages. 

The quiz can be played here [30 Seconds to Doomsday](https://thespamster.github.io/dr_who_quiz/)

## ux design

The project has been guided throughout by the five elements of ux design first laid down by Jesse James Garrett in their book 'The Elements of User Experience' and I used a condensed version of this which can be viewed through the link provided below.

[The Five Planes of UX Design](https://www.codecademy.com/resources/docs/uiux/five-elements-of-ux-design)

The five planes are as follows:

1.  [Strategy](#strategy-plane)
    1.  [Creator Story](#the-creator-story)
    2.  [User Story](#the-user-story)
2.  [Scope Plane](#scope-plane)
3.  [Structure Plane](#structure-plane)
4.  [Skeleton Plane](#skeleton-plane)
5.  [Surface Plane](#surface-plane)

Moving from the most abstract plane, strategy through to the most concrete plane, surface. These planes provide the framework for the successful development and deployment of this, and indeed any, project.

## strategy plane

There were essentially two stories to be considered during the design of this project. They were the creator's story and the user's story. 

### the creator story

As the creator I want the site to be as intuitive as possible. Navigation should be clear and obvious. From the off the purpose should be clear.

As the creator I want the site to be consistent in terms of features such as the button design, the text colour and background and the font used.

As the creator I want the site to engage the user both visually and audibly. However I want the user to be able to toggle the sound effects/music on/off.

As the creator I want the site to have an app like feel on mobile/tablet screens but one that will scale appropriately when viewed on larger displays.

As the creator I want a persistent high score to encourage repeat visits to the site and increased engagement from the users.

As the creator I want to be able to easily update/change the questions to keep the quiz fresh over time.

As the creator I want to provide a Dr. Who feel to the site without encountering any copyright/licensing issues.

As the creator and a Doctor Who fan I want the site to demonstrate an in depth knowledge of the subject material as I feel this will engage other Doctor Who fans.

### the user story

As a first time user I want the site to be visually appealing but not cluttered or too busy. I want the site to engage me and make me want to play the quiz.

As a first time user I want an easy explanation of the rules. I do not want to be confused about how to play.

As a first time user I want the site to be as intuitive as possible. There should be no confusion over navigation or purpose.

As a returning user I want to be able to try to beat my previous high score. I don't want to have to start again each time I return.

# scope plane

As a huge fan of Dr. Who I am aware of the near sixty year history of the show. The stories span multiple media types from TV broadcasts, DVD & Bluray releases, digital purchases, audiobooks, books, graphic novels and magazines. The decision was taken to create a quiz that focused on the classic era of TV shows that began in 1963 and ran until 1989. This allows the quiz to have a focus which I feel is better than the 'scatter gun' approach of trying to encompass all sixty years in a single quiz.

# structure plane

With the scope set on classic Who the structure of the quiz site could be laid down. It had to be a single page. The focus must never drift from the essentials of question and answer presentation. This then required that the rules also appear on that single page hence the use of a modal to display them. The features that enable the game to be played ie. the buttons must all be clearly labelled with no ambiguity about their purpose. Hence very obvious labelling such as 'START', 'RULES' etc. The background needs to say 'quiz' but at the same time not be too distracting.

# skeleton plane

(wireframes from reMarkable2 to be linked to here)

Initial wireframes of the layout of the site were drawn on the reMarkable 2 e-ink tablet and are presented here to show how the initial design of the site was developed.

# surface plane

The look needs to engage straight from when the site is first loaded so a background of question marks in bright but not overpowering colours has been used (see credits). Question marks formed part of the fifth, sixth and seven Doctor's outfits so suggest Dr. Who without any licensing issues. The font used is Roboto as it is a modern font that fits the look of the site perfectly, and as the site is one page no other fonts were deemed necessary. The text is presented in black on a white background to keep the title, scores, questions and answers clear against the colourful background. The answer buttons reverse this with black buttons and white text and the five other buttons, the volume toggle button, 'START', 'QUIT', 'RULES' and 'SIMPLIFY' employ a bright colour scheme that along with the button shadows ensure that they contrast well with the background wallpaper.

# technologies used

[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) : Used to provide the basic structure of the quiz website.

[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) : Used to provide the colour and styling elements of the quiz website. I decided that for this build all the code would be written by myself and no use has been made of libraries such as Bootstrap.

[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) : Used to provide the interactivite elements of the website. Again all the code has been written by myself with no use of any libraries. This decision was taken to demonstrate a fundamental understanding of the code and how it works.

[Google Fonts](https://fonts.google.com/) : As the subject matter of the quiz is a popular science fiction show I felt that a clean modern font was needed to best compliment the look of the site and Roboto fulfills that role.

[Font Awesome 4.7](https://fontawesome.com/v4/icons/) : Two icons were required for the sound on/off.

[mixkit](https://mixkit.co/) : Used to provide royalty/copyright free sound effects.

[Chrome Dev Tools](https://developer.chrome.com/docs/devtools/) : Used as the primary source for debugging the code and testing the sites responsiveness during the initial and subsequent site builds.

[Github & Git](https://github.com/) : Used to store and log the development of the site from its initial state through to completion.

[Visual Studio Code](https://code.visualstudio.com/) : Used as the primary integrated development environment.

[Stackblitz](https://stackblitz.com/) : Used as a cloud based alternative to VS Code.

[reMarkable 2](https://remarkable.com/?gclid=CjwKCAjw-eKpBhAbEiwAqFL0mjnSR2zODkqzP-cwnbtZjaD9ymtxH51xXF-P7hNAoczEilK_ouLNQRoCeSUQAvD_BwE) : Used to generate the initial wireframes during the design process. A quite remarkable e-ink tablet.

[W3C Markup Validation service](https://validator.w3.org/) : Used to ensure that both the HTML & CSS meet modern web requirements.

[JS Lint](https://www.jslint.com/) : Used to ensure that the Javascript used meets modern web requirements.

[amiresponsive](https://ui.dev/amiresponsive) : Used to ensure that the site is responsive across different screen formats.

# building and testing

Once the wireframe design had been completed and the basic site layout confirmed the first part of the build was getting the boilerplate HTML coded. Using placeholder text where necessary this gave an opportunity to visualise the game and ensure that basic design elements were all present and correct. After the HTML was in place the basic CSS was written and this added styling aspects including the background image, the size, colour and placement of the buttons, the positioning of the title banner, score banner, question banner and answer banners. Once the basic layout was complete tweaks were made to colours and opacity to improve the readability of the text. Right from the start I took the decision to not use libraries such as Bootstrap for CSS or Jquery for Javascript. This has ensured that all the code is 'vanilla' allowing me to demonstrate a fundamental understanding of how the languages HTML, CSS & Javascript work.

Initially I took the decision to build the various Javascript modules of the game separately using Stackblitz and then import them after testing into VS Code for the final build. However after a few hours it became obvious that I had not got the logic flow of the game quite right and I was unable to get the game to work without 'breaking' the code I was using. Using Chrome dev tools I was able to ascertain that the issue was one of recursion with the main game loop repeatedly calling itself which meant that the event listeners used to detect button presses multiplied and this eventually crashed the game. I took the decision to completely remove the Javascript and start again almost from scratch
whilst being able to repurpose some of the individual Javascript modules used to create the initial question array, displaying the answers and what happens at the end of the game.

The rebuilding of the code started with putting the event listeners for button presses into place and then adding the other functions in a modular style giving me the opportunity to progressively test the build with liberal use of console.log within Chrome dev tools to track individual variables and ensure that the code behaved in the manner I expected. This second build resulted in a game that whilst requiring refinements worked as it should. As the code was constructed I placed console.logs at the start and end of every function allowing me to follow the flow of variables throughout the game. By ensuring that every console.log contained the name of the function that it was in I could debug the game using Chrome's dev tools. 

One issue that I encountered was that during initial testing of the finished build the 'EASY' button intermittently didn't register a click. To debug this issue I checked that I was happy with the Javascript by utilising Console in devtools and then checked the HTML and CSS using Elements. It became apparent that the 'EASY' button was being partially obscured by a div element when a longer question was being displayed thus preventing the click detection. To resolve this issue I simply set the z-index of the button to 1 ensuring that it stays ontop of any other elements.

Another issue I had was that if you answered a question with only a second left on the timer the games countdown would continue down past -1 rather than resetting to 30 causing the game to break. To overcome this a small delay was introduced to the calling of the endgame function allowing the games other functions to complete first ensuring that the game resets/restarts correctly.

The build takes care to avoid allowing people to play the quiz and answer correctly on the basis of a learned pattern. In the Json file the first answer is always the correct one. To avoid any obvious patterns the quiz starts with a random question from 1 to 42. The 3 possible answers are then randomised in how they are displayed and if the player simplifies the questions by removing one this is also randomised thus ensuring that no two games should be the same in terms of displayed answers.

Occasionally the game would crash unexpectedly with an error stating that the question didn't exist in the question array. By following the console.log traces of the questionsLeft variable I discovered that the question array was not being rebuilt at the end of each game so rather than the game starting with 42 questions it could be less than this. This caused an issue because when starting a new game the random question to be asked could be of a higher value than the number of questions in the array causing an undefined question array error in the console and the game would crash. A small function createQuestionArray was built in Javascript to rebuild the question array and this is called during the endGame function ensuring that the game always starts with 42 questions. The function to build the question array as an error function built into it so that any error during the build is reported to the console.

The game handles getting all the questions right without simplifying any a little differently to any other high score and there was an issue where the maximum score of 84 was not being saved so that when reloading the site the previous high score was displayed. This was traced to the maximum score not being written to the cookie and a couple of lines of code were introduced to correct this.

There was also an issue of the game very occasionally not ending correctly and getting stuck in a 0 score end of game loop. This was traced to a misspelling of the 'playingGame' flag as 'playGame' meaning that the 'playingGame' flag remained in a True state rather than being reset to False meaning that the game tried to continue and got stuck in a infinite loop.

Another issue that needed addressing was that there was a slight delay of 1 second from when a question was asked to the timer starting to countdown. This meant that the user gets 31 seconds to answer a question. A 1 second delay was introduced to the displaying of a question to resolve this issue and ensure that the two events synchronised correctly.

Following feedback from my mentor I introduced a volume toggle button and this introduced an asymmetry into the button layout at the top of the site which I felt spoiled the look of the game. As my mentor had also suuggested an option to quit the quiz I introduced a 'QUIT' button restoring the symmetry to the button layout. The 'START' and 'QUIT' buttons only display their text when you can select them. My tester John mentioned that this should also apply to the 'SIMPLIFY' button. The code was modified so that all the buttons only display their text when they can be selected. This helps to make it obvious what a users choices are when playing. Also as the 'START' 'QUIT' and 'SIMPLIFY' event listeners are triggered by the text of the button removing the text prevents inappropriate button presses and ensures that the only actions taken are ones allowed at that point in the game. The two exceptions to this are the volume toggle button which is available at any point and the 'RULES' button that triggers the modal which has its own process.

The 'QUIT' button introduced a bug where if you had a high score and quit your score would be reset to 0 and you lose but the high score would remain. A new variable of previousHighScore was introduced to enable the highScore variable to be reset to its previous value under these conditions.

My mentor also suggested hiding the answer buttons and answer spans when a game was not being played. The simple addition of either hiding the answerButtonPos div or making the div visible at appropriate points in the game gave the required effect.

# deployment

# credits

[iStock by Getty Images](https://www.istockphoto.com/) : paid for question mark background image.

[Stackoverflow](https://stackoverflow.com/) : A great resource for getting answers to coding issues.

[codecademy](https://www.codecademy.com/) : A great resource for getting answers to coding questions.

[w3schools](https://www.w3schools.com/) : A great resource for getting answers to coding questions.

Koko (seun_mentor) : My code institute mentor. As ever offered excellent feedback and advice during this build.

John : A long time friend and someone with great attention to detail. A perfect person to use as a tester.

# why doctor who

This has been a bit of a labour of love for me as I am, you may have guessed already, a huge fan of Dr. Who. Ever since hiding behind the sofa as a child watching the Daleks I have had a love of the show. When I decided to set out to create this quiz there were a few things to consider. Although I am not planning on releasing this quiz into the wild I wanted to ensure that everything was above board and legal. To that end I considered the following:

1. The site musn't use any copyrighted material. No links to any external material that may not have permission to exist, or may be taken down creating broken links on this site. The decision was taken to use a background that would say 'Dr. Who' to a fan so a question mark background was purchased to enable this. Not only do question marks evoke the nature of a quiz but the 5th, 6th & 7th Doctor's costumes all used the question mark in some way or another.

2.  Directly following on from the first point all the sound effects/music used are royalty free again avoiding any licensing issues.

3.  The questions were all considered and created by myself. I am sure other people's Dr. Who quizzes contain similar questions but I did not want to just take someone else's questions for my quiz.



[Back to the top](#contents)



