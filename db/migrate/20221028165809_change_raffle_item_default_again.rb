class ChangeRaffleItemDefaultAgain < ActiveRecord::Migration[7.0]
  def change
    change_column_null :raffle_items, :raffle_ticket_id, true
  end
end
