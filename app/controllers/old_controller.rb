class OldController < HomeController
  layout "old"

  def index
    if current_user
      @user = current_user
      @trips = current_user.trips.order(:start_date)
      @places_lived = current_user.places_lived.order(:start_date)
      @travel_partners_toplist = current_user.travel_partners_toplist
      @share_requests = current_user.share_requests.where(status: "pending")
    end
  end
end