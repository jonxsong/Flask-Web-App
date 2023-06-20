function deleteNote(noteId) {
    fetch("/delete-note", {
      method: "POST",
      body: JSON.stringify({ noteId: noteId }),
    }).then((_res) => {
      window.location.href = "/";
    });
}

$(document).ready(function() {
  $('#send-btn').click(function() {
    var userMessage = $('#user-input').val();
    $('#messages').append('<p><strong>You:</strong> ' + userMessage + '</p>');
    $('#user-input').val('');

    $.ajax({
      type: 'POST',
      url: '/chat',
      data: {'message': userMessage},
      success: function(reply) {
        $('#messages').append('<p><strong>Bot:</strong> ' + reply + '</p>');
      }
    });
  });

  $('#user-input').keypress(function(event) {
    if (event.which === 13) {
      event.preventDefault();
      $('#send-btn').click();
    }
  });
});