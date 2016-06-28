class CreateHomeCountriesUsersJoinTable < ActiveRecord::Migration
  def change
    create_table :home_countries_users, id: false do |t|
      t.integer :country_id
      t.integer :user_id
    end
 
    add_index :home_countries_users, :country_id
    add_index :home_countries_users, :user_id
  end
end
