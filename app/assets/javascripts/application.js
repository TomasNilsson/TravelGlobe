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
//= require_tree .
//= require chart.min.js
//= require select2.min.js
//= require jquery.dataTables.min.js
//= require dataTables.bootstrap.min.js
//= require cocoon

$(document).ready(function(){
    $('[data-provide~=datepicker]').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        weekStart: 1
    });

    $('#trip_start_date').on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        var endDate = $('#trip_end_date');
        endDate.datepicker('setStartDate', minDate);
        if (!endDate.val()) {
            endDate.datepicker('update', minDate);
        }
    });

    $('#trip_end_date').on('changeDate', function (selected) {
        var maxDate = new Date(selected.date.valueOf());
        $('#trip_start_date').datepicker('setEndDate', maxDate);
    });
});

$(document).ready(function () {
    var selector, logActivity, callbackAlbumSelected, callbackPhotoUnselected, callbackSubmit;
    var buttonOK = $('#CSPhotoSelector_buttonOK');
    var o = this;


    //$.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
            appId: '1745663609041243',
            version: 'v2.6'
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
            //buttonOK.show();
            logActivity('Selected ID: ' + photo.id);
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
                thumb.append('<img src="' + photo.picture + '">');
                tablerow.find('td.caption-field').find("input").val(caption);
            }
        };


        // Initialise the Photo Selector with options that will apply to all instances
        CSPhotoSelector.init({debug: true});

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

    $(".photoSelect").click(function (e) {
        e.preventDefault();
        $('#photoSelectorModal').modal('show');
    });

    $("#fbPhotoSelect").click(function (e) {
        e.preventDefault();
        fbphotoSelect();
    });

    logActivity = function (message) {
        $("#results").append('<div>' + message + '</div>');
    };
});

$(document).ready(function(){
    $(".js-example-basic-multiple").select2({
        theme: "bootstrap"
    });

    $('#new_trip').on('ajax:success', function(event, data, status, xhr) {
        $('#newTripModal').modal('hide').empty();
        location.reload();
        // TODO: handle errors
    });

    $('#newTripModal').on('hidden.bs.modal', function(){
        // Reset everything
        $('[data-provide~=datepicker]').datepicker('update', '');
        $(this).find('form')[0].reset();
        $('.js-example-basic-multiple').val('').trigger('change');
        $("#selectedPhotos > tbody").html("");
        $('#carousel-new-trip').carousel(0);
    });

    $('#carousel-new-trip').on('slide.bs.carousel', function (event) {
        if ($(event.relatedTarget).index() == 1) {
            $('#new-trip-next').hide();
            $('#new-trip-save').show();
        } else {
            $('#new-trip-save').hide();
            $('#new-trip-next').show();
        }
    })
});

$(document).ready(function(){
    Chart.defaults.global.legend.position = 'bottom';
    var ctx = $("#myChart");
    var data = {
        labels: [
            "Africa",
            "Europe",
            "Asia",
            "North America",
            "South America",
            "Antarctica",
            "Australia"
        ],
        datasets: [
            {
                data: [300, 50, 100, 100, 100, 100, 100],
                backgroundColor: [
                    "#5DA5DA",
                    "#FAA43A",
                    "#60BD68",
                    "#B276B2",
                    "#DECF3F",
                    "#F15854",
                    "#4D4D4D"
                ],
                hoverBackgroundColor: [
                    "#5DA5DA",
                    "#FAA43A",
                    "#60BD68",
                    "#B276B2",
                    "#DECF3F",
                    "#F15854",
                    "#4D4D4D"
                ]
            }]
    };

    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        animation:{
            animateScale:true
        }
    });
});