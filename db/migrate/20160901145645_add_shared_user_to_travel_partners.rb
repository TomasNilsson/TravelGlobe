class AddSharedUserToTravelPartners < ActiveRecord::Migration
  def change
    add_reference :travel_partners, :shared_user, index: true
    add_foreign_key :travel_partners, :users, column: :shared_user_id
  end
end
