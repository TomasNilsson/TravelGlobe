class PlaceLived < ActiveRecord::Base
  self.table_name = "places_lived"
  belongs_to :country
  belongs_to :user

  validates :address, :country, :user, :latitude, :longitude, presence: true
  validates_date :start_date
  validates_date :end_date, on_or_after: :start_date, allow_blank: true

  def date
  	if self.end_date.blank?
  		"#{self.start_date.strftime("%Y-%m-%d")} \u2013"
  	else
  		"#{self.start_date.strftime("%Y-%m-%d")} \u2013 #{self.end_date.strftime("%Y-%m-%d")}"
  	end
  end
end
