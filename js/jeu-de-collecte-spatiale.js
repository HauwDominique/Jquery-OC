$(function () {

    $cow = $('#cow');
    $car = $('#car')
    navette = $('#navette');
    stopDetection = 0;

    $(document).on('keydown', function (e){

        posX = parseInt($('#navette').css('left'));
        posY = parseInt($('#navette').css('top'));

        // Deplacer le vaisseau à DROITE
        if (e.which == 39) {
            if(posX <625) {
                navette.css('left', posX+=72.5);
            };
        };

        // Deplacer le vaisseau à GAUCHE
        if(e.which == 37) {
            if(posX > 75) {
                navette.css('left', posX-=72.5);
            };
        };

        // Deplacer le vaisseau en HAUT
        if(e.which == 38) {
            if (posY > 10 ) {
                navette.css('top', posY-=82);
            };
        };

        // Deplacer le vaisseau en BAS
        if(e.which == 40) {
            if (posY < 370 ) {
                navette.css('top', posY+=82);
            };
        };

        // Deplacer le vaisseau en HAUT GAUCHE
        if(e.which == 36) {
            if (posX > 75 && posY > 10) {
                navette.css({'left': posX-=72.5, 'top': posY-=82});
            };
        };

        // Deplacer le vaisseau en HAUT DROITE
        if(e.which == 33) {
          if(posX < 625 && posY > 10) {
              navette.css({'left': posX +=72.5, 'top': posY-=82});
          };
        };

        // Deplacer le vaisseau en BAS GAUCHE
        if(e.which == 35) {
            if (posX > 75 && posY < 370) {
                navette.css({'left': posX -= 72.5, 'top': posY += 82});
            };
        };

        // Deplacer le vaisseau en BAS DROITE
        if(e.which == 34) {
            if (posX < 625 && posY < 370) {
                navette.css({'left': posX += 72.5, 'top': posY += 82});
            };
        };
    });

    // FAIRE APPARAITRE LA VACHE OU LA VOITURE DE FAÇON ALEATOIRE

    function selectElt() {

        stopDetection = 0;
        //position alétoire en x et y
        eltX = Math.floor(Math.random()*740);
        eltY = Math.floor(Math.random()*480);

        randomElet = Math.random();

        //détermine si vache ou voiture
        if (randomElet < .5) {
            console.log('cow');
            $cow.show(300).css({'left': eltX, 'top': eltY});
            $car.hide(300);
        } else {
            console.log('car');
            $car.show(300).css({'left': eltX, 'top': eltY});
            $cow.hide(300);
        };
    };

    // gestion des collisions

    function collision(){

    // coordonnées de la navette et de l'élément
        navX = parseInt(navette.css('left'));
        navY = parseInt(navette.css('top'));

        countCow = 0;
        countCar = 0;

        if ($car.css('display') == 'none') {
            eltType = 'vaches';
            eltX = parseInt($cow.css('left'));
            eltY = parseInt($cow.css('top'));
            console.log(eltType + ' visible - x : ' + eltX + '- y : ' + eltY);
        } else {
            eltType = 'voitures';
            eltX = parseInt($car.css('left'));
            eltY = parseInt($car.css('top'));
            console.log(eltType + ' visible - x : ' + eltX + '- y : ' + eltY);
        };

    //  Gestion de la collision
        if ((eltX>navX-20) && (eltX<(navX+125-50+20)) && (eltY>navY-20) && (eltY<(navY+177-116+20))
            && (stopDetection == 0))
        {
            stopDetection =1;
            if(eltType == 'vaches') {
                var countCow = parseInt($('#resultCow').text())+1;
                $('#resultCow').text(countCow)
                $('#meuh')[0].play();

            } else {
                var countCar = parseInt($('#resultCar').text())+1;
                $('#resultCar').text(countCar);
                $('#boom')[0].play();
            };

            if(countCow > 2) {
                timerSelect = setInterval(function () {
                    selectElt();
                },3000);
            }

            if(countCar >= 3) {
                pause();
                $('#gameOver').show();
            };

        };

    };


    // Démarrer, stopper et resetter le jeu
    var timerSelect = null;
    var timerCollision = null;

    $('#play').on('click', function (){
        if(timerSelect == null) {
            timerSelect = setInterval(function () {
                selectElt();
                }, 3000);
            timerCollision = setInterval(function () {
                collision()
            }, 200);
            $('#musiqueFond')[0].play();

        };

    });

    function pause(){
            //on repasse les variables qui appelant les fonctions à null
            clearInterval(timerSelect);
            clearInterval(timerCollision);
            timerSelect = null;
            $('#musiqueFond')[0].pause();
        // });
    }

    $('#pause').on('click', function () {
        pause();
    });
    
    $('#reset').on('click', function () {
        location.reload();
    });



});