class AddRedeemedToDonations < ActiveRecord::Migration[7.0]
  def change
    add_column :donations, :redeemed, :boolean
  end
end
