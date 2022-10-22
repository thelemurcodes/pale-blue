class CreateDonations < ActiveRecord::Migration[7.0]
  def change
    create_table :donations do |t|
      t.references :creator, null: false, foreign_key: true
      t.bigint :amount

      t.timestamps
    end
  end
end
