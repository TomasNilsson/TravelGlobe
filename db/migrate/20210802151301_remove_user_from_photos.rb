class RemoveUserFromPhotos < ActiveRecord::Migration[6.1]
  def change
    remove_reference :photos, :user, index: true
  end
end
