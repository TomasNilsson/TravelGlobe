class PlaceLivedSerializer < ActiveModel::Serializer
  attributes :id, :address, :country, :latitude, :longitude, :date

  def country
    object.country.name
  end

  def latitude
    object.latitude.to_f
  end

  def longitude
    object.longitude.to_f
  end
end
