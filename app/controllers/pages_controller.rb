class PagesController < ApplicationController
  def home
    @creators = Creator.first(10)
    @raffles = Raffle.where(running: true)
    @raffle_items = RaffleItem.first(10)
  end

  def sign_in
  end
end
