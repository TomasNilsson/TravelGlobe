class User < ActiveRecord::Base
  has_and_belongs_to_many :countries
  has_and_belongs_to_many :trips
  has_many :travel_partners
  has_many :places_lived, class_name: 'PlaceLived'
  has_many :share_requests, foreign_key: 'to_user_id'
  has_secure_token

  def visited_countries_count
    # United States should only be included once if multiple US states have been visited.
    us_state_count =
      self.countries.where('name LIKE :prefix', prefix: 'United States%').count
    if us_state_count > 1
      self.countries.count - us_state_count + 1
    else
      self.countries.count
    end
  end

  def travel_partners_toplist
    TravelPartner
      .select('travel_partners.name', 'COUNT(trips.id) as trip_count')
      .joins(:trips)
      .where(user_id: self.id)
      .group('travel_partners.id')
      .order('trip_count DESC, travel_partners.id ASC')
      .limit(10)
  end

  def days_travelling
    days = 0
    self.trips.each { |t| days += (t.end_date - t.start_date).to_i + 1 }
    return days
  end

  def trips_and_places_count(country_id)
    # Get number of trips and 'places lived' for the user for a certain country
    count = 0
    count += self.places_lived.where(country_id: country_id).count
    count +=
      self.trips.includes(:countries).where(countries: { id: country_id }).count
    return count
  end

  def self.from_google_user(google_user)
    puts google_user
    puts google_user[:email]
    user = User.where(email: google_user[:email]).first_or_initialize
    user.name = google_user[:name]
    user.email = google_user[:email]
    user.image_url = google_user[:picture]
    user.last_sign_in_at = user.current_sign_in_at
    user.current_sign_in_at = Time.now
    user.save!
    return user
  end
end
