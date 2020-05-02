class CreateTripsUsersJoinTable < ActiveRecord::Migration[4.2]
  def change
    create_table :trips_users, id: false do |t|
      t.integer :trip_id
      t.integer :user_id
    end
 
    add_index :trips_users, :trip_id
    add_index :trips_users, :user_id
  end
end
