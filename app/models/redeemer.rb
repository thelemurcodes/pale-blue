class Redeemer < ApplicationRecord
  belongs_to :raffle_item
  belongs_to :raffle_ticket
end
