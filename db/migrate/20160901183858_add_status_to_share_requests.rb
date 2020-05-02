class AddStatusToShareRequests < ActiveRecord::Migration[4.2]
  def change
    add_column :share_requests, :status, :string
  end
end
