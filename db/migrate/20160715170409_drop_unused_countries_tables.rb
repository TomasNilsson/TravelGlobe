class DropUnusedCountriesTables < ActiveRecord::Migration[4.2]
  def change
    drop_table :home_countries_users
    drop_table :visited_countries_users
  end
end
