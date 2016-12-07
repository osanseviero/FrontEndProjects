Website Optimization Project
===============

Overview
--------
This project is part of Udacity Front End Nanodegree and shows how to optimize different parts of a website.


Running Instructions
--------
To run the website, first, open a local python server.

    python -m SimpleHTTPServer 8080

You can open the website at localhost:8080 or using ngrok. 

    ngrok http 8080

Configuration Instructions
----------------
All the development files are located at the /src directory, and the production files are located at the /dest directory. 

To be able to use Grunt, the development dependencies need to be installed. Run the following command to add all the node modules to the project:

    npm install

The Gruntfile.js makes different changes to the website (refer to the changes section). To run Grunt, execute the following command:

    grunt

Changes
----------------
Gruntfile makes the following changes to all the project:

 - Minifies all CSS with cssmin.
 - Minifies all HTML with htmlmin.
 - Compress all the images with imagemin.
 - Uglifies the JavaScript with uglify.
 - Inlines the CSS with inline.
 - Change the size of heavy images using responsive_images.
 
The CSS files to be inlines need to have the argument `__inline=true`. This is done in the important CSS files so they don't block the CRP.

    <link href="css/style.css?__inline=true" rel="stylesheet">

Other changes done in the project

 - Not essential JavaScript (like analytics) was moved to the end of the HTML (Google Analytics):
 - Fonts were loaded using Web Font Loader so they didn't block CRP.
 - main.js file was changed so it didn't access layout properties and changed the style continuously. 
 - Reduced the number of pizza elements created.