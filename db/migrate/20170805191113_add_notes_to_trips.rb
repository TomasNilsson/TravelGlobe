class AddNotesToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :notes, :text
  end
end
