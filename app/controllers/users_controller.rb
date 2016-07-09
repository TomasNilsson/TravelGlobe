class UsersController < ApplicationController

    def get_home_countries
      # TODO: add authorization
      @countries = User.find(params[:id]).home_countries

      render json: {"countries": @countries.pluck(:code)}
    end

    def get_visited_countries
      # TODO: add authorization
      @countries = User.find(params[:id]).visited_countries

      render json: {"countries": @countries.pluck(:code)}
    end

    def post_visited_countries
      # TODO: add authorization
      current_user.visited_countries << Country.where(name: params[:country]).first
      @countries = current_user.visited_countries

      render json: {"countries": @countries.pluck(:code)}
    end

end
