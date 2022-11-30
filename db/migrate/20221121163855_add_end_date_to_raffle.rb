class AddEndDateToRaffle < ActiveRecord::Migration[7.0]
  def change
    add_column :raffles, :end_date, :date
    add_column :raffles, :end_time, :time
  end
end
