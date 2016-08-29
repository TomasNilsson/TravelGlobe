class TripsController < ApplicationController
  
  def create
    params[:trip][:category_ids].map! { |element|
      # Create new category if element is a name instead of an id
      if element.present? && (element.to_i.to_s != element)
        Category.create(name: element, user_id: current_user.id).id
      else
        element
      end
    }
    params[:trip][:travel_partner_ids].map! { |element|
      # Create new travel partner if element is a name instead of an id
      if element.present? && (element.to_i.to_s != element)
        TravelPartner.create(name: element, user_id: current_user.id).id
      else
        element
      end
    }
    @trip = Trip.new(trip_params)
    @trip.users << current_user
    if @trip.save
      current_user.countries << @trip.countries - current_user.countries
      render json: @trip, status: :created
    else
      render json: @trip.errors, status: :unprocessable_entity
    end
  end

  def show
    @trip = Trip.includes(:countries, :categories, :photos, :places).find(params[:id])
    @places = @trip.places.order(:order)
    @photos = @trip.photos.order(:order)
  end

  def destroy
  end

  def trip_params
    params.require(:trip).permit(:name, :start_date, :end_date, {:country_ids => []}, {:travel_partner_ids => []}, {:category_ids => []}, photos_attributes: [:id, :thumb_url, :image_url, :caption, :order, :_destroy], places_attributes: [:id, :name, :latitude, :longitude, :order, :_destroy])
  end
end