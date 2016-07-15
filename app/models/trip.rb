class Trip < ActiveRecord::Base
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :countries
  has_and_belongs_to_many :users
  has_many :photos, dependent: :destroy
  has_many :places, dependent: :destroy 
  accepts_nested_attributes_for :photos, reject_if: :all_blank, allow_destroy: true
  accepts_nested_attributes_for :places, reject_if: :all_blank, allow_destroy: true

  def date
  	"#{self.start_date.strftime("%Y-%m-%d")} \u2013 #{self.end_date.strftime("%Y-%m-%d")}"
  end
end
