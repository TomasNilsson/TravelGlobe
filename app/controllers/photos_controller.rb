class PhotosController < ApplicationController

    def update_facebook_urls
      begin
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
        render json: {}, status: :ok
      rescue Exception
        render json: {}, status: :bad_request
      end
    end

end
