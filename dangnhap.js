$(document).ready(function(){
    $('#eye').click(function(){
        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-poo-storm fa-poo');
        if($(this).hasClass('open')){
            $(this).prev().attr('type', 'text');
        }else{
            $(this).prev().attr('type', 'password');
        }
    });
});