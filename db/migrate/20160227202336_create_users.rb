class CreateUsers < ActiveRecord::Migration[4.2]
  def change
    create_table :users do |t|
      t.string :uid, null: false
      t.string :name
      t.string :image_url
      t.string :oauth_token
      t.datetime :oauth_expires_at

      t.timestamps null: false
    end
    add_index :users, :uid
  end
end
