class Creator < ApplicationRecord
  belongs_to :blockchain
  has_one :location
  has_one :reaction
  has_many :fils
  has_many :tags
  has_many :raffles
  has_one :donation
  has_one_attached :photo
end
