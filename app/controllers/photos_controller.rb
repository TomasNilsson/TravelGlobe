class PhotosController < ApplicationController

    def update_facebook_urls
      begin
        # Only call Facebook API if it was more than 14 days since the user logged in
        last_sign_in = current_user.last_sign_in_at
        if (last_sign_in.nil? || last_sign_in < (Time.now - 14.days)) && session[:has_updated_fb_urls].nil?
          facebook = Koala::Facebook::API.new(current_user.oauth_token)
          fb_photos = current_user.photos.where(from: "facebook")
          fb_photos.in_groups_of(50, false).each do |group|
            facebook.batch do |batch_api|
              group.each do |p|
                batch_api.get_object(p.external_id, { fields: [:picture, :source]}) { |response| 
                  if response.is_a?(Hash) && !response['picture'].empty?
                    p.update(thumb_url: response['picture'], image_url: response['source'])
                  end
                }
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

end
