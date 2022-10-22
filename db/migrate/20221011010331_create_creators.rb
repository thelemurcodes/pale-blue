class CreateCreators < ActiveRecord::Migration[7.0]
  def change
    create_table :creators do |t|
      t.references :blockchain, null: false, foreign_key: true
      t.string :pale_blue_tkn
      t.string :name
      t.text :answer_one
      t.text :answer_two
      t.text :answer_three
      t.boolean :non_profit
      t.text :about
      t.text :facebook
      t.text :twitter
      t.text :instagram
      t.text :linkedin
      t.text :discord
      t.text :website

      t.timestamps
    end
  end
end
