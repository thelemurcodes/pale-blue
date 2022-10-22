class CreatePaleBlueAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :pale_blue_accounts do |t|
      t.references :blockchain, null: false, foreign_key: true
      t.references :account_name, null: false, foreign_key: true
      t.string :public_address

      t.timestamps
    end
  end
end
