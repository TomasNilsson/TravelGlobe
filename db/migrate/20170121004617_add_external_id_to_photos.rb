class AddExternalIdToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :external_id, :string
  end
end
