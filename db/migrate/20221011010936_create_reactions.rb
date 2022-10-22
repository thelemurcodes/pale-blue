class CreateReactions < ActiveRecord::Migration[7.0]
  def change
    create_table :reactions do |t|
      t.references :creator, null: false, foreign_key: true
      t.bigint :like
      t.bigint :dislike

      t.timestamps
    end
  end
end
