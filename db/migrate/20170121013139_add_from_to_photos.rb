class AddFromToPhotos < ActiveRecord::Migration[4.2]
  def change
    add_column :photos, :from, :string
  end
end
