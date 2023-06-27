function deleteNote(noteId) {
    fetch("/delete-note", {
      method: "POST",
      body: JSON.stringify({ noteId: noteId }),
    }).then((_res) => {
      window.location.href = "/";
    });
}

// $(document).ready(function() {
//   var socket = io.connect('http://' + document.domain + ':' + location.port);

//   socket.on('connect', function() {
//     socket.emit('user_connected', {data: 'New user connected!'});
//   });

//   socket.on('bot_response', function(response) {
//     $('#messages').append('<p><strong>Bot:</strong> ' + response.data + '</p>');
//   });

//   $('#send-btn').click(function() {
//     var userMessage = $('#user-input').val();
//     $('#messages').append('<p><strong>You:</strong> ' + userMessage + '</p>');
//     socket.emit('user_message', {data: userMessage});
//     $('#user-input').val('');
//   });

//   $('#user-input').keypress(function(event) {
//     if (event.which === 13) {
//       event.preventDefault();
//       $('#send-btn').click();
//     }
//   });
// });