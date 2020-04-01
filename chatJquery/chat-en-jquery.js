$(function () {

  showConversation();

  $('#toSend').click(function () {
    var name = $('#nom').val();
    var message = $('#message').val();
    $.post('chat.php', {
      'nom': name, 
      'message': message}, 
      showConversation
      );
    });

      // la requete ajax ci-dessous ne fonctionne pas. A VOIR POURQUOI
    //   $.ajax({
    //     type: "POST",
    //     url: "chat.php",
    //     sucess: function (Datas) {
    //       Datas;
    //       console.log('message envoyé')
    //       },
    //       error: function () {
    //         console.log('ERROR : message non envoyé');
    //         }
    //     }, 
    //     showConversation);
    // });

    function showConversation(){
      $('#conversation').load('ac.htm');
      $('#message').val('');
      $('#message').focus();
    };
    
    // setInterval(showConversation, 4000);

  });