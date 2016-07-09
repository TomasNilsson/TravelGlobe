class HomeController < ApplicationController

  def index
    @countries = Country.all.order(:name)
    if current_user
        @visited_countries = current_user.visited_countries
        @home_countries = current_user.home_countries
        #@trips = current_user.trips.order(:start_date)
        @trips = []
    end
  end

end