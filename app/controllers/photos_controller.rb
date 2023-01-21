class PhotosController < ApplicationController
  def extract_from_google_photos
    begin
      # Scrape Google Photos Album
      # album_url: https://photos.app.goo.gl/<someHash>
      google_photos_html = Nokogiri.HTML(URI.open(params.fetch(:album_url)))
      render json:
               google_photos_html.search('script').map(&:text).find { |s|
                 s =~ /^AF_initDataCallback.*/ # Find script that starts with AF_initDataCallback
               }.scan(%r{"(https://lh3.googleusercontent.com/[^/]+?)",\d+,\d+}) # Find all image URLs in the script
                 .flatten.uniq # Remove duplicate due to one of the images also being album cover image
                 .map { |url|
                 { imageUrl: url + '=w1920-h1920', thumbUrl: url }
               }
    rescue ActionController::ParameterMissing
      render json: { error: 'album_url param is missing' }, status: :bad_request
    rescue Exception
      render json: {}, status: :internal_server_error
    end
  end
end
