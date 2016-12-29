Neighborhood Map Project
===============

Overview
--------
This project is part of Udacity Front End Nanodegree and shows how to use Knockout.js to work with different APIS. In this project, the Google Maps and FourSquare API are used. Knockout handles the list of locations in the model, the Google Maps API create a map and put markers in the locations, and open information windows when this markers are clicked. FourSquare API fills the windows with information like visits, link to twitter, and phone number (if there is any). 

Additionally, there is an input field that allows the users to filter the locations by name. Thanks to the use of Knockout observables, the map refreshes without the user having to refresh the website.

Running Instructions
--------
To run the website, first, open a local python server.

    python -m SimpleHTTPServer 8080

You can open the website at localhost:8080 or using ngrok. 

    ngrok http 8080

