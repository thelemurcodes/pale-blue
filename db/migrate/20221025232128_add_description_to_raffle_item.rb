class AddDescriptionToRaffleItem < ActiveRecord::Migration[7.0]
  def change
    add_column :raffle_items, :description, :text
  end
end
