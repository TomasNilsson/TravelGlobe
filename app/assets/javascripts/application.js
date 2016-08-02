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

$(document).ready(function(){
    $('[data-provide~=datepicker]').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        weekStart: 1
    });

    var tripDuration = 0;

    $('#trip_start_date').on('changeDate', function (selected) {
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

    $('#trip_end_date').on('changeDate', function (selected) {
        var endDate = new Date(selected.date.valueOf());
        var startDate = $('#trip_start_date').val();
        if (startDate) {
            tripDuration = endDate.getDate() - new Date(startDate).getDate();
        } else {
            tripDuration = 0;
        }
    });

    var placeLivedDuration = 0;

    $('#place_lived_start_date').on('changeDate', function (selected) {
        var newDate = new Date(selected.date.valueOf());
        var endDate = $('#place_lived_end_date');
        endDate.datepicker('setStartDate', newDate);
        if (!endDate.val()) {
            endDate.datepicker('update', newDate);
            placeLivedDuration = 0;
        } else {
            newDate.setDate(newDate.getDate() + placeLivedDuration);
            endDate.datepicker('update', newDate);
        }
    });

    $('#place_lived_end_date').on('changeDate', function (selected) {
        var endDate = new Date(selected.date.valueOf());
        var startDate = $('#place_lived_start_date').val();
        if (startDate) {
            placeLivedDuration = endDate.getDate() - new Date(startDate).getDate();
        } else {
            placeLivedDuration = 0;
        }
    });

    $('.input-group-addon').click(function() {
        $(this).siblings().focus();
        $(this).siblings('select').select2('open');
    });

    $('.navbar a').click(function() {
        $('.modal.in').modal('hide');
    });

    $('#selectedPlaces').sortable({
        update: function(event, ui) {
            updateOrder($(this));
        }
    });
    $('#selectedPlaces').disableSelection();

    $('#selectedPlaces').on('click', '.up', function(event){
        moveUp($(this).closest("li"), $('#selectedPlaces'));
    });

    $('#selectedPlaces').on('click', '.down', function(event){
        moveDown($(this).closest("li"), $('#selectedPlaces'));
    });

    $('#selectedPlaces').on('cocoon:after-insert', function(e, insertedItem) {
        updateOrder($(this));
    });

    $('#selectedPlaces').on('cocoon:after-remove', function() {
        updateOrder($(this));
    });

    $('#selectedPhotos > tbody').sortable({
        update: function(event, ui) {
            updateOrder($(this));
        }
    });
    $('#selectedPhotos > tbody').disableSelection();

    $('#selectedPhotos > tbody').on('click', '.up', function(event){
        moveUp($(this).closest("tr"), $('#selectedPhotos > tbody'));
    });

    $('#selectedPhotos > tbody').on('click', '.down', function(event){
        moveDown($(this).closest("tr"), $('#selectedPhotos > tbody'));
    });

    $('#selectedPhotos > tbody').on('cocoon:after-insert', function(e, insertedItem) {
        updateOrder($(this));
    });

    $('#selectedPhotos > tbody').on('cocoon:after-remove', function() {
        updateOrder($(this));
    });
});

function moveUp(item, sortableList) {
    var prev = item.prev();
    if (prev.length == 0)
        return;
    item.insertBefore(prev).hide().show('slow');
    updateOrder(sortableList);
}

function moveDown(item, sortableList) {
    var next = item.next();
    if (next.length == 0)
        return;
    next.insertBefore(item).hide().show('slow');
    updateOrder(sortableList);
}

function updateOrder(sortableList) {
    var listElements = sortableList.children();
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

$(document).ready(function () {
    var selector, callbackAlbumSelected, callbackPhotoUnselected, callbackSubmit;
    var buttonOK = $('#CSPhotoSelector_buttonOK');
    var o = this;


    //$.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
            appId: ($("body").data("rails-env") === "production" ? 1696173967323541 : 1745663609041243),
            version: 'v2.7'
        });     
    });



    /* --------------------------------------------------------------------
     * Photo selector functions
     * ----------------------------------------------------------------- */

    fbphotoSelect = function(id) {
        // if no user/friend id is sent, default to current user
        if (!id) id = 'me';

        callbackAlbumSelected = function(albumId) {
            var album, name;
            album = CSPhotoSelector.getAlbumById(albumId);
            // Show album photos
            selector.showPhotoSelector(null, album.id, album.count);
        };

        callbackPhotoSelected = function(photoId) {
            var photo;
            photo = CSPhotoSelector.getPhotoById(photoId);
        };

        callbackPhotoUnselected = function(photoId) {
            var photo;
            album = CSPhotoSelector.getPhotoById(photoId);
        };

        callbackSubmit = function(photoIds) {
            var photo, i, len, caption, tablerow, thumb;
            for (i = 0, len = photoIds.length; i < len; i += 1) {
                photo = CSPhotoSelector.getPhotoById(photoIds[i]);
                if (typeof photo.name === "undefined") {
                    caption = "";
                } else {
                    caption = photo.name;
                }
                if (typeof photo.place != "undefined") {
                    if (!caption) {
                        caption = photo.place.name;
                    } else {
                        caption = caption + ', ' + photo.place.name;
                    }
                }
                $("#addPhoto").click();
                tablerow = $("#selectedPhotos tr:last");
                thumb = tablerow.find('td.thumb-field')
                thumb.find("input.thumb-url").val(photo.picture);
                thumb.find("input.image-url").val(photo.source);
                thumb.find(".thumbnail").append('<img src="' + photo.picture + '">');
                tablerow.find('td.caption-field').find("input").val(caption);
            }
        };


        // Initialise the Photo Selector with options that will apply to all instances
        CSPhotoSelector.init();

        // Create Photo Selector instances
        selector = CSPhotoSelector.newInstance({
            callbackAlbumSelected   : callbackAlbumSelected,
            callbackPhotoSelected   : callbackPhotoSelected,
            callbackPhotoUnselected : callbackPhotoUnselected,
            callbackSubmit          : callbackSubmit,
            albumsPerPage           : 6,
            photosPerPage           : 12,
        });

        // reset and show album selector
        selector.reset();
        selector.showAlbumSelector(id);
    }


    /* --------------------------------------------------------------------
     * Click events
     * ----------------------------------------------------------------- */

    $("#fbPhotoSelect").click(function (e) {
        e.preventDefault();
        fbphotoSelect();
    });
});

$(document).ready(function() {
    // Cloudinary jQuery integration library uses jQuery File Upload widget
    // (see http://blueimp.github.io/jQuery-File-Upload/).
    // Any file input field with cloudinary-fileupload class is automatically
    // wrapped using the File Upload widget and configured for Cloudinary uploads.
    // You can further customize the configuration using .fileupload method
    // as we do below.
    $(".cloudinary-fileupload")
        .cloudinary_fileupload({
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            dropZone: "#dropzone",
        })
        .on("fileuploadprogressall", function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        })
        .on("fileuploaddone", function (e, data) {
            // TODO: handle errors
            $('#photoUploaderModal').modal('hide');
        })
        .on("cloudinarydone", function (e, data) {
            $("#addPhoto").click();
            var tablerow = $("#selectedPhotos tr:last");
            var thumb = tablerow.find('td.thumb-field')
            thumb.find("input.thumb-url").val($.cloudinary.url(data.result.public_id, {
                format: data.result.format, width: 130, height: 130, crop: "fit", secure: true
            }));
            thumb.find("input.image-url").val($.cloudinary.url(data.result.public_id, {
                format: data.result.format, secure: true
            }));
            $.cloudinary.image(data.result.public_id, {
              width: 130, height: 130, crop: "fit", secure: true
            }).appendTo(thumb.find(".thumbnail"));
        });
    var counter = 0;
    $('#dropzone')
        .on("dragenter", function (e) {
            counter++;
            $(this).addClass('hover');
        })
        .on("dragleave", function (e) {
            counter--;
            if (counter === 0) { 
                $(this).removeClass('hover');
            }
        })
        .on("drop", function (e) {
            counter = 0;
            $(this).removeClass('hover');
        });
});

$(document).ready(function(){
    $(".select-box-multiple").select2({
        theme: "bootstrap",
        placeholder: "Select one or many countries"
    });

    $(".select-box-tags").select2({
        theme: "bootstrap",
        placeholder: "Choose from the list or create new",
        tags: true
    });

    $(".select-box-single").select2({
        theme: "bootstrap",
        placeholder: "Select a country",
        allowClear: true,
        dropdownParent: $('#newPlaceLivedModal')
    });

    $('#new_trip').on('ajax:success', function(event, data, status, xhr) {
        $('#newTripModal').modal('hide');
        // TODO: handle errors and don't reload page (use AJAX instead to update different elements)
        location.reload();
    });

    $('#new_place_lived').on('ajax:success', function(event, data, status, xhr) {
        $('#newPlaceLivedModal').modal('hide');
        // TODO: handle errors and don't reload page (use AJAX instead to update different elements)
        location.reload();
    });

    $('#newTripModal').on('hidden.bs.modal', function(){
        // Reset everything
        $('[data-provide~=datepicker]').datepicker('update', '');
        $(this).find('form')[0].reset();
        $('.select-box-tags').val('').trigger('change');
        $('.select-box-multiple').val('').trigger('change');
        $("#selectedPlaces").html("");
        $("#selectedPhotos > tbody").html("");
        $('#newTripTabs a:first').tab('show');
    });

    $('#newPlaceLivedModal').on('hidden.bs.modal', function(){
        // Reset everything
        $('[data-provide~=datepicker]').datepicker('update', '');
        $(this).find('form')[0].reset();
        $('.select-box-single').val('').trigger('change');
    });

    $('#photoUploaderModal').on('hidden.bs.modal', function(){
        // Reset everything
        $(this).find('form')[0].reset();
        $('#progress .progress-bar').css('width', '0%');
    });

    $('#newTripNext').click(function (e) {
      e.preventDefault()
      $("#newTripTabs li.active").next().children('a').tab('show');
    })

    $('#newTripTabs a[data-toggle="tab"]').on('show.bs.tab', function (event) {
        if ($(event.target).closest('li').index() == $("#newTripTabs li").length - 1) {
            $('#newTripNext').hide();
            $('#newTripSave').show();
        } else {
            $('#newTripSave').hide();
            $('#newTripNext').show();
        }
    })

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