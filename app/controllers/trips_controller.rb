class TripsController < ApplicationController
  
  def create
    @trip = Trip.new(trip_params)
    @trip.users << current_user
    if @trip.save
      render json: {status: :ok}
    else
      render json: {status: :internal_server_error}
    end
  end

  def show
    @trip = Trip.includes(:countries, :categories, :photos, :places).find(params[:id])
    @places = @trip.places.order(:order)
  end

  def destroy
  end

  def trip_params
    params.require(:trip).permit(:name, :start_date, :end_date, {:country_ids => []}, {:user_ids => []}, {:category_ids => []}, photos_attributes: [:id, :thumb_url, :image_url, :caption, :_destroy], places_attributes: [:id, :name, :latitude, :longitude, :order, :_destroy])
  end
end