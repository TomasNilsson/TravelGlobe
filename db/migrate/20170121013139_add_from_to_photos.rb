class AddFromToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :from, :string
  end
end
