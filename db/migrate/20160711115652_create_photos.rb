class CreatePhotos < ActiveRecord::Migration[4.2]
  def change
    create_table :photos do |t|
      t.string :thumb_url
      t.string :image_url
      t.string :caption
      t.references :trip, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
