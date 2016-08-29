class PlacesLivedController < ApplicationController
  
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
    @place_lived = PlaceLived.find(params[:id])
  end

  def destroy
  end

  def place_lived_params
    params.require(:place_lived).permit(:address, :country_id, :latitude, :longitude, :start_date, :end_date)
  end
end