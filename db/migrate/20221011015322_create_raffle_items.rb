class CreateRaffleItems < ActiveRecord::Migration[7.0]
  def change
    create_table :raffle_items do |t|
      t.references :raffle, null: false, foreign_key: true
      t.string :token_address
      t.boolean :delivered
      t.references :raffle_ticket, null: false, foreign_key: true

      t.timestamps
    end
  end
end
