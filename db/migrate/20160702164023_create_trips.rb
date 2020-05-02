class CreateTrips < ActiveRecord::Migration[4.2]
  def change
    create_table :trips do |t|
      t.string :name
      t.date :start_date
      t.date :end_date
      t.references :category, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
