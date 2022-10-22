class Blockchain < ApplicationRecord
  has_many :creators
  has_many :raffle_tickets
  has_many :pale_blue_accounts
end
