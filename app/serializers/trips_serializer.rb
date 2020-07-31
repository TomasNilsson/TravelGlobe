class TripsSerializer < ActiveModel::Serializer
  attributes :id, :name, :date

  has_many :countries do
    object.countries.map(&:name)
  end

  has_many :categories do
    object.categories.map(&:name)
  end

  has_many :travel_partners do
    object.travel_partners.map(&:name)
  end
end
