class ShareRequestsController < ApplicationController

    def accept
      params[:share_request_ids] ||= []
      ShareRequest.where(id: params[:share_request_ids]).each do |s|
        trip = s.trip
        trip.users << current_user
        trip.travel_partners.where(user_id: s.from_user.id).where("shared_user_id != ? OR shared_user_id IS NULL", current_user.id).each do |t|
          # Add each travel partner for the user that received the share request
          travel_partner = current_user.travel_partners.where(name: t.name).first
          if travel_partner.blank?
            travel_partner = t.dup
            travel_partner.user_id = current_user.id
          end
          travel_partner.save
          travel_partner.trips << trip
        end
        # Add user that sent share request as travel partner
        travel_partner = current_user.travel_partners.where(name: s.from_user.name).first
        if travel_partner.blank?
          travel_partner = TravelPartner.create(name: s.from_user.name, shared_user_id: s.from_user.id)
          current_user.travel_partners << travel_partner
        else
          travel_partner.shared_user_id = s.from_user.id
        end
        travel_partner.save
        travel_partner.trips << trip
        current_user.countries << trip.countries - current_user.countries
        s.update(status: "accepted")
      end
      current_user.share_requests.where.not(id: params[:share_request_ids]).each do |s|
        s.update(status: "denied")
      end
      render json: {}, status: :ok
    end

end