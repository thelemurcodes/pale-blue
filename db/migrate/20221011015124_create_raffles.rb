class CreateRaffles < ActiveRecord::Migration[7.0]
  def change
    create_table :raffles do |t|
      t.references :creator, null: false, foreign_key: true
      t.string :title
      t.text :about
      t.boolean :running

      t.timestamps
    end
  end
end
