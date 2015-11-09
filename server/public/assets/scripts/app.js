var messages;

$(document).ready(function(){

    getData();
    $("#submitPost").on('click', postMessage);
    //$('.message-posts').on('click', '.delete', deleteMessage);

});

function appendDom(){

    $('.message-posts').hide().fadeIn(500).empty();

    for (var i = 0; i < messages.length; i++) {

            $('.message-posts').append('<div class="col-md-3"><div class="well">'
                + messages[i].name + ': '
                + '<span class="text-uppercase"><i>' + messages[i].message + '</i></span>'+
                //+ '<br>' + "<button class='delete btn btn-sm btn-danger' data-id='" +
                //data[i]._id + "'>Delete</button>" +
                '</div></div>');
        }
}

function getData (){
    $.ajax({
        type: "GET",
        url: "/data",
        success: function(data){
            messages = data;
            console.log(data);
            appendDom(data);
        }
    })
}

function postMessage() {
    event.preventDefault();
    var values = {};

    $.each($('#form').serializeArray(), function(i, field){
        values[field.name] = field.value;
        $("#form").find("textarea").val("");
        $("#form").find("input").val("");

    });
    console.log(values);
    $.ajax({
        type: "POST",
        url: "/data",
        data: values,
        success: function(data){
            console.log(data);
            getData(data);
            appendDom(data);
        }
    });
}

//function deleteMessage() {
//    var deletedId =  {"id" : $(this).data('id')};
//    $.ajax({
//        type: "DELETE",
//        url: "/data/admin",
//        data: deletedId,
//        success: function(data){
//            console.log(data);
//            getData(data);
//        }
//    })
//}