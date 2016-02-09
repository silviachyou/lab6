'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);
	$('#randImgBtn').click(getImage);
	$('#colorBtn').click(randomizeColors);

}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
	//Will get a result from the url and pass it to addProject function
	$.get("/project/"+idNumber, addProject);
	
	console.log("User clicked on project " + idNumber);
}

function addProject(result){
	console.log(result);
	var id = result['id'];
	var projectHTML = '<img src="' + result['image'] + '" class="detailsImage">' 
									+ '<h4>' + result['date'] + '</h4>'
									+ '<p>' + result['summary'] + '</p>';
	$('#project'+id+' .details').html(projectHTML);
}

function getImage(e){
	e.preventDefault();
	$.get('http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx=-180&miny=-90&maxx=180&maxy=90&size=medium&mapfilter=true', showImage, 'jsonp');
}

function showImage(result){
	console.log(result);
	var randomPhoto = Math.floor(result['photos'].length * Math.random());
	var imgURL = result['photos'][randomPhoto]['photo_file_url'];
	$('#randomImage').html('<img src="' + imgURL + '">');
}
/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", changeColor);
}

function showDoodle(result){
	console.log(result);
	var randomPhoto = Math.floor(result['photos'].length * Math.random());
	console.log(randomPhoto);
}

function changeColor(result){
	var colors = result['colors']['hex'];
	console.log(colors);
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}