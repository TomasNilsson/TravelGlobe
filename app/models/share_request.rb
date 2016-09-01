class ShareRequest < ActiveRecord::Base
  belongs_to :trip
  belongs_to :from_user, class_name: "User"
  belongs_to :to_user, class_name: "User"
end
