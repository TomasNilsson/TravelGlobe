class UsersController < ApplicationController

    def visited_countries
      @countries = current_user.countries
      render json: {"countries": @countries.pluck(:code)}
    end

end
