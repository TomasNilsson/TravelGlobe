class CreatePlaces < ActiveRecord::Migration[4.2]
  def change
    create_table :places do |t|
      t.string :name
      t.decimal :latitude
      t.decimal :longitude
      t.integer :order
      t.references :trip, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
