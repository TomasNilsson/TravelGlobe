class CreateTravelPartnersTripsJoinTable < ActiveRecord::Migration[4.2]
  def change
  	create_table :travel_partners_trips, id: false do |t|
      t.integer :travel_partner_id
      t.integer :trip_id
    end
 
    add_index :travel_partners_trips, :travel_partner_id
    add_index :travel_partners_trips, :trip_id
  end
end
