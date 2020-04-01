$(function () {

    var ok = 1;
    var cl_orange = '#FF9933';
    var cl_green = '#66CC00';

    // Animer la route

    function deplace() {
        $('.fond').animate({top: '-=360'},
            500, 'linear', function () {
                $('.fond').css('top', 0);
                deplace();
            });

        // Afficher et déplacer la voiture rouge

        $('#vr').animate({top: '-=600'}, 1500, 'linear', function () {
            var vrX = Math.floor(Math.random()*194)+70;
            var vrY = 400;
            $('#vr').css('top', vrY);
            $('#vr').css('left', vrX)
            ok = 1;
        });
    };

    // Deplacer la voiture jaune (39 =  droite, 37 = touche gauche)

    $(document).on('keydown', function (e){

        //deplacement à droite
        if (e.which == 39)
        {
            vjX = parseInt($('#vjBox').css('left'));
            if (vjX < 280)
                $('#vjBox').css('left', vjX+30);
        }

        //deplacement à gauche
        if (e.which == 37)
        {
            vjX = parseInt($('#vjBox').css('left'));
            if (vjX > 70)
                $('#vjBox').css('left', vjX-30);
        }
    });

    //  Détecter les collisions
    function collision() {
        vjX = parseInt($('#vjBox').css('left'));
        vrX = parseInt($('#vr').css('left'));
        vjY = 10;
        vrY = parseInt($('#vr').css('top'));

        $info = $('#info');
        $title = $('.title');
        $explosion = $('#explosion');

        if (((vrX > vjX) && (vrX < (vjX+66)) && (vrY > vjY) && (vrY < (vjY+150)) &&(ok == 1))
            || ((vjX > vrX) && (vjX < (vrX+66)) && (vrY > vjY) && (vrY < (vjY+150)) && (ok == 1)))
        {
            $('#son')[0].play();

            var collision = parseInt($('#info').text()) + 1;
            $info.text(collision);
            $info.addClass('alert');

            // $title.animate({'background-color': cl_orange}, 500, function () {
            //     $(this).css('background-color', cl_green);
            // });
            // $title.css('background-color', cl_orange);

            //même résultat que le code juste au dessus
            $title.animate({'background-color': cl_orange}, {queue:true, duration:500})
                .animate({'background-color': cl_green});


            $explosion.animate({'display': 'block'}, 500, function () {
                $explosion.css('display', 'none');
            });
            $explosion.css('display', 'block');

            //NE FONCTIONNE PAS
            // $explosion.animate({'display': 'block'}, {queue:true, duration:500})
            //     .animate({'display': 'none'});

            if (collision > 9 ) {
                stopGame();
                $('#gameOver').css('display', 'block');
            }

            ok = 0;
        };
    };

    function stopGame(){
        $('.fond').stop(true, false);
        $('#vr').stop(true, false);
    };

    setInterval(collision, 20);


    // Ajout de bouton pour démarrer et stopper le jeu

    $('#play').on('click', function () {
        deplace();
    });


    $('#stop').on('click', function () {
        stopGame();
    });

    $('#reset').on('click', function () {
        location.reload();
    });
});