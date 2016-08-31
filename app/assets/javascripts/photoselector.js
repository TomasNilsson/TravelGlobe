/*
 * CS Photo Selector
 * @author: Carson Shold (@cshold)
 * Modified by Tomas Nilsson
*/
var CSPhotoSelector = (function(module, $) {

	// Public functions
	var init, setAlbums, getAlbums, getAlbumById, getPhotoById, setPhotos, newInstance,

	// Private variables
	settings, albums, prev, photos, albumLength, numPages, albumId, currentAlbumPage,
	$albums, $photos, $container, $albumsContainer, $photosContainer, $selectedCount, $pageNumber, $pageNumberSeparator, $pageNumberTotal, $pagePrev, $pageNext, $buttonClose, $buttonOK, $buttonCancel,

	// Private functions
	$getAlbumById, $getPhotoById, buildAlbumSelector, buildPhotoSelector, log, htmlEntities;

	/////////////////////////////////////////
	// PUBLIC FUNCTIONS FOR GLOBAL PLUGIN
	// They are public because they are added to module and returned
	/////////////////////////////////////////

	/**
	 * Initialise the plugin and define global options
	 */
	init = function(options) {

		// Default settings
		settings = {
			speed							: 100,
			debug							: false,
			disabledClass					: 'CSPhotoSelector_disabled',
			albumSelectedClass				: 'CSPhotoSelector_photoSelected',
			albumDisabledClass				: 'CSPhotoSelector_photoDisabled',
			containerSelector				: '#CSPhotoSelector',
			albumsContainerSelector			: '.CSAlbum_container',
			photosContainerSelector			: '.CSPhoto_container',
			photosWrapperSelector			: '.CSPhotoSelector_wrapper',
			selectedPhotoCountSelector		: '.CSPhotoSelector_selectedPhotoCount',
			selectAllSelector				: '#CSPhotoSelector_selectAll',
			pageNumberSelector				: '#CSPhotoSelector_pageNumber',
			pageNumberSeparatorSelector		: '#CSPhotoSelector_pageNumberSeparator',
			pageNumberTotalSelector			: '#CSPhotoSelector_pageNumberTotal',
			pagePrevSelector				: '#CSPhotoSelector_pagePrev',
			pageNextSelector				: '#CSPhotoSelector_pageNext',
			buttonBackToAlbumsSelector		: '#CSPhotoSelector_backToAlbums',
			buttonCloseSelector				: '#CSPhotoSelector_buttonClose',
			buttonOKSelector				: '#CSPhotoSelector_buttonOK',
			buttonCancelSelector			: '#CSPhotoSelector_buttonCancel',
			loader							: '#CSPhotoSelector_loader',
			pagination						: '.CSPhotoSelector_pageNumberContainer, #CSPhotoSelector_pagePrev, #CSPhotoSelector_pageNext'
		};

		// Override defaults with arguments
		$.extend(settings, options);

		// Select DOM elements
		$container			= $(settings.containerSelector);
		$albumsContainer	= $container.find(settings.albumsContainerSelector);
		$photosContainer	= $container.find(settings.photosContainerSelector);
		$photosWrapper		= $container.find(settings.photosWrapperSelector);
		$selectedCount		= $container.find(settings.selectedPhotoCountSelector);
		$selectAll			= $container.find(settings.selectAllSelector);
		$pageNumber			= $container.find(settings.pageNumberSelector);
		$pageNumberSeparator= $container.find(settings.pageNumberSeparatorSelector);
		$pageNumberTotal	= $container.find(settings.pageNumberTotalSelector);
		$pagePrev			= $container.find(settings.pagePrevSelector);
		$pageNext			= $container.find(settings.pageNextSelector);
		$backToAlbums		= $container.find(settings.buttonBackToAlbumsSelector);
		$buttonClose		= $container.find(settings.buttonCloseSelector);
		$buttonOK			= $container.find(settings.buttonOKSelector);
		$buttonCancel		= $container.find(settings.buttonCancelSelector);
		$loader				= $container.find(settings.loader);
		$pagination			= $container.find(settings.pagination);
	};

	/**
	 * If your website has already loaded the user's Facebook photos, pass them in here to avoid another API call.
	 */
	setAlbums = function(input) {
		var i, len;
		if (!input || input.length === 0) {
			return;
		}
		input = Array.prototype.slice.call(input);

		if (typeof albums === 'undefined') {
			albums = [];
		}

		for (var i=0; i<input.length; i++){
			albums[albums.length] = input[i];
		}
	};

	getAlbums = function() {
		return albums;
	};

	setPhotos = function(input) {
		var i, len;
		if (!input || input.length === 0) {
			return;
		}
		input = Array.prototype.slice.call(input);
		if (photos.length > 0) {
			Array.prototype.push.apply(photos,input);
		} else {
			photos = input;
		}
	};

	getPhotos = function() {
		return photos;
	};

	/**
	 * Use this function if you have a photo ID and need to know their name
	 */
	getAlbumById = function(id) {
		var i, len;
		id = id.toString();
		for (i = 0, len = albums.length; i < len; i += 1) {
			if (albums[i].id === id) {
				return albums[i];
			}
		}
		return null;
	};

	getPhotoById = function(id) {
		var i, len;
		id = id.toString();
		for (i = 0, len = photos.length; i < len; i += 1) {
			if (photos[i].id === id) {
				return photos[i];
			}
		}
		return null;
	};

	/**
	 * Create a new instance of the photo selector
	 * @param options An object containing settings that are relevant to this particular instance
	 */
	newInstance = function(options) {
		// Public functions
		var showAlbumSelector, showPhotoSelector, hidePhotoSelector, hideAlbumSelector, getselectedAlbumIds, getselectedPhotoIds, setDisabledPhotoIds, reset,

		// Private variables
		instanceSettings, selectedAlbumIds = [], selectedPhotoIds = [], selectedPhotos = [], disabledPhotoIds = [],

		// Private functions
		bindEvents, unbindEvents, updateAlbumContainer, updatePhotosContainer, updatePaginationButtons, selectAlbum, selectPhotos;

		if (!settings) {
			log('Cannot create a new instance of CSPhotoSelector because the plugin not initialised.');
			return false;
		}

		// Default settings
		instanceSettings = {
			albumsPerPage			: 6,
			photosPerPage			: 10,
			callbackAlbumSelected	: null,
			callbackPhotoSelected	: null,
			callbackPhotoUnselected	: null,
			callbackSubmit			: null
		};

		// Override defaults with arguments
		$.extend(instanceSettings, options);

		/////////////////////////////////////////
		// PUBLIC FUNCTIONS FOR AN INSTANCE
		/////////////////////////////////////////

		/**
		 * Call this function to show the interface
		 */
		showAlbumSelector = function(id, callback) {
			var i, len;
			log('CSPhotoSelector - show Albums');
			if (!$albums) {
				return buildAlbumSelector(id, function() {
					showAlbumSelector(id, callback);
				});
			} else {
				bindEvents();
				// Update classnames to represent the selections for this instance
				$albums.removeClass(settings.albumSelectedClass + ' ' + settings.albumDisabledClass);
				for (i = 0, len = albums.length; i < len; i += 1) {
					if ($.inArray(albums[i].id, selectedAlbumIds) !== -1) {
						$($albums[i]).addClass(settings.albumSelectedClass);
					}
					if ($.inArray(albums[i].id, disabledPhotoIds) !== -1) {
						$($albums[i]).addClass(settings.albumDisabledClass);
					}
				}
				// Update paging
				currentAlbumPage = 1;
				updateAlbumContainer(currentAlbumPage);
				updatePaginationButtons(currentAlbumPage, instanceSettings.albumsPerPage, albums.length);

				$container.fadeIn(100);
				if (typeof callback === 'function') {
					callback();
				}
			}
		};

		showPhotoSelector = function(callback, albumId, photosCount) {
			var i, len;
			log('CSPhotoSelector - show Photos');

			// Show loader until we get a response
			$loader.show();

			if (photosCount) {
				albumLength = photosCount;
			}

			if (!$photos || albumId) {
				return buildPhotoSelector(function() {
					showPhotoSelector(callback);
				}, albumId, instanceSettings.photosPerPage);
			} else {
				// Update paging
				$selectedCount.html(selectedPhotoIds.length);
				updatePhotosContainer(1);
				updatePaginationButtons(1, instanceSettings.photosPerPage, albumLength);
				$container.fadeIn(100);
				if (typeof callback === 'function') {
					callback();
				}
			}
		};

		hidePhotoSelector = function() {
			$photosWrapper.removeClass('CSPhoto_container_active');
		};

		hideAlbumSelector = function() {
			unbindEvents();
			$container.fadeOut(100);
		};

		getselectedAlbumIds = function() {
			return selectedAlbumIds;
		};

		getselectedPhotoIds = function() {
			return selectedPhotoIds;
		};

		/**
		 * Disabled photos are greyed out in the interface and are not selectable.
		 */
		setDisabledPhotoIds = function(input) {
			disabledPhotoIds = input;
		};

		/**
		 * Remove selections, clear disabled list, go to page 1, etc
		 */
		reset = function() {
			if (!albums || albums.length === 0) {
				return;
			}
			// Hide the photo container
			$photosWrapper.removeClass('CSPhoto_container_active');
			//$buttonOK.hide();
			$albumsContainer.empty();
			$photosContainer.empty();
			selectedAlbumIds = [];
			selectedPhotoIds = [];
			photos = [];
			$albums = null;
			$selectedCount.html("0");
			$selectAll.text("Select all");
			disabledPhotoIds = [];
			updatePaginationButtons(1, instanceSettings.albumsPerPage, albums.length);
		};

		/////////////////////////////////////////
		// PRIVATE FUNCTIONS FOR AN INSTANCE
		/////////////////////////////////////////

		// Add event listeners
		bindEvents = function() {
			$buttonClose.bind('click', function(e) {
				e.preventDefault();
				hideAlbumSelector();
			});
			$buttonCancel.bind('click', function(e) {
				e.preventDefault();
				hideAlbumSelector();
			});

			$buttonOK.bind('click', function(e) {
				e.preventDefault();
				hideAlbumSelector();
				if (typeof instanceSettings.callbackSubmit === "function") { instanceSettings.callbackSubmit(selectedPhotos); }
			});

			$selectAll.bind('click', function(e) {
				e.preventDefault();
				$photosContainer.children().removeClass(settings.albumSelectedClass);
				$photos.removeClass(settings.albumSelectedClass);
				// Only select all photos on this oage instead of the entire album.
				$photosContainer.children().click();
				/* // FIXME: some bugs exist for large albums when all pages have not been loaded before this function is called.
				if ($(this).text() == "Deselect all") {
					selectedPhotoIds = [];
					$selectedCount.html("0");
					$(this).text("Select all");
				} else {
					/*
					// Select all photos of the entire album
					updatePhotosContainer(1);
					updatePaginationButtons(1);
					$(this).addClass("CSPhoto_selectAll");
					$photosContainer.children().click();
					while (!$pageNext.hasClass(settings.disabledClass)) {
						$pageNext.click();
					}
					$(this).removeClass("CSPhoto_selectAll");
				}*/
			});

			$backToAlbums.bind('click', function(e) {
				e.preventDefault();
				updatePaginationButtons(currentAlbumPage, instanceSettings.albumsPerPage, albums.length);
				//$selectAll.text("Select all");
				hidePhotoSelector();
			});

			$pagePrev.bind('click', function(e) {
				var pageNumber = parseInt($pageNumber.text(), 10) - 1;
				e.preventDefault();
				if (pageNumber < 1) { return; }
				if ($photosWrapper.hasClass('CSPhoto_container_active')) {
					updatePhotosContainer(pageNumber);
				} else {
					currentAlbumPage = pageNumber;
					updateAlbumContainer(pageNumber);
				}
				updatePaginationButtons(pageNumber);
			});

			$pageNext.bind('click', function(e) {
				var pageNumber = parseInt($pageNumber.text(), 10) + 1;
				e.preventDefault();
				if ($(this).hasClass(settings.disabledClass)) { return; }
				if ($photosWrapper.hasClass('CSPhoto_container_active')) {
					/*if ($selectAll.hasClass("CSPhoto_selectAll")) {
						updatePhotosContainer(pageNumber, true);
					} else {
						updatePhotosContainer(pageNumber);
					}*/
					updatePhotosContainer(pageNumber);
				} else {
					currentAlbumPage = pageNumber;
					updateAlbumContainer(pageNumber);
				}
				updatePaginationButtons(pageNumber);
			});

			$(window).bind('keydown', function(e) {
				if (e.which === 27) {
					// The escape key has the same effect as the close button
					e.preventDefault();
					e.stopPropagation();
					hideAlbumSelector();
				}
			});
		};

		// Remove event listeners
		unbindEvents = function() {
			$buttonClose.unbind('click');
			$buttonOK.unbind('click');
			$buttonCancel.unbind('click');
			$selectAll.unbind('click');
			$albumsContainer.children().unbind('click');
			$photosContainer.children().unbind('click');
			$pagePrev.unbind('click');
			$pageNext.unbind('click');
			$(window).unbind('keydown');
		};

		// Set the contents of the albums container
		updateAlbumContainer = function(pageNumber) {
			var firstIndex, lastIndex;
			firstIndex = (pageNumber - 1) * instanceSettings.albumsPerPage;
			lastIndex = pageNumber * instanceSettings.albumsPerPage;
			$albumsContainer.html($albums.slice(firstIndex, lastIndex));
			$albumsContainer.children().bind('click', function(e) {
				e.preventDefault();
				selectAlbum($(this));
			});
		};

		// Set the contents of the photos container
		updatePhotosContainer = function(pageNumber, selectAll) {
			var firstIndex, lastIndex;
			firstIndex = (pageNumber - 1) * instanceSettings.photosPerPage;
			lastIndex = pageNumber * instanceSettings.photosPerPage;
			if (photos.length <= firstIndex) {
				return buildPhotoSelector(function() {
					updatePhotosContainer(pageNumber, selectAll);
				}, albumId, instanceSettings.photosPerPage, firstIndex);
			} else {
				// Update classnames to represent the selections for this instance
				$photos.removeClass(settings.albumSelectedClass + ' ' + settings.albumDisabledClass);
				for (i = 0, len = photos.length; i < len; i += 1) {
					if ($.inArray(photos[i].id, selectedPhotoIds) !== -1) {
						$($photos[i]).addClass(settings.albumSelectedClass);
					}
					if ($.inArray(photos[i].id, disabledPhotoIds) !== -1) {
						$($photos[i]).addClass(settings.albumDisabledClass);
					}
				}
				$photosContainer.html($photos.slice(firstIndex, lastIndex));
				$photosContainer.children().bind('click', function(e) {
					e.preventDefault();
					selectPhotos($(this));
				});
				if (selectAll) {
					$photosContainer.children().click();
				}
			}
		};

		updatePaginationButtons = function(pageNumber, numPerPage, totalCount) {
			if (numPerPage && totalCount) {
				if (totalCount === '-') {
					numPages = '';
				} else {
					numPages = Math.ceil((totalCount) / numPerPage);
				}
			}
			$pageNumber.html(pageNumber);
			if (numPages === '') {
				$pageNumberSeparator.html('');
			} else {
				$pageNumberSeparator.html(' / ');
			}
			$pageNumberTotal.html(numPages);
			if (pageNumber === 1 || numPages === 1) {
				$pagePrev.addClass(settings.disabledClass);
			} else {
				$pagePrev.removeClass(settings.disabledClass);
			}
			if (pageNumber === numPages || numPages === 1) {
				$pageNext.addClass(settings.disabledClass);
			} else {
				$pageNext.removeClass(settings.disabledClass);
			}
		};

		selectAlbum = function($album) {
			albumId = $album.attr('data-id');

			// If the album is disabled, ignore this
			if ($album.hasClass(settings.albumDisabledClass)) {
				return;
			}

			if (typeof instanceSettings.callbackAlbumSelected === "function") { 
				instanceSettings.callbackAlbumSelected(albumId);
			}
		};

		selectPhotos = function($photo) {
			var photoId, i, len, removedId;
			photoId = $photo.attr('data-id');

			// If the photo is disabled, ignore this
			if ($photo.hasClass(settings.albumDisabledClass)) {
				return;
			}

			if (!$photo.hasClass(settings.albumSelectedClass)) {
				// Add photo to selectedPhotoIds
				if ($.inArray(photoId, selectedPhotoIds) === -1) {
					selectedPhotoIds.push(photoId);
					selectedPhotos.push(CSPhotoSelector.getPhotoById(photoId));
					$photo.addClass(settings.albumSelectedClass);
					$selectedCount.html(selectedPhotoIds.length);
					log('CSPhotoSelector - newInstance - selectPhoto - selected IDs: ', selectedPhotoIds);
				} else {
					$photo.addClass(settings.albumSelectedClass);
					log('CSPhotoSelector - newInstance - selectPhoto - ID already stored');
				}
			} else {
				// Remove photo from selectedPhotoIds
				for (i = 0, len = selectedPhotoIds.length; i < len; i += 1) {
					if (selectedPhotoIds[i] === photoId) {
						selectedPhotoIds.splice(i, 1);
						selectedPhotos.splice(i, 1);
						$photo.removeClass(settings.albumSelectedClass);
						$selectedCount.html(selectedPhotoIds.length);
						return false;
					}
				}
			}
		};

		// Return an object with access to the public members
		return {
			showAlbumSelector	: showAlbumSelector,
			showPhotoSelector	: showPhotoSelector,
			hidePhotoSelector	: hidePhotoSelector,
			hideAlbumSelector	: hideAlbumSelector,
			getselectedAlbumIds	: getselectedAlbumIds,
			getselectedPhotoIds	: getselectedPhotoIds,
			setDisabledPhotoIds	: setDisabledPhotoIds,
			reset				: reset
		};
	};

	/////////////////////////////////////////
	// PRIVATE FUNCTIONS FOR GLOBAL PLUGIN
	/////////////////////////////////////////

	$getAlbumById = function(id) {
		var i, len;
		id = id.toString();
		for (i = 0, len = albums.length; i < len; i += 1) {
			if (albums[i].id === id) {
				return $($albums[i]);
			}
		}
		return $("");
	};

	$getPhotoById = function(id) {
		var i, len;
		id = id.toString();
		for (i = 0, len = photos.length; i < len; i += 1) {
			if (photos[i].id === id) {
				return $($photos[i]);
			}
		}
		return $("");
	};

	/**
	 * Load the Facebook albums and build the markup
	 */
	buildAlbumSelector = function(id, callback) {
		var buildMarkup, buildAlbumMarkup;
		log("buildAlbumSelector");
		$pagination.show();

		if (!FB) {
			log('The Facebook SDK must be initialised before showing the photo selector');
			return false;
		}

		// Check that the user is logged in to Facebook
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				var accessToken = response.authResponse.accessToken;
				// Add 'Photos of Me' to albums array
				setAlbums([{
				    name: "Photos Of Me",
				    id: 'me', 
				    count: '-'
				}]);
				// Load your Facebook albums
				FB.api('/'+ id +'/albums?fields=name,id,count', function(response) {
					if (response.data.length) {
						setAlbums(response.data);
						// Build the markup
						buildMarkup(accessToken);
						// Call the callback
						if (typeof callback === 'function') { callback(); }
					} else {
						log('CSPhotoSelector - buildAlbumSelector - No albums returned');
						return false;
					}
				});
			} else {
				log('CSPhotoSelector - buildAlbumSelector - User is not logged in to Facebook');
				return false;
			}
		});

		// Build the markup of the album selector
		buildMarkup = function(accessToken) {
			// loop through photo albums
			var i, len, html = '';
			for (i = 0, len = albums.length; i < len; i += 1) {
				html += buildAlbumMarkup(albums[i], accessToken);
			}
			$albums = $(html);
		};

		// Return the markup for a single album
		buildAlbumMarkup = function(album, accessToken) {
			if (album.id == 'me') {
				var pictureType = 'large';
			} else {
				var pictureType = 'album';
			}
			return '<a href="#" class="CSPhotoSelector_album" data-id="' + album.id + '">' +
					'<div class="CSPhotoSelector_albumWrap"><div>' +
					'<img src="https://graph.facebook.com/'+ album.id +'/picture?type='+ pictureType + '&access_token='+ accessToken +'" alt="' + htmlEntities(album.name) + '" class="CSPhotoSelector_photoAvatar" />' +
					'</div></div>' +
					'<div class="CSPhotoSelector_photoName">' + htmlEntities(album.name) + '</div>' +
					'</a>';
		};
	};

	/**
	 * Load the Facebook photos and build the markup
	 */
	buildPhotoSelector = function(callback, albumId, limit, offset) {
		var buildSecondMarkup, buildPhotoMarkup;
		log("buildPhotoSelector");

		if (!offset) {
			photos = [];
			offset = 0;
		}

		FB.api('/'+ albumId +'/photos?fields=id,picture,source,name,place.fields(name)&limit=' + limit + '&offset=' + offset, function(response) {
			if (response.data && response.data.length > 0) {
				setPhotos(response.data);
				// Build the markup
				buildSecondMarkup();
				// Call the callback
				if (typeof callback === 'function') {
					callback();
					// hide the loader and pagination
					$loader.hide();
					//$pagination.hide();
					// set the photo container to active
					$photosWrapper.addClass('CSPhoto_container_active');
				}
			} else {
				log('CSPhotoSelector - showPhotoSelector - No photos returned');
				return false;
			}
		});

		// Build the markup of the photo selector
		buildSecondMarkup = function() {
			//loop through photos
			var i, len, html = '';
			// if photos is empty, we need to try again

			if (!photos) {
				buildPhotoSelector(null, albumId, limit);
			}
			for (i = 0, len = photos.length; i < len; i += 1) {
				html += buildPhotoMarkup(photos[i]);
			}

			if ($photos) {
				$.extend($photos, $(html));
			} else {
				$photos = $(html);
			}
		};

		buildPhotoMarkup = function(photo) {
			return '<a href="#" class="CSPhotoSelector_photo CSPhotoSelector_clearfix" data-id="' + photo.id + '">' +
					'<span><img src="' + photo.picture + '" alt="" class="CSPhotoSelector_photoAvatar" /></span>' +
					'</a>';
		};
	};

	log = function() {
		if (settings && settings.debug && window.console) {
			console.log(Array.prototype.slice.call(arguments));
		}
	};

	htmlEntities = function(str) {
		if (!str) return '';
		// replace HTML tags in a string with encoded entities
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	};

	module = {
		init			: init,
		setAlbums		: setAlbums,
		getAlbums		: getAlbums,
		getAlbumById	: getAlbumById,
		setPhotos		: setPhotos,
		getPhotos		: getPhotos,
		getPhotoById	: getPhotoById,
		newInstance		: newInstance
	};
	return module;

}(CSPhotoSelector || {}, jQuery));
