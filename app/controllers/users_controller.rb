class UsersController < ApplicationController
  before_action :set_user

  def visited_countries
    countries = @user.countries
    render json: countries.pluck(:code)
  end

  def places_lived
    places_lived = @user.places_lived.order(:start_date)
    render json: places_lived, each_serializer: PlaceLivedSerializer
  end

  def travel_partners
    travel_partners = @user.travel_partners.order(:name)
    render json: travel_partners, each_serializer: TravelPartnerSerializer
  end

  def trips
    trips = @user.trips.order(:start_date)
    render json: trips, each_serializer: TripSerializer
  end

  def statistics
    render json: @user, serializer: UserStatisticsSerializer
  end

  def categories
    categories = Category.for_user(@user)
    render json: categories, each_serializer: CategorySerializer
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
