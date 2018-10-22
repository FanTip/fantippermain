$(function(){
    // JQuery implementation to call login functions in passport
    // Ajax object is used to pass the authentication 
    $('#login-form').on('submit', function(event){
        event.preventDefault();
        console.log('came here');
        var csrf = $('#_csrf').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var data = {
            _csrf : csrf,
            email : email,
            password : password
        }
        console.log(data);
        var xhr = $.ajax({
            type : 'POST',
            crossDomain : false,
            data : data,
            url : '/login'
        });
        xhr.done(function(response){
            toastr.success('Logged in successfully!');
            $(location).attr('href', '/profile');
            
        }).fail(function(response){
            console.log(response);
            toastr.error('Check your yousername/password again!');
        });

        console.log(xhr);
    });


    // JQuery implementation to call the signup functions in the passport
    // Ajax object is used to pass the authentication 
    $('#signup-form').on('submit', function(event){
        event.preventDefault();
        console.log('dhdd');
        var csrf = $('#_csrf').val();
        var name = $('#name').val();
        var email = $('#signup_email').val();
        var password = $('#signup_password').val();
        var _location = $('#location').val();
        var data = {
            _csrf : csrf,
            name : name,
            email : email,
            password : password,
            location : _location
        }
        var xhr = $.ajax({
            type : 'POST',
            crossDomain : false,
            data : data,
            url : '/signup'
        })
        xhr.done(function(response){
            $(location).attr('href', '/profile');
            toastr.success('Logged in successfully!');
            console.log(response);
        }).fail(function(response){
            toastr.error(response);
            
        });
    });


    $('#facebook-button-login').click(function(){
        $(location).attr('href', '/login/facebook');
    });

    $('#facebook-button-signup').click(function(){
        $(location).attr('href', '/login/facebook');
    });

    $('#google-button-signup').click(function(){
        $(location).attr('href', '/auth/google');
    });

    $('#google-button-login').click(function(){
        $(location).attr('href', '/auth/google');
    });
});