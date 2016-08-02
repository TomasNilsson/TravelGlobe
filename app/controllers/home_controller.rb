class HomeController < ApplicationController

  def index
    if current_user
      @user = current_user
      @trips = current_user.trips.order(:start_date)
      @places_lived = current_user.places_lived.order(:start_date)
      # Can't use taggable_friends since the returned user id changes.
      #@facebook = Koala::Facebook::API.new(current_user.oauth_token)
      #@friends = @facebook.get_connections("me", "taggable_friends?limit=2000")
      @trip = Trip.new
      @place_lived = PlaceLived.new
      @travel_partners_toplist = current_user.travel_partners_toplist
    end
  end

  def share
    if params.has_key?(:token)
      if current_user
        # Remove cookie if logged in as other user
        session.delete(:user_id)
      end
      @user = User.where(token: params[:token]).first
      @trips = @user.trips.order(:start_date)
      @places_lived = @user.places_lived.order(:start_date)
      @travel_partners_toplist = @user.travel_partners_toplist
      render "index"
    end
  end

  def privacy
  end

end