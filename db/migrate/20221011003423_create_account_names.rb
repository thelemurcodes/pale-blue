class CreateAccountNames < ActiveRecord::Migration[7.0]
  def change
    create_table :account_names do |t|
      t.string :name
      t.text :purpose

      t.timestamps
    end
  end
end
