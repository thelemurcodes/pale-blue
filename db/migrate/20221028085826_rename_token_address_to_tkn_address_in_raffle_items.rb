class RenameTokenAddressToTknAddressInRaffleItems < ActiveRecord::Migration[7.0]
  def change
    rename_column :raffle_items, :token_address, :tkn_address
  end
end
