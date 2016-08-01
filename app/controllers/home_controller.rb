class HomeController < ApplicationController

  def index
    if current_user
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

  def privacy
  end

end