class HomeController < ApplicationController

  def index
    if current_user
        @visited_countries = current_user.visited_countries
        @home_countries = current_user.home_countries
        @trips = current_user.trips.order(:start_date)
        @facebook = Koala::Facebook::API.new(current_user.oauth_token)
        @friends = @facebook.get_connections("me", "taggable_friends?limit=2000")
        @trip = Trip.new
    end
  end

end