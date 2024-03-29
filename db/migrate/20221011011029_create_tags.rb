class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.references :creator, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
