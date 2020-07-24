class UsersController < ApplicationController

    # TODO: add access control (based on session cookie or token)

    def visited_countries
      countries = User.find(params[:id]).countries
      render json: countries.pluck(:code)
    end

end
