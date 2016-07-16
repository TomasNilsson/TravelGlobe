class Category < ActiveRecord::Base
  def self.for_user(user)
    where(user_id: [user.id, nil]).order(:name)
  end
end
