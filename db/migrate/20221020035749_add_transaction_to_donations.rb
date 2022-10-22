class AddTransactionToDonations < ActiveRecord::Migration[7.0]
  def change
    add_column :donations, :transaction, :string
  end
end
