class TripInfoSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :notes

  has_many :countries do
    object.countries.map(&:name)
  end

  has_many :places do
    object.places.map(&:name)
  end

  has_many :categories do
    object.categories.map(&:name)
  end

  has_many :travel_partners, key: :travelPartners do
    object.travel_partners.map(&:name)
  end

  has_many :photos

  class PhotoSerializer < ActiveModel::Serializer
    attribute :thumb_url, key: :thumbUrl
    attribute :image_url, key: :imageUrl
    attribute :caption
  end
end
