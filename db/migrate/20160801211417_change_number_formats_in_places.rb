class ChangeNumberFormatsInPlaces < ActiveRecord::Migration
  def change
  	change_column :places, :latitude, :decimal, precision: 11, scale: 8
  	change_column :places, :longitude, :decimal, precision: 11, scale: 8
  end
end
