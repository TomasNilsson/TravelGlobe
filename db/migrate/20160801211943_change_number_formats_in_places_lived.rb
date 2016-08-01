class ChangeNumberFormatsInPlacesLived < ActiveRecord::Migration
  def change
  	change_column :places_lived, :latitude, :decimal, precision: 11, scale: 8
  	change_column :places_lived, :longitude, :decimal, precision: 11, scale: 8
  end
end
