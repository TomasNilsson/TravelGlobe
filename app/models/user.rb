class User < ActiveRecord::Base 
  has_and_belongs_to_many :countries
  has_and_belongs_to_many :trips
  has_many :travel_partners
  has_many :places_lived, class_name: 'PlaceLived'

  def visited_countries_count
    # United States should only be included once if multiple US states have been visited.
    us_state_count = self.countries.where("name LIKE :prefix", prefix: "United States%").count
    if us_state_count > 1
      self.countries.count - us_state_count + 1
    else
      self.countries.count
    end
  end

  def travel_partners_toplist
    TravelPartner.select("travel_partners.name", "COUNT(trips.id) as trip_count").joins(:trips).where(user_id: self.id).group("travel_partners.id").order("trip_count DESC, travel_partners.name ASC")
  end

  def self.from_omniauth(auth)
    # TODO: need to refresh OAuth token if it has expired. Check before Koala call.
    where(uid: auth.uid).first_or_initialize do |user|
      user.uid = auth.uid
      user.name = auth.info.name
      user.image_url = auth.info.image
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end
end
