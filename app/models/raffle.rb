class Raffle < ApplicationRecord
  belongs_to :creator
  has_many :raffle_items
end
