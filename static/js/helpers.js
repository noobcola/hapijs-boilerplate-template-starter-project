function showAlert(type, message){
    var alert = $( $('#alert-template').html() );
    alert.addClass('alert-'+type);
    alert.find('.message').html(message);
    $('.alert-container').html(alert);
}

function callApi(params, callback){
    var opts = {
        method: "GET",
        url: "http://localhost:8000" + params.endpoint,
        dataType: 'json',
        async: true,
        success: function(data){
            callback(null, data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            callback(errorThrown);
        }
    }

    Object.assign(opts, params);

    $.ajax(opts);
}