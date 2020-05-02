class RemoveCategoryIdFromTrips < ActiveRecord::Migration[4.2]
  def change
    remove_reference :trips, :category, index: true, foreign_key: true
  end
end
