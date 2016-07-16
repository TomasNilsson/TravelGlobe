class DropUnusedCountriesTables < ActiveRecord::Migration
  def change
    drop_table :home_countries_users
    drop_table :visited_countries_users
  end
end
