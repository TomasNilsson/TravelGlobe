class AddOrderToPhotos < ActiveRecord::Migration[4.2]
  def change
    add_column :photos, :order, :integer
  end
end
