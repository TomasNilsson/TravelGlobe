class UsersController < ApplicationController

    # TODO: add access control (based on session cookie or token)

    def visited_countries
      countries = User.find(params[:id]).countries
      render json: countries.pluck(:code)
    end

    def places_lived
      places_lived = User.find(params[:id]).places_lived.order(:start_date)
      render json: places_lived, each_serializer: PlaceLivedSerializer
    end

end
