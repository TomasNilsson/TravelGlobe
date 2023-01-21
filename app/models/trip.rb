class Trip < ActiveRecord::Base
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :countries
  has_and_belongs_to_many :users
  has_and_belongs_to_many :travel_partners
  has_many :photos, -> { order :order }, dependent: :destroy
  has_many :places, -> { order :order }, dependent: :destroy
  has_many :share_requests, dependent: :destroy
  accepts_nested_attributes_for :photos,
                                reject_if: :destroy_if_empty,
                                allow_destroy: true
  accepts_nested_attributes_for :places,
                                reject_if: :destroy_if_empty,
                                allow_destroy: true

  validates :name, :countries, :places, presence: true
  validates_date :start_date
  validates_date :end_date, on_or_after: :start_date

  def date
    "#{self.start_date.strftime('%Y-%m-%d')} \u2013 #{self.end_date.strftime('%Y-%m-%d')}"
  end

  def destroy_if_empty(attributes)
    exists = attributes['id'].present?
    empty = attributes.reject { |k, v| k == 'id' }.values.all?(&:blank?)
    attributes.merge!({ _destroy: 1 }) if exists and empty # Add _destroy to delete item if all its attributes are empty
    return(!exists and empty)
  end
end
