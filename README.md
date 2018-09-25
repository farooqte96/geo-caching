# Geo-Caching Items on Google Map

This project utilizes nodejs environment to create a REST API for geo-caching. 
From its front-end, we can do the following:

1. Create an Item: To create an item, an item's location, name and description is asked from user. Then from location, node-geocode api gets the corresponding coordinates and save the item's name, longitude, latitude and description into a database.
2. Edit/Update an Item: The main menu shows the list of all items. When a single item is clicked, the resulting view shows the information about item and an option to update its location.
3. Delete an Item: Delete button deletes an item from the list.
4. Display all items on Map: When we have added all items location into database, then Google Maps API is used to display all those items on Google Map.


# Installation: 
npm install package.json will install the project dependencies. Other requirements include mongodB service.
### Demo Run of REST API:
[![MEC Demo Video](http://www.systemsolutionsdevelopment.com/wp-content/uploads/2017/07/Product-DemoVideo-1.jpg)](https://vimeo.com/291399991)
