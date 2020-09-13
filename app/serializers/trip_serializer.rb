class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :startDate, :endDate

  has_many :countries

  has_many :categories do
    object.categories.map(&:name)
  end

  has_many :travel_partners, key: :travelPartners do
    object.travel_partners.map(&:name)
  end

  def startDate
    object.start_date.strftime("%Y-%m-%d")
  end

  def endDate
    object.end_date.strftime("%Y-%m-%d")
  end
end
