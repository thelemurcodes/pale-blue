class CreateBlockchains < ActiveRecord::Migration[7.0]
  def change
    create_table :blockchains do |t|
      t.string :name

      t.timestamps
    end
  end
end
