class CountriesController < ApplicationController
  def index
    countries = Country.all.order(:name)

    render json: countries
  end
end