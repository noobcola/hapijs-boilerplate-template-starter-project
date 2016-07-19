function showAlert(type, message){
    var alert = $( $('#alert-template').html() );
    alert.addClass('alert-'+type);
    alert.find('.message').html(message);
    $('.alert-container').html(alert);
}