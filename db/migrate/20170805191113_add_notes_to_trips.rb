class AddNotesToTrips < ActiveRecord::Migration[4.2]
  def change
    add_column :trips, :notes, :text
  end
end
