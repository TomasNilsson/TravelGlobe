class AddUserToCategories < ActiveRecord::Migration
  def change
    add_reference :categories, :user, index: true, foreign_key: true
  end
end
