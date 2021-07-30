class PhotosController < ApplicationController
  def update_facebook_urls
    begin
      # Only call Facebook API if it was more than 14 days since the user logged in
      last_sign_in = current_user.last_sign_in_at
      if (last_sign_in.nil? || last_sign_in < (Time.now - 14.days)) &&
           session[:has_updated_fb_urls].nil?
        facebook = Koala::Facebook::API.new(current_user.oauth_token)
        fb_photos = current_user.photos.where(from: 'facebook')
        fb_photos
          .in_groups_of(50, false)
          .each do |group|
            facebook.batch do |batch_api|
              group.each do |p|
                batch_api.get_object(
                  p.external_id,
                  { fields: %i[picture source] },
                ) do |response|
                  if response.is_a?(Hash) && !response['picture'].empty?
                    p.update(
                      thumb_url: response['picture'],
                      image_url: response['source'],
                    )
                  end
                end
              end
            end
          end
        session[:has_updated_fb_urls] = true
      end
      render json: {}, status: :ok
    rescue Exception
      render json: {}, status: :bad_request
    end
  end

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
                 {
                   image_url: url + '=w1920-h1920',
                   thumb_url: url + '=w720-h720',
                 }
               }
    rescue ActionController::ParameterMissing
      render json: { error: 'album_url param is missing' }, status: :bad_request
    rescue Exception
      render json: {}, status: :internal_server_error
    end
  end
end
