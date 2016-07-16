class PlaceLived < ActiveRecord::Base
  self.table_name = "places_lived"
  belongs_to :country
  belongs_to :user

  def date
  	if self.end_date.blank?
  		"#{self.start_date.strftime("%Y-%m-%d")} \u2013"
  	else
  		"#{self.start_date.strftime("%Y-%m-%d")} \u2013 #{self.end_date.strftime("%Y-%m-%d")}"
  	end
  end
end
