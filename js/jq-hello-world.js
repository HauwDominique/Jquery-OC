$(function() {

    $('#texteJQ').html('Hello world via jquery').css('color', 'blue');
    var count = $('span').length;
    console.log(count);

    $("#texteJQ").fadeOut("slow",function(){
        $(this).fadeIn("slow");
    });

});