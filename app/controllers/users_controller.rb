class UsersController < ApplicationController
  before_action :authorize_request

  def visited_countries
    countries = @current_user.countries
    render json: countries.pluck(:code)
  end

  def places_lived
    places_lived = @current_user.places_lived.order(:start_date)
    render json: places_lived, each_serializer: PlaceLivedSerializer
  end

  def travel_partners
    travel_partners = @current_user.travel_partners.order(:name)
    render json: travel_partners, each_serializer: TravelPartnerSerializer
  end

  def trips
    trips = @current_user.trips.order(:start_date)
    render json: trips, each_serializer: TripSerializer
  end

  def statistics
    render json: @current_user, serializer: UserStatisticsSerializer
  end

  def categories
    categories = Category.for_user(current_user)
    render json: categories, each_serializer: CategorySerializer
  end
end
