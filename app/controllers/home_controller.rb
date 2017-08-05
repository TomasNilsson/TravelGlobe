class HomeController < ApplicationController

  def index
    if current_user
      @user = current_user
      @trips = current_user.trips.order(:start_date)
      @places_lived = current_user.places_lived.order(:start_date)
      @travel_partners_toplist = current_user.travel_partners_toplist
      @share_requests = current_user.share_requests.where(status: "pending")
    end
  end

  def share
    if params.has_key?(:token)
      if current_user
        # Remove cookie if logged in as other user
        session.delete(:user_id)
      end
      @user = User.where(token: params[:token]).first
      @trips = @user.trips.order(:start_date)
      @places_lived = @user.places_lived.order(:start_date)
      @travel_partners_toplist = @user.travel_partners_toplist
      render "index"
    end
  end

  def excel_export
    @trips = current_user.trips.order(:start_date)
    @places_lived = current_user.places_lived.order(:start_date)
    render xlsx: 'excel_export', filename: "TravelGlobe_#{current_user.name.gsub(/\s+/, '')}.xlsx"
  end

  def privacy
  end

end