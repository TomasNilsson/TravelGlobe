class UsersController < ApplicationController

    def visited_countries
      @countries = User.find(params[:id]).countries
      render json: {"countries": @countries.pluck(:code)}
    end

end
