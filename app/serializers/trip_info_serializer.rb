class TripInfoSerializer < ActiveModel::Serializer
  attributes :id, :name, :startDate, :endDate, :notes

  has_many :countries

  has_many :places

  has_many :categories

  has_many :travel_partners, key: :travelPartners

  def startDate
    object.start_date.strftime('%Y-%m-%d')
  end

  def endDate
    object.end_date.strftime('%Y-%m-%d')
  end

  has_many :photos

  class PlaceSerializer < ActiveModel::Serializer
    attributes :id, :name, :latitude, :longitude

    def latitude
      object.latitude.to_f
    end

    def longitude
      object.longitude.to_f
    end
  end

  class PhotoSerializer < ActiveModel::Serializer
    attributes :id, :thumb_url, :image_url, :caption
  end
end
