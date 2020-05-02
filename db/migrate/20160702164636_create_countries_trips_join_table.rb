class CreateCountriesTripsJoinTable < ActiveRecord::Migration[4.2]
  def change
    create_table :countries_trips, id: false do |t|
      t.integer :country_id
      t.integer :trip_id
    end
 
    add_index :countries_trips, :country_id
    add_index :countries_trips, :trip_id
  end
end
