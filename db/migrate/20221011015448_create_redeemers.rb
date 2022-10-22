class CreateRedeemers < ActiveRecord::Migration[7.0]
  def change
    create_table :redeemers do |t|
      t.references :raffle_item, null: false, foreign_key: true
      t.references :raffle_ticket, null: false, foreign_key: true
      t.integer :amount
      t.timestamps
    end
  end
end
