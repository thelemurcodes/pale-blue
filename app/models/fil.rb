class Fil < ApplicationRecord
  belongs_to :creator
  has_one_attached :photo
end
