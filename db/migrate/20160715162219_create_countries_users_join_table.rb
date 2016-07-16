class CreateCountriesUsersJoinTable < ActiveRecord::Migration
  def change
  	create_table :countries_users, id: false do |t|
      t.integer :country_id
      t.integer :user_id
    end
 
    add_index :countries_users, :country_id
    add_index :countries_users, :user_id
    add_index :countries_users, [:country_id, :user_id], unique: true
  end
end
