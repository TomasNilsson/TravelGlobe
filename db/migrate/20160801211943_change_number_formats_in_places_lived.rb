class ChangeNumberFormatsInPlacesLived < ActiveRecord::Migration[4.2]
  def change
  	change_column :places_lived, :latitude, :decimal, precision: 11, scale: 8
  	change_column :places_lived, :longitude, :decimal, precision: 11, scale: 8
  end
end
