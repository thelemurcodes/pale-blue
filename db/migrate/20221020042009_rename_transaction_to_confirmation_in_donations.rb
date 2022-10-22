class RenameTransactionToConfirmationInDonations < ActiveRecord::Migration[7.0]
  def change
    rename_column :donations, :transaction, :confirmation
  end
end
