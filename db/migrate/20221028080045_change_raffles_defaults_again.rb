class ChangeRafflesDefaultsAgain < ActiveRecord::Migration[7.0]
  def change
    change_column_default :raffles, :running, false
  end
end
