class RaffleItem < ApplicationRecord
  belongs_to :raffle
  belongs_to :raffle_ticket, optional: true
  has_one_attached :photo
end
