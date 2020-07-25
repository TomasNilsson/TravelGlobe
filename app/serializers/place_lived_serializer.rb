class PlaceLivedSerializer < ActiveModel::Serializer
  attributes :id, :address, :country, :latitude, :longitude, :date

  def country
    object.country.name
  end
end
