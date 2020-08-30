class Place < ActiveRecord::Base
  belongs_to :trip, optional: true # optional: true is a temporary workaround, see https://github.com/rails/rails/issues/25198#issuecomment-408415032
end
