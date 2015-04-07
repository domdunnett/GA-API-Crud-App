$(document).ready(function(){

	setInterval(updateList, 1000);

	function updateList() {
		$.ajax({
	    type: 'GET',
	    url: 'http://ga-wdi-api.meteor.com/api/posts/',
	    dataType: 'json',
	    success: function(response){
	        $('#posts').html('');
	        $(response).each(function() {
		        $('#posts').prepend('<tr><td>' + this._id + '</td><td>' + this.title + '</td><td>' + this.text + '</td><td>' + this.user + '</td></tr>');	
        	});
      }
		});
	}

	$('#new-post').on('click', function() {

		var userInput = $('#new-post-input').val();

		$.ajax({

	    type: 'POST',
	    url: 'http://ga-wdi-api.meteor.com/api/posts/',
	    data: {
	        user: 'Dom',
	        title: 'My Title',
	        text: userInput
	    },
	    dataType: 'json',
		});

	});

	$('#update-post').on('click', function() {

		var userInput = $('#update-post-input').val();
		var postId = $('#update-post-id').val();
		var postTitle;
		var postUser;

		
		$.ajax({
	    type: 'GET',
	    url: 'http://ga-wdi-api.meteor.com/api/posts/' + postId,
	    dataType: 'json',
	    success: function(response){
	    	postTitle = response.title;
	    	postUser = response.user;
      }
		});

		$.ajax({

	    type: 'PUT',
	    url: 'http://ga-wdi-api.meteor.com/api/posts/' + postId,
	    data: {
        user: postUser,
        title: postTitle,
        text: userInput
	    },
	    dataType: 'json'
		});
	
	});

	$('#delete-post').on('click', function() {

		var userInput = $('#delete-post-input').val();

		$.ajax({

	    type: 'DELETE',
	    url: 'http://ga-wdi-api.meteor.com/api/posts/' + userInput

		});

	});

})
