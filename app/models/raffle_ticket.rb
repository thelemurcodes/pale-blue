class RaffleTicket < ApplicationRecord
  belongs_to :blockchain
  has_many :raffle_items
  has_many :redeemers
end
