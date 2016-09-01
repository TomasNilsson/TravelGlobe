class CreateShareRequests < ActiveRecord::Migration
  def change
    create_table :share_requests do |t|
      t.references :trip, index: true, foreign_key: true
      t.references :from_user, index: true
      t.references :to_user, index: true

      t.timestamps null: false
    end
    add_foreign_key :share_requests, :users, column: :from_user_id
    add_foreign_key :share_requests, :users, column: :to_user_id
  end
end
