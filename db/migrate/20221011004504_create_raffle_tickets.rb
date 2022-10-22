class CreateRaffleTickets < ActiveRecord::Migration[7.0]
  def change
    create_table :raffle_tickets do |t|
      t.references :blockchain, null: false, foreign_key: true
      t.string :wallet_address
      t.bigint :amount

      t.timestamps
    end
  end
end
