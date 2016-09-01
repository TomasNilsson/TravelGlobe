class AddStatusToShareRequests < ActiveRecord::Migration
  def change
    add_column :share_requests, :status, :string
  end
end
