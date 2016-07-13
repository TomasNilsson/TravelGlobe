class RemoveCategoryIdFromTrips < ActiveRecord::Migration
  def change
    remove_reference :trips, :category, index: true, foreign_key: true
  end
end
