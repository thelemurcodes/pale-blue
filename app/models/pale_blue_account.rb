class PaleBlueAccount < ApplicationRecord
  belongs_to :blockchain
  belongs_to :account_name
end
