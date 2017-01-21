class TripsController < ApplicationController
  before_action :set_trip, only: [:show, :edit, :update, :destroy]

  def new
    @trip = Trip.new
  end
  
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
    authorize! :create, @trip
    if @trip.save
      current_user.countries << @trip.countries - current_user.countries
      render json: @trip, status: :created
    else
      render json: @trip.errors, status: :unprocessable_entity
    end
  end

  def show
    if current_user
      @facebook = Koala::Facebook::API.new(current_user.oauth_token)
      @friends = @facebook.get_connections("me", "friends") || []
    end
    @user = User.find(params[:user])
  end

  def edit
    authorize! :edit, @trip
  end

  def update
    authorize! :update, @trip
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
    if @trip.users.size > 1
      # If shared trip: add other user's travel_partners to the array before saving
      params[:trip][:travel_partner_ids] += @trip.travel_partners.where.not(user_id: current_user.id).map(&:id)
    end
    countries = @trip.countries.to_a
    if @trip.update(trip_params)
      countries.each do |c|
        if current_user.trips_and_places_count(c.id) == 0
          current_user.countries.delete(c)
        end
      end
      current_user.countries << @trip.countries - current_user.countries
      render json: @trip, status: :ok
    else
      render json: @trip.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize! :destroy, @trip
    countries = @trip.countries.to_a
    if @trip.users.size > 1
      @trip.users.delete(current_user)
      @trip.travel_partners.delete(@trip.travel_partners.where(user_id: current_user.id))
      @trip.share_requests.where("to_user_id = ? OR from_user_id = ?", current_user.id, current_user.id).destroy_all
    else 
      @trip.destroy
    end
    if @trip.errors.any?
      render json: @trip.errors, status: :unprocessable_entity
    else
      countries.each do |c|
        if current_user.trips_and_places_count(c.id) == 0
          current_user.countries.delete(c)
        end
      end
      render json: {}, status: :no_content
    end
  end

  def share
    params[:travel_partner_ids].each_with_index do |t, i|
      if params[:user_ids][i].present? 
        to_user_id = User.where(uid: params[:user_ids][i]).first.id
        ShareRequest.create(trip_id: params[:id], from_user_id: current_user.id, to_user_id: to_user_id, status: "pending")
        TravelPartner.find(t).update(shared_user_id: to_user_id)
      end
    end
    render json: {}, status: :ok
  end

  private
    def set_trip
      @trip = Trip.includes(:countries, :categories, :photos, :places).find(params[:id])
    end

    def trip_params
      params.require(:trip).permit(:name, :start_date, :end_date, {:country_ids => []}, {:travel_partner_ids => []}, {:category_ids => []}, photos_attributes: [:id, :thumb_url, :image_url, :caption, :order, :user_id, :external_id, :from, :_destroy], places_attributes: [:id, :name, :latitude, :longitude, :order, :_destroy])
    end
end