class Country < ActiveRecord::Base
  def count
    # TODO: how to handle US states?
    current_user.visited_countries.count + current_user.home_countries
  end
end
