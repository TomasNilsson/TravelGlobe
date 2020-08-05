class TripInfoSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :notes

  has_many :countries do
    object.countries.map(&:name)
  end

  has_many :places

  has_many :categories do
    object.categories.map(&:name)
  end

  has_many :travel_partners, key: :travelPartners do
    object.travel_partners.map(&:name)
  end

  has_many :photos

  class PlaceSerializer < ActiveModel::Serializer
    attributes :name, :latitude, :longitude

    def latitude
      object.latitude.to_f
    end

    def longitude
      object.longitude.to_f
    end
  end

  class PhotoSerializer < ActiveModel::Serializer
    attribute :thumb_url, key: :thumbUrl
    attribute :image_url, key: :imageUrl
    attribute :caption
  end
end
