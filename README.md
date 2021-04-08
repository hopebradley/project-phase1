ARTSEARCH

ArtSearch is an easy-to-use tool that allows a user to access the thousands of artworks in the Metropolitan Museum of Art database, one at a time and according to a certain criteria. The application supports a search-by-keyword method as well as a category choosing method.

This application is made up of HTML, CSS, and JavaScript.

To install the project and see it in action, simply clone it onto your machine and then open the file called index.html in your browser. 

Since ArtSearch is a smaller application, most of its features are self-explanatory. When it loads, there is both a search bar and a drop down menu. Choose one OR the other; unfortunately, they don't work together. When a keyword is submitted or an option from the menu is chosen, a random artwork from an array of keyword-related artwork objects will be displayed below. 
The first artwork you see is a random piece related to flowers, and if you search flowers again you will get a different artwork related to flowers. If you search a more specific word multiple times, unique results aren't guaranteed; there might just be one or two artworks that match the criteria!
Sometimes, it might seem like the displayed artwork is unrelated to the keyword. This is because the application searches ALL properties of the artwork for this keyword, not just the title. Your keyword may be found in the title, but it could also be found in the artist's name, the department name, the time period, the category, you name it. Therefore, although the art shown is always connected somehow to the keyword, it might not be obvious.

Acknowledgments

The Metropolitan Museum of Art has an amazing public API that allows access to all the artworks in this project.
The link to the API and its instructions is here: https://metmuseum.github.io/
And the link to their github page is here: https://github.com/metmuseum/

To contact me:

Hope Bradley
hope.e.bradley@gmail.com
https://www.linkedin.com/in/hopebradl3y/