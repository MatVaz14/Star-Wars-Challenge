# STAR WARS SWAPI

Deploy: **[Star Wars Swapi Challenge](https://star-wars-swapi-challenge.vercel.app)**

<p>
<em>
It is an application which allows you to search for characters from the Star Wars Universe, and be able to see the details of each of the characters.
</em><br />
1. At first there will be no character, since it will be waiting for the user to enter the name of a character or even a single letter will be enough to search for a variety of characters that include that letter.
</p>

![Screenshot](src/assets/screenshot1/search.png)

<p>
When you search for a character it can be displayed on the screen, as characters are added there will be more options in the filters.
<em>
It should be noted that 5 characters will be shown per page, so it has pagination
</em>
</p>

![Screenshot](src/assets/screenshot1/home3.png) 2. When you click on a character, additional information regarding that character will be displayed
![Screenshot](src/assets/screenshot1/Detail.png)

## EXAMPLE

<p>1. Search</p>

![Screenshot](src/assets/screenshot1/search.png)

<p>2. Loading</p>

![Screenshot](src/assets/screenshot1/Loading.png)

<p>3. Result</p>

![Screenshot](src/assets/screenshot1/Result.png)

<p>4. Detail</p>

![Screenshot](src/assets/screenshot1/Detail2.png)

## More Information

<p>
If the repository is cloned, the <code>npm start</code> command must be executed, since it must install dependencies and so on.
</p>

<hr />
<h2>Project structure</h2>

![Screenshot](src/assets/screenshot/structure.png)

<code>/src/api/index.js</code>

<p>In the 'api' folder it simulates a BackEnd. It was done that way since it was shown that it would be more convenient to obtain the information that way.</p>

<code>/src/components</code>

<p>The components that were considered necessary for the functionality of the project.</p>

<code>/src/pages</code>

<p>The page where only the components are assembled is only for re-rendering.</p>

<code>/src/store/StoreReducer.js</code>

<p>
Among the properties of InitialState, there are two properties marked on the image, which are to define the number of characters per page and the initial index
</p>

![Screenshot](src/assets/screenshot/reducer.png)

<hr />

<em>React, Javascript, CSS, AOS, Axios, SweetAlert were used for this project</em>
