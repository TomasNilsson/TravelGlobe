class UserStatisticsSerializer < ActiveModel::Serializer
  attributes :numberOfTrips, :numberOfVisitedCountries, :numberOfDaysTravelling, :numberOfPlacesLived, :travelPartnersTopList

  def numberOfTrips
    object.trips.count
  end

  def numberOfVisitedCountries
    object.visited_countries_count
  end

  def numberOfDaysTravelling
    object.days_travelling
  end

  def numberOfPlacesLived
    object.places_lived.pluck(:address).uniq.count
  end

  def travelPartnersTopList 
    object.travel_partners_toplist.as_json(except: :id).map { |travel_partner| travel_partner.deep_transform_keys { |k| k.camelize(:lower) } }
  end
end
