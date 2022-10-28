class ChangeRaffleItemDefault < ActiveRecord::Migration[7.0]
  def change
    change_column_default :raffle_items, :raffle_ticket_id, nil
  end
end
