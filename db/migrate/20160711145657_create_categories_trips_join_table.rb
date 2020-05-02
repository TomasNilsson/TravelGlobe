class CreateCategoriesTripsJoinTable < ActiveRecord::Migration[4.2]
  def change
  	create_table :categories_trips, id: false do |t|
      t.integer :category_id
      t.integer :trip_id
    end
 
    add_index :categories_trips, :category_id
    add_index :categories_trips, :trip_id
  end
end
