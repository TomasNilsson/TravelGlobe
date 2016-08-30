class PlacesLivedController < ApplicationController
  before_action :set_place_lived, only: [:show, :edit, :update, :destroy]

  def new
    @place_lived = PlaceLived.new
  end
  
  def create
    @place_lived = current_user.places_lived.new(place_lived_params)
    if @place_lived.save
      current_user.countries << @place_lived.country unless current_user.countries.include?(@place_lived.country)
      render json: @place_lived, status: :created
    else
      render json: @place_lived.errors, status: :unprocessable_entity
    end
  end

  def show
  end

  def edit
    @no_end_date = @place_lived.end_date.blank?
  end

  def update
    country = @place_lived.country
    if @place_lived.update(place_lived_params)
      if current_user.trips_and_places_count(country.id) == 0
        current_user.countries.delete(country)
      end
      current_user.countries << @place_lived.country unless current_user.countries.include?(@place_lived.country)
      render json: @place_lived, status: :ok
    else
      render json: @place_lived.errors, status: :unprocessable_entity
    end
  end

  def destroy
    country = @place_lived.country
    if @place_lived.destroy
      if current_user.trips_and_places_count(country.id) == 0
        current_user.countries.delete(country)
      end
      render json: {}, status: :no_content
    else
      render json: @place_lived.errors, status: :unprocessable_entity
    end
  end

  private
    def set_place_lived
      @place_lived = PlaceLived.find(params[:id])
    end

    def place_lived_params
      params.require(:place_lived).permit(:address, :country_id, :latitude, :longitude, :start_date, :end_date)
    end
end