class PlaceLivedSerializer < ActiveModel::Serializer
  attributes :id, :address, :latitude, :longitude, :startDate, :endDate

  belongs_to :country

  def latitude
    object.latitude.to_f
  end

  def longitude
    object.longitude.to_f
  end

  def startDate
    object.start_date.strftime('%Y-%m-%d')
  end

  def endDate
    object.end_date.blank? ? '' : object.end_date.strftime('%Y-%m-%d')
  end
end
