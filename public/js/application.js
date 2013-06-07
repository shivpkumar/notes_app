$(document).ready(function() {
  
  $('#create_form').on('submit', function(event) {
    event.preventDefault();
    var newNoteData = $(this).serialize()

    var request = $.ajax({
      type: 'post',
      url: '/create',
      data: newNoteData 
    });

    function addNoteToDom(noteHtml) {
      $('table').append(noteHtml)
    }

    request.done(addNoteToDom);
  });

  $('.delete').on('click', function(event) {
    event.preventDefault();
    var parent = $(this).closest('tr')

    var request = $.ajax({
      type: 'get',
      url: '/destroy/' + parent.attr('id')
    });

    function deleteNoteFromDom() {
      parent.remove()
    }

    request.done(deleteNoteFromDom);
  });

  $('.container').delegate('.edit', 'click', function(event) {
    event.preventDefault();
    var parent = $(this).closest('tr')

    var request = $.ajax({
      type: 'get',
      url: '/update/' + parent.attr('id')
    });

    function addUpdateFormOnDom(formHtml) {
      $('table').prepend(formHtml)
    }

    request.done(addUpdateFormOnDom);
  });

  $('.container').delegate('#update_form', 'submit', function(event) {
    event.preventDefault();
    var updateNoteData = $(this).serialize()
    var noteId = $('#update_form').data('id')

    var request = $.ajax({
      type: 'post',
      url: '/update/' + noteId,
      data: updateNoteData 
    });

    function updateNoteOnDom(noteHtml) {
      var json = $.parseJSON(noteHtml);
      for(var obj in json) {
        var note_hash = json[obj];
      }

      $('#update_form').remove();
      var tds = $('#' + noteId).find('td');

      $(tds[0]).html(note_hash.title);
      $(tds[1]).html(note_hash.content);
    }

    request.done(updateNoteOnDom);
  });

});
