// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require bootstrap-datepicker
//= require jquery_ujs
//= require jquery-ui/sortable
//= require_tree .
//= require cocoon
//= require cloudinary
//= require data-confirm-modal
//= require ekko-lightbox.min.js

$(document).ready(function(){
    var tripDuration = 0;

    $(document).on('changeDate', '#trip_start_date', function (selected) {
        var newDate = new Date(selected.date.valueOf());
        var endDate = $('#trip_end_date');
        endDate.datepicker('setStartDate', newDate);
        if (!endDate.val()) {
            endDate.datepicker('update', newDate);
            tripDuration = 0;
        } else {
            newDate.setDate(newDate.getDate() + tripDuration);
            endDate.datepicker('update', newDate);
        }
    });

    $(document).on('changeDate', '#trip_end_date', function (selected) {
        var endDate = new Date(selected.date.valueOf());
        var startDate = $('#trip_start_date').val();
        if (startDate) {
            tripDuration = endDate.getDate() - new Date(startDate).getDate();
        } else {
            tripDuration = 0;
        }
    });

    var placeLivedDuration = 0;

    $(document).on('changeDate', '#place_lived_start_date', function (selected) {
        var newDate = new Date(selected.date.valueOf());
        var endDate = $('#place_lived_end_date');
        endDate.datepicker('setStartDate', newDate);
        if (endDate.prop('readonly')) {
            return;
        } else if (endDate.val()) {
            endDate.datepicker('update', newDate);
            placeLivedDuration = 0;
        } else {
            newDate.setDate(newDate.getDate() + placeLivedDuration);
            endDate.datepicker('update', newDate);
        }
    });

    $(document).on('changeDate', '#place_lived_end_date', function (selected) {
        var endDate = new Date(selected.date.valueOf());
        var startDate = $('#place_lived_start_date').val();
        if (startDate) {
            placeLivedDuration = endDate.getDate() - new Date(startDate).getDate();
        } else {
            placeLivedDuration = 0;
        }
    });

    $('.navbar a').click(function() {
        $('.modal.in').modal('hide');
    });

    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
            $(this).collapse('hide');
        }
    });

    $('#shareRequestFormTable tr').click(function(event) {
        if (event.target.type !== 'checkbox') {
          $(':checkbox', this).trigger('click');
        }
    });

    $('#shareRequestForm').on('ajax:success', function(event, data, status, xhr) {
        $('#shareRequestModal').modal('hide');
        // TODO: don't reload page (use AJAX instead to update different elements)
        location.reload();
    });

    $('#shareRequestForm').on('ajax:error', function(event, xhr, status, error) {
        // TODO: handle error
        $('#shareRequestModal').modal('hide');
    });
});

function moveUp(item, sortableList) {
    var prev = item.prevAll('.sortable:first');
    if (prev.length == 0)
        return;
    item.insertBefore(prev);
    updateOrder(sortableList);
}

function moveDown(item, sortableList) {
    var next = item.nextAll('.sortable:first');
    if (next.length == 0)
        return;
    next.insertBefore(item);
    updateOrder(sortableList);
}

function updateOrder(sortableList) {
    var listElements = sortableList.children('.sortable');
    var len = listElements.length;
    listElements.each(function (i, element) {
        if (i != 0) {
            $(element).find(".up").show();
        } else {
            $(element).find(".up").hide();
        }
        if (i != len - 1) {
            $(element).find(".down").show();
        } else {
            $(element).find(".down").hide();
        }
        $(element).find("input.order").val(i);
    });
}

$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

$(document).ready(function(){
    // Reset all forms on page load (Firefox remembers form data on reload)
    $('form').each(function() { this.reset() });

    $(document).on('ajax:success', 'a.delete-trip', function(event, data, status, xhr) {
        $('.modal.in').modal('hide');
        // TODO: don't reload page (use AJAX instead to update different elements) and handle errors
        location.reload();
    });

    $('#placesLivedModal').on('ajax:success', 'a.delete-place', function(event, data, status, xhr) {
        $('#placesLivedModal').modal('hide');
        // TODO: don't reload page (use AJAX instead to update different elements) and handle errors
        location.reload();
    });

    $('#photoUploaderModal').on('hidden.bs.modal', function(){
        // Reset everything
        $(this).find('form')[0].reset();
        $('#progress .progress-bar').css('width', '0%');
    });

    $('#myTripsModal').on('hidden.bs.modal', function(){
        // Reset filter
        $('#trips').DataTable().search('').draw();
    });

    $('#placesLivedModal').on('hidden.bs.modal', function(){
        // Reset filter
        $('#placesLived').DataTable().search('').draw();
    });

    $('#tripInfoModal').on('hide.bs.modal', function(){
        removeMarkers();
    });

    $('#statisticsModal a.travelpartner').click(function() {
        $('.modal.in').modal('hide');
        $('#myTripsModal').modal('show');
        $('#trips').DataTable().search($(this).siblings('strong').first().text()).draw();
    });

    $('#copy-btn').tooltip({
        trigger: 'click'
    });

    var clipboard = new Clipboard('#copy-btn');

    clipboard.on('success', function(e) {
        setTooltip(e.trigger, 'Copied!');
        hideTooltip(e.trigger);
    });

    clipboard.on('error', function(e) {
        setTooltip(e.trigger, 'Failed!');
        hideTooltip(e.trigger);
    });



    /*$('#logout').click(function (e) {
        // Check that the user is logged in to Facebook
        // Problem: see http://stackoverflow.com/questions/34725123/getloginstatus-returns-status-unknown-when-trying-to-logout-from-facebook-using
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                // Will not log the user out of Facebook if the user 
                // logged into Facebook before logging into TravelGlobe.
                FB.logout();
            }
        });
    })*/
});

function setTooltip(btn, message) {
    $(btn).tooltip('hide')
      .attr('data-original-title', message)
      .tooltip('show');
}

function hideTooltip(btn) {
    setTimeout(function() {
        $(btn).tooltip('hide');
    }, 1000);
}

(function($) {
    $.fn.datepicker.defaults.format = 'yyyy-mm-dd';
    $.fn.datepicker.defaults.autoclose = true;
    $.fn.datepicker.defaults.weekStart = 1;
    $.fn.datepicker.defaults.disableTouchKeyboard = true;
    $.fn.datepicker.defaults.enableOnReadonly = false;

    $.fn.render_form_errors = function(model_name, errors) {
        form = this
        this.clear_previous_errors();

        // Show error messages in input form-group help-block
        $.each(errors, function(field, messages) {
            input = form.find('input, select, textarea').filter(function() {
                name = $(this).attr('name');
                if (name && $(this).attr('type') != 'hidden') {
                    // Use field.slice(0,-3) to make 'countries' match 'country_ids'. TODO: Solve in a better way.
                    return name.match(new RegExp(model_name + '\\[' + field.slice(0,-3)));
                }
            });
            inputDiv = input.closest('.form-group');
            inputDiv.addClass('has-error');
            inputDiv.append('<span class="help-block">' + $.map(messages, function(m) {return m.charAt(0).toUpperCase() + m.slice(1)}).join('<br />') + '</span>');
        });
     };

    $.fn.clear_previous_errors = function() {
        $('.form-group.has-error', this).each(function(){
            $(this).find('.help-block').remove();
            $(this).removeClass('has-error');
        });
    }

}(jQuery));
