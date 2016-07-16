class CreatePlacesLived < ActiveRecord::Migration
  def change
    create_table :places_lived do |t|
      t.string :address
      t.references :country, index: true, foreign_key: true
      t.decimal :latitude
      t.decimal :longitude
      t.date :start_date
      t.date :end_date
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
