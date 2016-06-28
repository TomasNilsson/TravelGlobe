class UsersController < ApplicationController

    def home_countries
      # TODO: add authorization
      @countries = User.find(params[:id]).home_countries

      render json: {"countries": @countries.pluck(:code)}
    end

    def visited_countries
      # TODO: add authorization
      @countries = User.find(params[:id]).visited_countries

      render json: {"countries": @countries.pluck(:code)}
    end

end
