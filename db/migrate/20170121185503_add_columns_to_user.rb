class AddColumnsToUser < ActiveRecord::Migration
  def change
    add_column :users, :current_sign_in_at, :datetime
    add_column :users, :last_sign_in_at, :datetime
  end
end
