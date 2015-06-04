$(document).ready(function () {

    $('.save').click(function(){

        if($('#user_name').text() != null){

            $.ajax({
                data:{val: $('#user_name').text()},
                url: "/add_data",
                success: function(response){

                    if($.isEmptyObject( response )){
                        alert("successfully added");
                    }
                }
            });
        }
        else{
            alert("if you want to save your data, please enter your name");
        }

    });



    $('.exit_lose').click(function () {
        $('#modal_win')
            .animate({opacity: 0, top: '45%'}, 200,
            function () {
                $(this).css('display', 'none');
                $('#overlay').fadeOut(400);
            }
        );
    });
    $('.exit_win').click(function () {
        $('#modal_lose')
            .animate({opacity: 0, top: '45%'}, 200,
            function () {
                $(this).css('display', 'none');
                $('#overlay').fadeOut(400);
            }
        );
    });
    $('#modal_close, #overlay').click(function () {
        $('#modal_win')
            .animate({opacity: 0, top: '45%'}, 200,
            function () {
                $(this).css('display', 'none');
                $('#overlay').fadeOut(400);
            }
        );
    });
    $('#modal_close, #overlay').click(function () {
        $('#modal_lose')
            .animate({opacity: 0, top: '45%'}, 200,
            function () {
                $(this).css('display', 'none');
                $('#overlay').fadeOut(400);
            }
        );
    });
    $(".hasclear").keyup(function () {
        var t = $(this);
        t.next('span').toggle(Boolean(t.val()));
    });

    $(".clearer").hide($(this).prev('input').val());

    $(".clearer").click(function () {
        $(this).prev('input').val('').focus();
        $(this).hide();
    });

    $('.try_again').click(function () {
        window.location.reload();
    });
    $('.num').click(function () {
        $('.user_code').val($('.user_code').val() + $(this).text());
        if ($('.user_code').val().length == 4) {

            $('.user_code').val($('.user_code').val() + '');
            var text = $('.output_game').val();

            var new_text = $('.user_code').val();
            $.ajax({
                data: {val: String($('.user_code').val())},
                url: "/check",

                success: function (response) {
                    if (response == "You win") {
                        $('#overlay').fadeIn(200, function () {
                            $('#modal_win')
                                .css('display', 'block')
                                .animate({opacity: 1, top: '50%'}, 200);
                        });

                    }
                    else if (response == "Game over" || $('.attempt').text()==0) {
                        $('#overlay').fadeIn(200, function () {
                            $('#modal_lose')
                                .css('display', 'block')
                                .animate({opacity: 1, top: '50%'}, 200);
                        });
                    } else {
                        $.ajax({
                            url: "/get_move",
                            success: function (response) {

                                $('.attempt').text(response);


                            }
                        });
                        $('.checked_answer').val(response);
                        $('.output_game').val(text + "Your number is: " + new_text + "  |  Result: " + response + "\n");
                    }


                }
            });



            $('.user_code').val('');



        }
        else {

        }
    });

    $('.num-hint').click(function () {
        $.ajax({
            url: "/hint",
            success: function (response) {
                var text = $('.output_game').val();
                $('.output_game').val(text + "\n" + response + "\n");


            }
        });
    });


});