(function ($) {
  Drupal.behaviors.commons_duplicate_groups = {
    attach: function (context) {
      $('#cdg-informer:not(.cdg-processed)', context)
      .each(function() {
        var input = $(this).parents('.form-item').find('input');

        Drupal.commons_duplicate_groups.group = '';
        input
        .keyup(function () {
          if(input.val() !== Drupal.commons_duplicate_groups.group) {
            clearTimeout(Drupal.commons_duplicate_groups.timer);
            Drupal.commons_duplicate_groups.timer = setTimeout(function () { Drupal.commons_duplicate_groups.check(input); }, 1400);

            if(!$('#cdg-informer').hasClass('cdg-informer-progress')) {
              $('#cdg-informer')
                .removeClass('cdg-informer-accepted')
                .removeClass('cdg-informer-rejected');
            }

            $('#cdg-message').hide();
          }
        })
        .blur(function () {
          if(input.val() !== Drupal.commons_duplicate_groups.group) {
            Drupal.commons_duplicate_groups.check(input);
          }
        });
      })
      .addClass('cdg-processed');
    }
  };

  Drupal.commons_duplicate_groups = {};
  Drupal.commons_duplicate_groups.check = function(input) {
    clearTimeout(Drupal.commons_duplicate_groups.timer);
    Drupal.commons_duplicate_groups.group = input.val();

    $.ajax({
      url: Drupal.settings.commons_duplicate_groups.ajaxUrl,
      data: {group: Drupal.commons_duplicate_groups.group},
      dataType: 'json',
      beforeSend: function() {
        $("#cdg-informer")
          .removeClass('cdg-informer-accepted')
          .removeClass('cdg-informer-rejected')
          .addClass('cdg-informer-progress');
      },
      success: function(ret){
        if(ret.allowed){
          $('#cdg-informer')
            .removeClass('cdg-informer-progress')
            .addClass('cdg-informer-accepted');

          input
            .removeClass('error');
        }
        else {
          $('#cdg-informer')
            .removeClass('cdg-informer-progress')
            .addClass('cdg-informer-rejected');

          $('#cdg-message')
            .addClass('cdg-message-rejected')
            .html(ret.msg)
            .show();
        }
      }
     });
  };
})(jQuery);
