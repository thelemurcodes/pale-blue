class CreateFils < ActiveRecord::Migration[7.0]
  def change
    create_table :fils do |t|
      t.references :creator, null: false, foreign_key: true
      t.text :name

      t.timestamps
    end
  end
end
