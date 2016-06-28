class User < ActiveRecord::Base
  has_and_belongs_to_many :home_countries, :class_name => 'Country', :join_table => 'home_countries_users'
  has_and_belongs_to_many :visited_countries, :class_name => 'Country', :join_table => 'visited_countries_users'

  def self.from_omniauth(auth)
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
