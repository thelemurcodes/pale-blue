class AddNameToRaffleItem < ActiveRecord::Migration[7.0]
  def change
    add_column :raffle_items, :name, :string
  end
end
